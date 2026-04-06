import { createContext } from 'react';
import type { LoginFormData } from '@/api/schemas/auth.schemas';
import type { User, UserUpdate } from '@/api/schemas/user.schemas';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logIn: (payload: LoginFormData) => Promise<void>;
  logOut: () => void;
  updateCurrUser: (payload: UserUpdate) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);