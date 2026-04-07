import { CustomSelect } from '@/components/common/CustomSelect';
import { Pagination } from '@/components/common/Pagination';
import { FilterContainer } from '@/components/ui/FilterContainer';
import { RES_STATUS_FILTER_ITEMS } from '@/constants/reservations.constants';
import { ReservationCard } from './components/ReservationCard';
import { useSearchParams } from 'react-router';
import {
  reservationStatusFilterEnum,
  type ReservationPagination,
  type ReservationStatusFilter
} from '@/api/schemas/reservation.schemas';
import { useEffect, useState } from 'react';
import { reservationService } from '@/api/services/reservation.service';
import { getErrorMessage } from '@/api/api.utils';
import { toast } from 'sonner';

export const ReservationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const rawStatus = searchParams.get('status');
  const statusParse = reservationStatusFilterEnum.safeParse(rawStatus);
  const status: ReservationStatusFilter = statusParse.success ? statusParse.data : 'all';

  const [usersPag, setUsersPag] = useState<ReservationPagination | null>(null);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const data = await reservationService.all(
          {page, ...(status === 'all' ? {} : { status })},
          controller
        );

        if (isCurrent) {
          setUsersPag(data);
          setSearchParams(
            { page: page.toString(), ...(status ? { status: status } : {}) }
          );
        }
      } catch(e) {
        const msg = getErrorMessage(e);
        if (isCurrent && msg) toast.error(msg);
      }
    };

    fetchData();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [page, status, setSearchParams]);

  const handleStatusFilterClick = (value: ReservationStatusFilter) => {
    setSearchParams({ page: page.toString(), status: value});
  };

  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7 grow'>
      <section className='flex justify-between gap-3 items-center'>
        <header>
          <h1 className='font-bold text-lg xs:text-2xl uppercase'>Manage Reservations</h1>
        </header>
      </section>

      <section>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider'>Filters</h2>
        <div>
          <FilterContainer label='Status'>
            {(id) => (
              <CustomSelect
                id={id}
                value={status}
                items={RES_STATUS_FILTER_ITEMS}
                onValueChange={handleStatusFilterClick}
                placeholder='Select status'
              />
            )}
          </FilterContainer>
        </div>
      </section>

      <section className='flex flex-col grow'>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>Showing all reservations (23)</h2>
          <ul className='flex flex-col gap-3 mb-5'>
            <li>
              <ReservationCard
                res={{
                  id: 8845,
                  user_id: 32,
                  user_name: 'John Doe',
                  hall_id: 41,
                  hall_name: 'Princess Dream Palace',
                  reservation_date: 'Oct 24, 2025',
                  status: 'confirmed'
                }}
              />
            </li>
          </ul>
          <Pagination
            pages={23}
            current_page={3}
            has_next={true}
            has_prev={true}
            onPageClick={() => {}}
          />
      </section>
    </div>
  );
};