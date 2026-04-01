import Button from '@/components/common/Button';
import { PlusCircle } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import { FilterContainer } from '@/components/ui/FilterContainer';
import { FilterSelect } from '@/components/ui/FilterSelect';
import { HALL_AVAILABILITY_FILTER_ITEMS } from '@/constants/hall.constants';
import { useEffect, useState } from 'react';
import { hallAvailabilityFilterEnum, type HallAvailabilityFilter, type HallPagination } from '@/api/schemas/hall.schemas';
import { hallService } from '@/api/services/hall.service';
import { getErrorMessage } from '@/api/api.utils';
import { toast } from 'sonner';
import { HallCard } from '@/components/ui/HallCard';
import { useSearchParams } from 'react-router';
import SpinnerLoader from '@/components/common/SpinnerLoader';

export const HallsExplorePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const page = isNaN(rawPage) ? 1 : rawPage;

  const statusParse = hallAvailabilityFilterEnum.safeParse(searchParams.get('status'));

  let status: HallAvailabilityFilter;

  if (statusParse.error) status = 'all';
  else status = statusParse.data;
  
  const [hallsPagination, setHallsPagination] = useState<HallPagination | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHalls = async () => {
      setIsLoading(true);
      try {
        const data = await hallService.all({ page, status }, controller);
      
        setHallsPagination(data);
        setSearchParams({ page: page.toString(), status }, { replace: true });
      } catch(e) {
        const msg = getErrorMessage(e);
        if (!msg) return;
        toast.error(msg);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHalls();

    return () => { controller.abort() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, status]);

  const handleFilterClick = (value: HallAvailabilityFilter) => {
    setSearchParams({ page: page.toString(), status: value }, { replace: true });
  };

  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7 grow'>
      <header className='flex justify-between gap-3 items-center'>
        <h1 className='font-bold text-lg xs:text-2xl uppercase'>Explore Halls</h1>
        <Button className='text-2xs uppercase' intent='hall' filled shadow darkFocus >
          <span><PlusCircle size={ICON_SIZE.MD} aria-hidden /></span>
          <span className='w-min 2xs:w-auto'>New Hall</span>
        </Button>
      </header>

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
            <SpinnerLoader size='xxl' intent='gray' />
            <span className='uppercase text-xs text-gray font-bold mt-3'>Loading data</span>
          </div>
        ) : (
          <>
            <ul className='flex flex-col gap-3'>
              {hallsPagination?.items.map((hall) => {
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
          </>
        )}
      </section>
    </div>
  );
};
