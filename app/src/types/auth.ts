import { User } from '@types/user';
import { Tenant } from '@types/tenant';

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    getCurrentTenant: () => Tenant | null;
    getCurrentTenantRole: () => string | null;
}