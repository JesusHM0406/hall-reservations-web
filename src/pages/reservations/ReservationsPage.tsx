import { useState } from 'react';
import { AllReservations } from './components/AllReservations';
import { MyReservations } from './components/MyReservations';
import { useAuth } from '@/hooks/useAuth';
import { useSearchParams } from 'react-router';

export const ReservationsPage = () => {
  const { user } = useAuth();

  const [isSelf, setIsSelf] = useState<boolean>(user?.role === 'user');
  const [_, setSearchParams] = useSearchParams();

  const handleToggler = (val: boolean) => {
    setSearchParams({}, { replace: true });
    setIsSelf(val);
  };

  if (isSelf || user?.role === 'user') return <MyReservations setIsSelf={handleToggler} />;

  return <AllReservations setIsSelf={handleToggler} />;
};