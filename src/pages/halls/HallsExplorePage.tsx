import Button from '@/components/common/Button';
import { PlusCircle } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import { FilterContainer } from '@/components/ui/FilterContainer';
import { FilterSelect } from '@/components/ui/FilterSelect';
import { HALL_AVAILABILITY_FILTER_ITEMS } from '@/constants/hall.constants';
import { useEffect, useState } from 'react';
import type { HallAvailabilityFilter, HallPagination, HallPaginationParams } from '@/api/schemas/hall.schemas';
import { hallService } from '@/api/services/hall.service';
import { getErrorMessage } from '@/api/api.utils';
import { toast } from 'sonner';
import { HallCard } from '@/components/ui/HallCard';

export const HallsExplorePage = () => {
  const [params, setParams] = useState<HallPaginationParams>({ page: 1 })
  
  const [hallsPagination, setHallsPagination] = useState<HallPagination | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHalls = async () => {
      try {
        const data = await hallService.all(params, controller);
      
        setHallsPagination(data);
      } catch(e) {
        const msg = getErrorMessage(e);
        if (!msg) return;
        toast.error(msg);
      }
    }

    fetchHalls();

    return () => { controller.abort() }
  }, [params]);

  const handleFilterClick = (value: HallAvailabilityFilter) => {
    setParams((prev) => ({ ...prev, status: value }));
  };

  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7'>
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
                items={HALL_AVAILABILITY_FILTER_ITEMS}
                onValueChange={handleFilterClick}
                placeholder='Select status'
              />
          </FilterContainer>
        </div>
      </section>

      <section>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>Showing all halls ({hallsPagination?.total})</h2>
        <ul className='flex flex-col gap-3'>
          {hallsPagination?.items.map((hall) => {
            return (
              <li key={hall.id}>
                <HallCard hall={{
                  id: hall.id,
                  name: hall.name,
                  is_available: hall.is_available,
                  preview: hall.description.slice(0, 97) + '...'
                }} />
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  );
};
