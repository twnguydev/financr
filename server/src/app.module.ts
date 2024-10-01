import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfig } from '@config/database.config';
import { UsersModule } from '@modules/users/users.module';
import { TenantsModule } from '@modules/tenants/tenants.module';
import { BillingModule } from '@modules/billing/billing.module';
import { AuthModule } from '@modules/auth/auth.module';
import { HomeModule } from '@modules/home/home.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    UsersModule,
    TenantsModule,
    BillingModule,
    AuthModule,
    HomeModule
  ],
})
export class AppModule {}
