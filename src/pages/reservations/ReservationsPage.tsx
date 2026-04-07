import { CustomSelect } from '@/components/common/CustomSelect';
import { Pagination } from '@/components/common/Pagination';
import { FilterContainer } from '@/components/ui/FilterContainer';
import { RES_STATUS_FILTER_ITEMS } from '@/constants/reservations.constants';

export const ReservationsPage = () => {
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
                value='confirmed'
                items={RES_STATUS_FILTER_ITEMS}
                onValueChange={() => {}}
                placeholder='Select status'
              />
            )}
          </FilterContainer>
        </div>
      </section>

      <section className='flex flex-col grow'>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>Showing all reservations (23)</h2>
          <ul className='flex flex-col gap-3 mb-5'>
            <li>Hi</li>
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