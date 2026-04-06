import { Badge } from "@/components/ui/Badge";
import CustomButton from "@/components/ui/Button";

export const MyAccountPage = () => {
  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7'>
      <header className='flex justify-between gap-3 items-center'>
        <h1 className='font-bold text-2xl uppercase'>My Account</h1>
      </header>

      <div className='hover:scale-101'>
        <section>
          <article className='flex flex-col gap-3 items-center bg-brand text-white font-bold text-center rounded-ss-2xl rounded-se-2xl p-6'>
            <span className='w-20 h-20 bg-gray block shrink-0'></span>
            <h2>Here goes the username Here goes the username Here</h2>
          </article>
        </section>

        <section className='flex flex-col gap-3 font-bold rounded-ee-2xl rounded-es-2xl p-6 border border-inactive/25 dark:bg-dark-gray dark:border-slate-gray'>
          <h2 className='font-bold uppercase text-sm text-gray tracking-wider'>Profile details</h2>
          <section className='text-xs'>
            <h3 className='font-bold uppercase text-gray tracking-wider mb-1'>Status</h3>
            <Badge
              label='Active'
              ariaLabel='The account is active'
              intent='success'
              iconName='circle-check'
            />
          </section>
          <section className='text-xs'>
            <h3 className='font-bold uppercase text-gray tracking-wider mb-1'>Role</h3>
            <Badge
              label='User'
              ariaLabel='Your role is user'
              intent='info'
              iconName='shield'
            />
          </section>
        </section>
      </div>

      <section className='flex flex-col gap-3 font-bold rounded-2xl p-6 border border-inactive/25 hover:scale-101 dark:bg-dark-gray dark:border-slate-gray'>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider'>Actions</h2>
        <div className='flex w-full gap-2'>
          <CustomButton className='uppercase text-2xs font-bold tracking-wide grow'>Update name</CustomButton>
          <CustomButton
            intent='danger'
            filled={false}
            className='text-danger uppercase text-2xs font-bold tracking-wide grow hover:text-white dark:text-white'
          >
            Logout
          </CustomButton>
        </div>
      </section>

      <section className='flex flex-col gap-3 font-bold rounded-2xl p-6 border border-danger/25 hover:scale-101 dark:bg-dark-gray'>
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