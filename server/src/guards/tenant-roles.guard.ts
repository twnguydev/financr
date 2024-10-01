import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TenantRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles: string[] = this.reflector.get<string[]>('tenantRoles', context.getHandler());
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userTenantRoles = user.tenantRoles.map(role => role.role);

    return requiredRoles.some(role => userTenantRoles.includes(role));
  }
}
