import { Controller, Post, Get, Body, UseGuards, Request, UnauthorizedException, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@modules/auth/auth.service';
import { UsersService } from '@modules/users/users.service';
import { User } from '@entities/user.entity';
import { PlatformRole } from '@enums/platform-role.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ access_token: string }> {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(
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
      };
      platformRole: PlatformRole 
    },
    @Query() query: { 
      tenantId?: string; 
      tenantRole?: string 
    }
  ): Promise<User> {
    return this.authService.register(
      body.email,
      body.password,
      body.firstname,
      body.lastname,
      body.birthdate,
      body.address,
      body.platformRole,
      query.tenantId || undefined,
      query.tenantRole || undefined
    );
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string): Promise<{ message: string }> {
    const user = await this.usersService.verifyEmail(token);

    if (user) {
      return { message: 'Votre e-mail a été vérifié avec succès !' };
    } else {
      return { message: 'Le token est invalide ou a expiré.' };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}