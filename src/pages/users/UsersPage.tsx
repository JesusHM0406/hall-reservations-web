import { FilterSelect } from '@/components/common/FilterSelect';
import { FilterContainer } from '@/components/ui/FilterContainer';
import { USER_ROLE_FILTER_ITEMS, USER_STATUS_FILTER_ITEMS } from '@/constants/user.constants';

export const UsersPage = () => {
  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7'>
      <header className='flex justify-between gap-3 items-center'>
        <h1 className='font-bold text-lg xs:text-2xl uppercase'>Manage users</h1>
      </header>

      <section>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider'>Filters</h2>
        <div className='flex gap-3 mt-3'>
          <FilterContainer label='Role'>
            {(id) => (
              <FilterSelect
                id={id}
                value='all'
                items={USER_ROLE_FILTER_ITEMS}
                onValueChange={() => {}}
                placeholder='Select role'
              />
            )}
          </FilterContainer>
          <FilterContainer label='Status'>
            {(id) => (
              <FilterSelect
                id={id}
                value='all'
                items={USER_STATUS_FILTER_ITEMS}
                onValueChange={() => {}}
                placeholder='Select status'
              />
            )}
          </FilterContainer>
        </div>
      </section>
    </div>
  );
};