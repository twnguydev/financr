import { ConflictException, Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, verify } from 'crypto';
import { UsersService } from '@modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@entities/user.entity';
import { TenantsService } from '@modules/tenants/tenants.service';
import { EmailService } from '@modules/email/email.service';
import { Tenant } from '@entities/tenant.entity';
import { TenantRole } from '@entities/tenant.role.entity';
import { PlatformRole } from '@enums/platform-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tenantsService: TenantsService,
    private emailService: EmailService,
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isUserEmailValidated = user.isActive;
    if (!isUserEmailValidated) {
      throw new UnauthorizedException('Email not validated');
    }

    if (await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any): Promise<{ user: User, access_token: string }> {
    const tenantRoles: TenantRole[] = await this.usersService.getTenantRoles(user.id);
    const payload = { email: user.email, sub: user.id, platformRole: user.platformRole, tenantRoles };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
    address: { address: string; zipcode: string; city: string; country: string },
    platformRole?: PlatformRole,
    tenantId?: string,
    tenantRole?: string,
    language?: string,
  ): Promise<User> {
    if (platformRole && !Object.values(PlatformRole).includes(platformRole)) {
      throw new BadRequestException('Invalid platform role');
    }

    const existingUser: User | undefined = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    let tenant: Tenant | undefined;

    if (tenantId) {
      tenant = await this.tenantsService.findById(tenantId);
      if (!tenant) {
        throw new NotFoundException('Tenant not found');
      }

      if (tenant.roles.length >= tenant.userLimit) {
        throw new Error('User limit reached for this tenant');
      }
    } else {
      tenant = await this.tenantsService.createFreeTenant(email);
    }

    const verifyToken: string = this.generateVerifyToken();

    const newUser: Promise<User> = this.usersService.create(
      email,
      password,
      firstname,
      lastname,
      birthdate,
      address,
      verifyToken,
      new Date(Date.now() + 3600000),
      platformRole,
    );

    const savedUser: User = await newUser;

    await this.emailService.sendVerificationEmail(savedUser.email, savedUser.firstname, verifyToken, language);

    if (tenant) {
      await this.tenantsService.assignRoleToUser(savedUser.id, tenant.id, tenantRole || 'user');
    }

    const userWithRoles: User = await this.usersService.findByEmail(email);
    return userWithRoles;
  }

  generateVerifyToken(): string {
    return randomBytes(32).toString('hex');
  }
}