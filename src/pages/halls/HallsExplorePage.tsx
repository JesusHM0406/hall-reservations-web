import Button from '@/components/common/Button';
import { PlusCircle } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import { FilterContainer } from '@/components/ui/FilterContainer';
import { FilterSelect } from '@/components/ui/FilterSelect';
import { HALL_AVAILABILITY_FILTER_ITEMS } from '@/constants/hall.constants';

export const HallsExplorePage = () => {
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
                onValueChange={() => {}}
                placeholder='Select status'
              />
          </FilterContainer>
        </div>
      </section>

      <section>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>Showing all halls</h2>
        <ul className='flex flex-col gap-3'>
          <li>item</li>
        </ul>
      </section>
    </div>
  );
};
