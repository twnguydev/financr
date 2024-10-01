import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@entities/user.entity';
import { PlatformRole } from '@enums/platform-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body() body: { 
      email: string; 
      password: string; 
      firstname: string; 
      lastname: string; 
      birthdate: Date; 
      address: { 
        address: string; 
        zipcode: string; 
        city: string; 
        country: string; 
      },
      platformRole: PlatformRole
    }
  ): Promise<User> {
    const verifyToken: string = this.usersService.generateVerifyToken();
    return this.usersService.create(
      body.email,
      body.password,
      body.firstname,
      body.lastname,
      body.birthdate,
      body.address,
      verifyToken,
      new Date(Date.now() + 3600000),
      body.platformRole
    );
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<User>,
  ): Promise<User> {
    return this.usersService.update(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
