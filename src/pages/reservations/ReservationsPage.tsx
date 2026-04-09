import { useState } from 'react';
import { AllReservations } from './components/AllReservations';
import { MyReservations } from './components/MyReservations';
import { useAuth } from '@/hooks/useAuth';

export const ReservationsPage = () => {
  const { user } = useAuth();

  const [isSelf, setIsSelf] = useState<boolean>(user?.role === 'user');

  if (isSelf || user?.role === 'user') return <MyReservations setIsSelf={setIsSelf} />;

  return <AllReservations setIsSelf={setIsSelf} />;
};