import { Badge } from '@/components/ui/Badge';
import CustomButton from '@/components/ui/Button';
import { Avatar } from './components/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { eventBus } from '@/lib/events';
import { useEffect } from 'react';
import { UpdateNameDrawer } from './components/UpdateNameDrawer';
import { LogoutDialog } from './components/LogoutDialog';

export const MyAccountPage = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) eventBus.dispatch('auth:unauthorized');
  }, [user])

  if (!user) return null;

  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7'>
      <header className='flex justify-between gap-3 items-center'>
        <h1 className='font-bold text-2xl uppercase'>My Account</h1>
      </header>

      <div className='transition-transform hover:scale-101'>
        <section>
          <article className='flex flex-col gap-3 items-center bg-brand text-white font-bold text-center rounded-ss-2xl rounded-se-2xl p-6'>
            <Avatar id={user.id} name={user.name} />
            <h2>{user.name}</h2>
          </article>
        </section>

        <section className='flex flex-col gap-3 font-bold rounded-ee-2xl rounded-es-2xl p-6 border border-inactive/25 dark:bg-dark-gray dark:border-slate-gray'>
          <h2 className='font-bold uppercase text-sm text-gray tracking-wider'>Profile details</h2>
          <section className='text-xs'>
            <h3 className='font-bold uppercase text-gray tracking-wider mb-1'>Status</h3>
            <Badge
              label={user.is_active ? 'Active' : 'Inactive'}
              ariaLabel={`Your account is ${user.is_active ? 'active' : 'inactive'}`}
              intent={user.is_active ? 'success' : 'danger'}
              iconName={user.is_active ? 'circle-check' : 'circle-x'}
            />
          </section>
          <section className='text-xs'>
            <h3 className='font-bold uppercase text-gray tracking-wider mb-1'>Role</h3>
            <Badge
              label={user.role}
              ariaLabel={`Your role is ${user.role}`}
              intent='info'
              iconName='shield'
            />
          </section>
        </section>
      </div>

      <section className='flex flex-col gap-3 font-bold rounded-2xl p-6 border border-inactive/25 transition-transform hover:scale-101 dark:bg-dark-gray dark:border-slate-gray'>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider'>Actions</h2>
        <div className='flex w-full gap-2'>
          <UpdateNameDrawer user={user}>
            <CustomButton className='uppercase text-2xs font-bold tracking-wide grow'>Update name</CustomButton>
          </UpdateNameDrawer>
          <LogoutDialog>
            <CustomButton
              intent='danger'
              filled={false}
              className='text-danger uppercase text-2xs font-bold tracking-wide grow hover:text-white dark:text-white'
            >
              Logout
            </CustomButton>
          </LogoutDialog>
        </div>
      </section>

      <section className='flex flex-col gap-3 font-bold rounded-2xl p-6 border border-danger/25 transition-transform hover:scale-101 dark:bg-dark-gray'>
        <h2 className='font-bold uppercase text-sm text-danger/70 tracking-wider'>Danger zone</h2>
        <CustomButton
          intent='danger'
          className='uppercase text-2xs font-bold tracking-wide'
        >
          Delete account
        </CustomButton>
      </section>
    </div>
  );
};