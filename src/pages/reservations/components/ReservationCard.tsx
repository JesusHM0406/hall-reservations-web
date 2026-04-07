import type { Reservation } from '@/api/schemas/reservation.schemas';
import { Badge } from '@/components/ui/Badge';
import { ICON_SIZE } from '@/constants/ui.constants';
import { PATHS } from '@/paths';
import { Calendar, MoreVertical, UserRound } from 'lucide-react';
import { Link } from 'react-router';

interface ReservationCardProps {
  res: Reservation;
}

export const ReservationCard = ({ res }: ReservationCardProps) => {
  return (
    <article className='border border-inactive/25 gap-2 bg-subtle-white/30 dark:bg-dark-gray rounded-xl hover:bg-inactive/10 dark:hover:bg-inactive/15 transition-colors duration-150 flex flex-col overflow-hidden'>
      <div className='p-3'>
        <header className='flex justify-between items-start mb-4'>
          <div className='flex flex-wrap gap-2'>
            <Badge
              label={res.status}
              ariaLabel={res.status}
              intent={res.status === 'confirmed' ? 'success' : (res.status === 'cancelled' ? 'danger' : 'info')}
              iconName='circle'
            />
          </div>

          <button
            type='button'
            className='p-1.5 border border-inactive/25 rounded-md transition-colors hover:border-res hover:text-res'
            aria-label='Show actions for this reservation'
          >
            <MoreVertical size={ICON_SIZE.SM} aria-hidden />
          </button>
        </header>

        <section>
          <div>
            <Link to={`/${PATHS.halls.root}/${PATHS.halls.detail}/${res.hall_id}`}>
              <h3 className='text-xl font-semibold tracking-tight leading-tight'>
                {res.hall_name}
              </h3>
            </Link>
          </div>

          <div className='flex flex-col gap-2 mt-4'>
            <div className='flex items-center gap-3 text-inactive dark:text-gray'>
              <Calendar size={ICON_SIZE.SM} className='text-blue-500' />
              <span className='text-sm'>{res.reservation_date}</span>
            </div>

            <div className='flex items-center gap-3 text-inactive'>
              <UserRound size={ICON_SIZE.SM} />
              <div className='text-sm'>
                <span className='font-medium'>{res.user_name}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className='p-4 border-t border-transparent flex justify-between items-center bg-inactive/25 dark:bg-dark dark:border-inactive/25'>
        <span className='text-[10px] text-gray dark:text-inactive font-mono tracking-tighter uppercase'>
          RESERVATION_REF: {res.id}
        </span>
      </footer>

    </article>
  );
};