import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, MoreThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { User } from '@entities/user.entity';
import { Tenant } from '@entities/tenant.entity';
import { TenantRole } from '@entities/tenant.role.entity';
import * as bcrypt from 'bcrypt';
import { PlatformRole } from '@enums/platform-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(TenantRole)
    private tenantRolesRepository: Repository<TenantRole>,
  ) { }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['tenantRoles', 'tenantRoles.tenant'],
    });
  }

  async findByVerificationToken(verificationToken: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        verificationToken: verificationToken,
        verificationTokenExpiry: MoreThan(new Date()),
      },
    });
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword: string = await bcrypt.hash(newPassword, 10);
    await this.update(user.id, { password: hashedPassword });
  }

  async create(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
    address: { address?: string; zipcode: string; city: string; country: string },
    verifyToken: string,
    verifyTokenExpiry: Date,
    platformRole?: PlatformRole,
  ): Promise<User> {
    if (platformRole && !Object.values(PlatformRole).includes(platformRole)) {
      throw new BadRequestException('Invalid platform role');
    }

    const existingUser: User = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const newUser: User = this.usersRepository.create({
      email,
      password: hashedPassword,
      firstname,
      lastname,
      birthdate,
      address: address.address || null,
      zipcode: address.zipcode,
      city: address.city,
      country: address.country,
      verificationToken: verifyToken,
      verificationTokenExpiry: verifyTokenExpiry,
      platformRole
    });

    const savedUser: User = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async getTenantRoles(userId: string): Promise<TenantRole[]> {
    return this.tenantRolesRepository.find({ where: { user: { id: userId } }, relations: ['tenant'] });
  }

  async update(id: string, updateData: Partial<User>): Promise<User> {
    await this.usersRepository.update(id, updateData);
    return this.usersRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }

  async verifyEmail(token: string): Promise<User | null> {
    const user = await this.findByVerificationToken(token);

    if (!user) {
      throw new NotFoundException('Invalid or expired token');
    }

    user.isActive = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;
    await this.update(user.id, user);

    return user;
  }

  generateVerifyToken(): string {
    return randomBytes(32).toString('hex');
  }
}
