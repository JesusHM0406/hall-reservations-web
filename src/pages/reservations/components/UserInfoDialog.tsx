import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export const UserInfoDialog = () => {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User detail</DialogTitle>
          <DialogDescription>Here you can see user information, but you can't perform any actions directly. To do that, you must go to the users page.</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2 font-bold border-t border-inactive/25 pt-4'>
          <div>
            <h3 className='uppercase text-xs text-gray tracking-wider'>User name</h3>
            <p>John Doe</p>
          </div>
          <div>
            <h3 className='uppercase text-xs text-gray tracking-wider mb-1'>Status</h3>
            <Badge
              label='Active'
              ariaLabel='Active'
              iconName='circle-check'
              intent='success'
            />
            <Badge
              label='Not deleted'
              ariaLabel='Not deleted'
              iconName='circle-check'
              intent='success'
            />
          </div>
          <div>
            <h3 className='uppercase text-xs text-gray tracking-wider'>Role</h3>
            <p>User</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};