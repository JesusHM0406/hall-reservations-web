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
import { useCallback, useEffect, useRef, useState } from 'react';
import { reservationService } from '@/api/services/reservation.service';
import { getErrorMessage } from '@/api/api.utils';
import { toast } from 'sonner';
import { SearchInput } from '@/components/common/SearchInput';
import { useDebounce } from '@/hooks/useDebounce';
import SpinnerLoader from '@/components/ui/SpinnerLoader';

export const ReservationsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = parseInt(searchParams.get('page') ?? '1', 10);
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const rawStatus = searchParams.get('status');
  const statusParse = reservationStatusFilterEnum.safeParse(rawStatus);
  const status: ReservationStatusFilter = statusParse.success ? statusParse.data : 'all';

  const username = searchParams.get('user_name') ?? '';
  const hallname = searchParams.get('hall_name') ?? '';

  const [resPag, setResPag] = useState<ReservationPagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [usernameVal, setUsernameVal] = useState<string>(username);
  const [hallnameVal, setHallnameVal] = useState<string>(hallname);

  const debouncedUser = useDebounce(usernameVal, 400);
  const debouncedHall = useDebounce(hallnameVal, 400);

  const getNameSearch = useCallback((userVal: string, hallVal: string) => ({
    ...(userVal.length > 2 ? { user_name: userVal } : {}),
    ...(hallVal.length > 2 ? { hall_name: hallVal } : {})
  }), []);

  const lastUsernameVal = useRef<string>('');
  const lastHallnameVal = useRef<string>('');

  useEffect(() => {
    if (
      debouncedHall === lastHallnameVal.current &&
      debouncedUser === lastUsernameVal.current
    ) return;

    let userObj = {};
    let hallObj = {};

    if (debouncedHall.length > 2) {
      lastHallnameVal.current = debouncedHall;
      hallObj = { hall_name: debouncedHall };
    } else if (!debouncedHall) {
      lastHallnameVal.current = '';
      hallObj = {};
    }

    if (debouncedUser.length > 2) {
      lastUsernameVal.current = debouncedUser;
      userObj = { user_name: debouncedUser };
    } else if (!debouncedUser) {
      lastUsernameVal.current = '';
      userObj = {};
    }

    setSearchParams(
      { page: page.toString(), ...(status ? { status: status } : {}), ...userObj, ...hallObj },
      { replace: true }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedHall, debouncedUser, page, status]);

  useEffect(() => {
    setHallnameVal(hallname);
    setUsernameVal(username);

    let isCurrent = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await reservationService.all(
          { page, ...(status === 'all' ? {} : { status }), ...(getNameSearch(username, hallname)) },
          controller
        );

        if (isCurrent) setResPag(data);
      } catch(e) {
        const msg = getErrorMessage(e);
        if (isCurrent && msg) toast.error(msg);
      }
      if (isCurrent) setIsLoading(false);
    };

    fetchData();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [page, status, hallname, username, getNameSearch]);

  const handleStatusFilterClick = (value: ReservationStatusFilter) => {
    setSearchParams(
      {
        page: page.toString(),
        status: value,
        ...(getNameSearch(username, hallname))
      },
      { replace: true }
    );
  };

  const handlePageClick = (num: number) => {
    setSearchParams(
      {
        page: num.toString(),
        status,
        ...(getNameSearch(username, hallname))
      },
      { replace: true }
    );
  };

  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7 grow'>
      <section className='flex justify-between gap-3 items-center'>
        <header>
          <h1 className='font-bold text-lg xs:text-2xl uppercase'>Reservations</h1>
        </header>
      </section>

      <section>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider'>Filters</h2>
        <div className='flex flex-col gap-4'>
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
          <div className='flex flex-col gap-4'>
            <FilterContainer label='User name'>
              {(id) => (
                <SearchInput
                  id={id}
                  value={usernameVal}
                  setSearch={setUsernameVal}
                  placeholder='John Doe'
                  ariaLabel='Filter reservations by user name'
                  clearLabel='Clear user name filter'
                />
              )}
            </FilterContainer>

            <FilterContainer label='Hall name'>
              {(id) => (
                <SearchInput
                  id={id}
                  value={hallnameVal}
                  setSearch={setHallnameVal}
                  placeholder='Cascade Falls Event Center'
                  ariaLabel='Filter reservations by hall name'
                  clearLabel='Clear hall name filter'
                />
              )}
            </FilterContainer>
          </div>
        </div>
      </section>

      <section className='flex flex-col grow'>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>
          Results {resPag ? ` (${resPag.total})` : ''}
        </h2>
        {isLoading ? (
          <div className='my-3'>
            <div className='flex flex-col items-center'>
              <SpinnerLoader size='xxl' intent='gray' />
              <span className='uppercase text-xs text-gray font-bold mt-3'>Loading data</span>
            </div>
          </div>
        ) : (
          <>
            {resPag ? (
              <>
                <ul className='flex flex-col gap-5 mb-5'>
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
          </>
        )}
      </section>
    </div>
  );
};