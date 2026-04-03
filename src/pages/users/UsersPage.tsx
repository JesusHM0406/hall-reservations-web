import { FilterSelect } from '@/components/common/FilterSelect';
import { FilterContainer } from '@/components/ui/FilterContainer';
import { USER_ROLE_FILTER_ITEMS, USER_STATUS_FILTER_ITEMS } from '@/constants/user.constants';
import { UserCard } from './components/UserCard';
import { useSearchParams } from 'react-router';
import {
  userRoleFilterEnum,
  userStatusFilterEnum,
  type UserPagination,
  type UserRoleFilter,
  type UserStatusFilter
} from '@/api/schemas/user.schemas';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '@/api/api.utils';
import { toast } from 'sonner';
import { userService } from '@/api/services/user.service';
import SpinnerLoader from '@/components/ui/SpinnerLoader';

export const UsersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const page = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  const rawRole = searchParams.get('role');
  const roleParse = userRoleFilterEnum.safeParse(rawRole);
  const realRole: UserRoleFilter = roleParse.success ? roleParse.data : 'all';

  const rawStatus = searchParams.get('status');
  const statusParse = userStatusFilterEnum.safeParse(rawStatus);
  const realStatus: UserStatusFilter = statusParse.success ? statusParse.data : 'all';

  const [usersPag, setUsersPag] = useState<UserPagination | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();

    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const data = await userService.getAll(
          { page, role: realRole, status: realStatus },
          controller
        );

        if (isCurrent) {
          setUsersPag(data);
          setSearchParams({ page: page.toString(), role: realRole, status: realStatus }, { replace:true });
        }
      } catch(e) {
        const msg = getErrorMessage(e);
        if (isCurrent && msg) toast.error(msg);
      }
      if (isCurrent) setIsLoading(false);
    }

    fetchUsers();

    return () => {
      isCurrent = false;
      controller.abort();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, realRole, realStatus]);

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

      <section className='flex flex-col grow'>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>Showing all users</h2>
        {isLoading ? (
            <div className='grid place-content-center my-3 w-full grow'>
              <div className='flex flex-col items-center'>
                <SpinnerLoader size='xxl' intent='gray' />
              <span className='uppercase text-xs text-gray font-bold mt-3'>Loading data</span>
              </div>
            </div>
          ) : (
            <ul className='flex flex-col gap-3 mb-5'>
              {usersPag ? usersPag.items.map((user) => (
                <li key={user.id}>
                  <UserCard user={user} />
                </li>
              )) : null}
            </ul>
          )}
      </section>
    </div>
  );
};