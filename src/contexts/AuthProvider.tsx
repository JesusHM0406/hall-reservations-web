import { useCallback, useMemo, useState, type ReactNode } from 'react';
import type { LoginFormData } from '@/api/schemas/auth.schemas';
import { authService } from '@/api/services/auth.service';
import type { User, UserUpdate } from '@/api/schemas/user.schemas';
import { AuthContext, type AuthContextType } from './AuthContext';
import { userService } from '@/api/services/user.service';
import { eventBus } from '@/lib/events';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const logIn = useCallback(async (payload: LoginFormData) => {
    const response = await authService.logIn(payload);
    localStorage.setItem('token', response.access_token);
    const userResponse = await userService.getCurrent();
    setUser(userResponse);

    eventBus.dispatch('auth:login-success');
  }, []);

  const logOut = useCallback(()=> {
    setUser(null);
    localStorage.removeItem('token');

    eventBus.dispatch('auth:logout');
  }, []);

  const updateCurrUser = useCallback((payload: UserUpdate) => {
    setUser((prev) => {
      if (!prev) return null;
      return {...prev, name: payload.name}
    })
  }, []);

  const value: AuthContextType = useMemo(() => ({
    user,
    isAuthenticated: user !== null,
    logIn,
    logOut,
    updateCurrUser
  }), [user, logIn, logOut, updateCurrUser]);

  return <AuthContext value={value}>{children}</AuthContext>
};