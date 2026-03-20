import { createContext } from 'react';
import type { LoginFormData } from '../api/schemes/auth.scheme';
import type { User } from '../api/schemes/user.scheme';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logIn: (payload: LoginFormData) => Promise<void>;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);