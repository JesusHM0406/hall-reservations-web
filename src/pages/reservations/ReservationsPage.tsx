import { AllReservations } from './components/AllReservations';
import { MyReservations } from './components/MyReservations';
import { useAuth } from '@/hooks/useAuth';

export const ReservationsPage = () => {
  const { user } = useAuth();

  if (user?.role === 'user') return <MyReservations />;

  return <AllReservations />;
};