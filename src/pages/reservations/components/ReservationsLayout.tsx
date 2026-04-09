import { CustomSelect } from '@/components/common/CustomSelect';
import { SearchInput } from '@/components/common/SearchInput';
import { FilterContainer } from '@/components/ui/FilterContainer';
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { ReservationCard } from './ReservationCard';
import { Pagination } from '@/components/common/Pagination';
import { RES_STATUS_FILTER_ITEMS } from '@/constants/reservations.constants';
import type { ReservationPagination, ReservationStatusFilter } from '@/api/schemas/reservation.schemas';
import { Toggle } from '@/components/ui/toggle';
import { UserRound } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import { AllowTo } from '@/components/common/AllowTo';

interface ReservationsLayoutBase {
  status: ReservationStatusFilter;
  handleStatusFilterClick: (val: ReservationStatusFilter) => void;
  resPag: ReservationPagination | null;
  isLoading: boolean;
  handlePageClick: (num: number) => void;
  setIsSelf: (val: boolean) => void;
  isSelf: boolean;
}

interface ReservationsLayoutSelf extends ReservationsLayoutBase {
  type: 'self';
}

interface ReservationsLayoutAll extends ReservationsLayoutBase {
  type: 'all';
  usernameVal: string;
  setUsernameVal: (search: string) => void;
  hallnameVal: string;
  setHallnameVal: (search: string) => void;
}

type ReservationsLayoutProps = ReservationsLayoutSelf | ReservationsLayoutAll;

export const ReservationsLayout = ({
  status,
  handleStatusFilterClick,
  handlePageClick,
  resPag,
  isLoading,
  setIsSelf,
  isSelf,
  ...props
}: ReservationsLayoutProps) => {
  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7 grow'>
      <section>
        <header className='flex justify-between gap-2 items-center'>
          <h1 className='font-bold text-lg xs:text-2xl uppercase'>Reservations</h1>
          <AllowTo roles={['admin', 'superadmin']}>
            <Toggle
              pressed={props.type === 'self'}
              onPressedChange={setIsSelf}
              variant='outline'
              className='flex flex-wrap h-auto py-2'
              aria-label='Toggle my reservations'
            >
              <span><UserRound size={ICON_SIZE.XS} aria-hidden /></span>
              <span className='text-2xs uppercase font-extrabold tracking-wider'>My reservations</span>
            </Toggle>
          </AllowTo>
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
          {props.type === 'all' ? (
            <div className='flex flex-col gap-4'>
              <FilterContainer label='User name'>
                {(id) => (
                  <SearchInput
                    id={id}
                    value={props.usernameVal}
                    setSearch={props.setUsernameVal}
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
                    value={props.hallnameVal}
                    setSearch={props.setHallnameVal}
                    placeholder='Cascade Falls Event Center'
                    ariaLabel='Filter reservations by hall name'
                    clearLabel='Clear hall name filter'
                  />
                )}
              </FilterContainer>
            </div>
          ) : null }
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
                      <ReservationCard res={res} isSelf={isSelf} />
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