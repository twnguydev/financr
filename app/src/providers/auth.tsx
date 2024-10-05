"use client";

import React, { createContext, Context, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContextType } from '@/types/auth';
import { User, PlatformRoleEnum } from '@/types/user';
import { Tenant } from '@/types/tenant';

const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect((): () => void => {
    const storedUser: string | null = window.localStorage.getItem('FINANCR_USER_DATA');
    const storedToken: string | null = window.localStorage.getItem('FINANCR_AUTH_TOKEN');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    const tokenTimeout = setTimeout((): void => {
      logout();
    }, 30 * 60 * 1000);

    return (): void => {
      clearTimeout(tokenTimeout);
    };
  }, []);

  const login = async (userData: any, accessToken: string): Promise<void> => {
    if (userData && userData.id && userData.email) {
      const newUser: User = {
        id: userData.id,
        email: userData.email,
        platformRole: userData.PlatformRoleEnum || PlatformRoleEnum.USER,
        tenantRoles: userData.tenantRoles,
        firstname: userData.firstname,
        lastname: userData.lastname,
        birthdate: new Date(userData.birthdate),
        address: userData.address || null,
        zipcode: userData.zipcode || null,
        city: userData.city || null,
        country: userData.country || null,
        isActive: userData.isActive,
        createdAt: new Date(userData.createdAt),
        updatedAt: new Date(userData.updatedAt)
      };
      setUser(newUser);
      setToken(accessToken);
      window.localStorage.setItem('FINANCR_AUTH_TOKEN', accessToken);
      window.localStorage.setItem('FINANCR_USER_DATA', JSON.stringify(newUser));
    } else {
      return Promise.reject('Les informations de connexion sont incorrectes');
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    window.localStorage.removeItem('FINANCR_USER_DATA');
    window.localStorage.removeItem('FINANCR_AUTH_TOKEN');
    router.push('/');
  };

  const getCurrentTenant = (): Tenant | null => {
    if (!user || !user.tenantRoles || user.tenantRoles.length === 0) {
      return null;
    }

    return user.tenantRoles[0].tenant;
  };

  const getCurrentTenantRole = (): string | null => {
    if (!user || !user.tenantRoles || user.tenantRoles.length === 0) {
      return null;
    }
    // Assuming the first tenant role is the current one.
    return user.tenantRoles[0].role;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, getCurrentTenant, getCurrentTenantRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context: AuthContextType | null = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};