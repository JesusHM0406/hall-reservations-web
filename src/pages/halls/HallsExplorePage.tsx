import Button from '@/components/ui/Button';
import { PlusCircle } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import { FilterContainer } from '@/components/ui/FilterContainer';
import { FilterSelect } from '@/components/common/FilterSelect';
import { HALL_AVAILABILITY_FILTER_ITEMS } from '@/constants/hall.constants';
import { useEffect, useState } from 'react';
import { hallAvailabilityFilterEnum, type HallAvailabilityFilter, type HallPagination } from '@/api/schemas/hall.schemas';
import { hallService } from '@/api/services/hall.service';
import { getErrorMessage } from '@/api/api.utils';
import { toast } from 'sonner';
import { HallCard } from '@/pages/halls/components/HallCard';
import { useSearchParams } from 'react-router';
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { Pagination } from '@/components/common/Pagination';
import { CreateHallDrawer } from '@/pages/halls/components/CreateHallDrawer';
import { AllowTo } from '@/components/common/AllowTo';

export const HallsExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const statusParse = hallAvailabilityFilterEnum.safeParse(searchParams.get('status'));

  let status: HallAvailabilityFilter;

  if (statusParse.error) status = 'all';
  else status = statusParse.data;

  const [hallsPagination, setHallsPagination] = useState<HallPagination | null>(null);

  const [refreshCount, setRefreshCount] = useState<number>(0);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();

    const fetchHalls = async () => {
      setIsLoading(true);
      try {
        const data = await hallService.all({ page, status }, controller);

        if (isCurrent) setHallsPagination(data);
        setSearchParams({ page: page.toString(), status }, { replace: true });
      } catch(e) {
        const msg = getErrorMessage(e);
        if (isCurrent && msg) toast.error(msg);
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    fetchHalls();

    return () => {
      isCurrent = false;
      controller.abort();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status, refreshCount]);

  const handleFilterClick = (value: HallAvailabilityFilter) => {
    setSearchParams({ page: page.toString(), status: value }, { replace: true });
  };

  const handlePageClick = (num: number) => {
    setSearchParams({ page: num.toString(), status }, { replace: true });
  };

  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7 grow'>
      <section className='flex justify-between gap-3 items-center'>
        <header>
          <h1 className='font-bold text-lg xs:text-2xl uppercase'>Explore Halls</h1>
        </header>

        <AllowTo roles={['admin', 'superadmin']}>
          <CreateHallDrawer onSuccess={() => setRefreshCount((prev) => prev + 1)}>
            <Button className='text-2xs uppercase' intent='hall' filled shadow darkFocus >
              <span><PlusCircle size={ICON_SIZE.MD} aria-hidden /></span>
              <span className='w-min 2xs:w-auto'>New Hall</span>
            </Button>
          </CreateHallDrawer>
        </AllowTo>
      </section>

      <section>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider'>Filters</h2>
        <div>
          <FilterContainer label='Status'>
              <FilterSelect
                value={status}
                items={HALL_AVAILABILITY_FILTER_ITEMS}
                onValueChange={handleFilterClick}
                placeholder='Select status'
              />
          </FilterContainer>
        </div>
      </section>

      <section className='flex flex-col grow'>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>Showing all halls ({hallsPagination?.total})</h2>
        {isLoading ? (
          <div className='grid place-content-center my-3 w-full grow'>
            <div className='flex flex-col items-center'>
              <SpinnerLoader size='xxl' intent='gray' />
            <span className='uppercase text-xs text-gray font-bold mt-3'>Loading data</span>
            </div>
          </div>
        ) : (
          <>
            {hallsPagination ? (
              <>
                <ul className='flex flex-col gap-3 mb-5'>
                  {hallsPagination.items.map((hall) => {
                    const descPreview = hall.description.length > 100 ?
                      hall.description.slice(0, 97) + '...' :
                      hall.description

                    return (
                      <li key={hall.id}>
                        <HallCard hall={{
                          id: hall.id,
                          name: hall.name,
                          is_available: hall.is_available,
                          preview: descPreview
                        }} />
                      </li>
                    )
                  })}
                </ul>
                <Pagination
                  pages={hallsPagination.pages}
                  current_page={hallsPagination.current_page}
                  has_next={hallsPagination.has_next}
                  has_prev={hallsPagination.has_prev}
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