import { createContext } from 'react';
import type { LoginFormData } from '@/api/schemas/auth.schemas';
import type { User } from '@/api/schemas/user.schemas';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logIn: (payload: LoginFormData) => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);