import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@entities/user.entity';
import { TenantsService } from '@modules/tenants/tenants.service';
import { Tenant } from '@entities/tenant.entity';
import { TenantRole } from '@entities/tenant.role.entity';
import { PlatformRole } from '@enums/platform-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private tenantsService: TenantsService
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const tenantRoles: TenantRole[] = await this.usersService.getTenantRoles(user.id);
    const payload = { email: user.email, sub: user.id, platformRole: user.platformRole, tenantRoles };

    return {
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
    platformRole: PlatformRole,
    tenantId?: string,
    tenantRole?: string
  ): Promise<User> {
    if (!(platformRole in PlatformRole)) {
      throw new Error('Invalid platform role');
    }

    const existingUser = await this.usersService.findByEmail(email);
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

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: Promise<User> = this.usersService.create(
      email,
      hashedPassword,
      firstname,
      lastname,
      birthdate,
      address,
      platformRole,
    );

    const savedUser: User = await newUser;

    if (tenant) {
      await this.tenantsService.assignRoleToUser(savedUser.id, tenant.id, tenantRole || 'user');
    }

    const userWithRoles: User = await this.usersService.findByEmail(email);
    return userWithRoles;
  }
}