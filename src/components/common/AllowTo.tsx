import type { UserRole } from '@/api/schemas/user.schemas';
import { useAuth } from '@/hooks/useAuth';
import type { ReactNode } from 'react';

interface AllowToProps {
  roles: UserRole[];
  children: ReactNode;
}

export const AllowTo = ({ roles, children }: AllowToProps) => {
  const { user } = useAuth();

  if (!user || user && !roles.includes(user.role)) return null;

  return children;
};