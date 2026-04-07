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

  const [resPag, setResPag] = useState<ReservationPagination | null>(null);

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
          setResPag(data);
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

  const handlePageClick = (num: number) => {
    setSearchParams({ page: num.toString(), status});
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
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>
          Showing all reservations {resPag ? ` (${resPag.total})` : ''}
        </h2>
          {resPag ? (
            <>
              <ul className='flex flex-col gap-3 mb-5'>
                {resPag.items.map((res) => (
                  <li key={res.id}>
                    <ReservationCard res={res} />
                  </li>
                ))}
              </ul>
              <Pagination
                pages={resPag.pages}
                current_page={resPag.current_page}
                has_next={resPag.has_next}
                has_prev={resPag.has_prev}
                onPageClick={handlePageClick}
              />
            </>
          ) : null}
      </section>
    </div>
  );
};