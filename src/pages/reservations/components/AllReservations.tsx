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
import { useDebounce } from '@/hooks/useDebounce';
import { ReservationsLayout } from './ReservationsLayout';

export const AllReservations = () => {
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
    <ReservationsLayout
      type='all'
      status={status}
      handleStatusFilterClick={handleStatusFilterClick}
      usernameVal={usernameVal}
      setUsernameVal={setUsernameVal}
      hallnameVal={hallnameVal}
      setHallnameVal={setHallnameVal}
      resPag={resPag}
      isLoading={isLoading}
      handlePageClick={handlePageClick}
    />
  );
};