import { getErrorMessage } from '@/api/api.utils';
import {
  reservationStatusFilterEnum,
  type ReservationPagination,
  type ReservationStatusFilter
} from '@/api/schemas/reservation.schemas';
import { reservationService } from '@/api/services/reservation.service';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { ReservationsLayout } from './ReservationsLayout';

export const MyReservations = ({ setIsSelf }: { setIsSelf: (val: boolean) => void }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = parseInt(searchParams.get('page') ?? '1', 10);
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const rawStatus = searchParams.get('status');
  const statusParse = reservationStatusFilterEnum.safeParse(rawStatus);
  const status: ReservationStatusFilter = statusParse.success ? statusParse.data : 'all';

  const [resPag, setResPag] = useState<ReservationPagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await reservationService.allCurrentUser(
          { page, ...(status === 'all' ? {} : { status }) },
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
  }, [page, status, refreshCount]);

  const handleStatusFilterClick = (value: ReservationStatusFilter) => {
    setSearchParams(
      { page: page.toString(), status: value },
      { replace: true }
    );
  };

  const handlePageClick = (num: number) => {
    setSearchParams(
      { page: num.toString(), status },
      { replace: true }
    );
  };

  return (
    <ReservationsLayout
      type='self'
      status={status}
      handleStatusFilterClick={handleStatusFilterClick}
      resPag={resPag}
      isLoading={isLoading}
      handlePageClick={handlePageClick}
      setIsSelf={setIsSelf}
      onRefresh={() => {setRefreshCount((prev) => prev + 1)}}
    />
  );
};