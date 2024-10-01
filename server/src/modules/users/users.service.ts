import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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

  async create(
    email: string,
    password: string,
    firstname: string,
    lastname: string,
    birthdate: Date,
    address: { address: string; zipcode: string; city: string; country: string },
    platformRole: PlatformRole,
  ): Promise<User> {
    if (!(platformRole in PlatformRole)) {
      throw new Error('Invalid platform role');
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
      address: address.address,
      zipcode: address.zipcode,
      city: address.city,
      country: address.country,
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
}
