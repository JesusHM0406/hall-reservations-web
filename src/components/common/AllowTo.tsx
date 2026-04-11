import type { UserRole } from '@/api/schemas/user.schemas';
import { useAuth } from '@/hooks/useAuth';
import type { ReactNode } from 'react';

interface AllowToProps {
  requires: 'auth' | UserRole[];
  children: ReactNode;
}

export const AllowTo = ({ children, requires }: AllowToProps) => {
  const { user } = useAuth();

  if (!user) return null;
  if (requires === 'auth') return children;
  if (!requires.includes(user.role)) return null;

  return children;
};