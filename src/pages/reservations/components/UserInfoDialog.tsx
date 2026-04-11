import { getErrorMessage } from '@/api/api.utils';
import type { Reservation } from '@/api/schemas/reservation.schemas';
import type { User } from '@/api/schemas/user.schemas';
import { userService } from '@/api/services/user.service';
import { Badge } from '@/components/ui/Badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface UserInfoDialogProps {
  res: Reservation;
  returnFocusTargetId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const UserInfoDialog = ({ isOpen, onClose, returnFocusTargetId, res }: UserInfoDialogProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isCurrent = true;
    const controller = new AbortController();

    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const data = await userService.byId(res.user_id, controller);

        if (!isCurrent) return;
        setUser(data);
      } catch(e) {
        if (!isCurrent) return;
        const msg = getErrorMessage(e);
        if (msg) toast.error(msg);
        onClose();
      }
      if (isCurrent) setIsLoading(false);
    };

    fetchUser();

    return () => {
      isCurrent = false;
      controller.abort();
    }
  }, [res, onClose]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          const triggerId = returnFocusTargetId ?? `res-dropdown-trigger-${res.id}`;
          const trigger = document.getElementById(triggerId);
          trigger?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>User detail</DialogTitle>
          <DialogDescription>Here you can see user information, but you can't perform any actions directly. To do that, you must go to the users page.</DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2 font-bold border-t border-inactive/25 pt-4'>
        {isLoading ? (
          <div className='grid place-content-center grow'>
            <SpinnerLoader size='xxl' intent='gray' />
          </div>
        ) : (
          <>
          {user ? (
            <>
              <div>
                <h3 className='uppercase text-xs text-gray tracking-wider'>User name</h3>
                <p>{user.name}</p>
              </div>
              <div>
                <h3 className='uppercase text-xs text-gray tracking-wider mb-1'>Status</h3>
                <Badge
                  label={user.is_active ? 'Active' : 'Inactive'}
                  ariaLabel={user.is_active ? 'Active' : 'Inactive'}
                  intent={user.is_active ? 'success' : 'danger'}
                  iconName={user.is_active ? 'circle-check' : 'circle-x'}
                />
                <Badge
                  label={user.is_deleted ? 'Deleted' : 'Not deleted'}
                  ariaLabel={user.is_deleted ? 'Deleted' : 'Not deleted'}
                  intent={user.is_deleted ? 'danger' : 'success'}
                  iconName={user.is_deleted ? 'user-round-minus' : 'circle-check'}
                />
              </div>
              <div>
                <h3 className='uppercase text-xs text-gray tracking-wider mb-1'>Role</h3>
                <Badge
                  label={user.role}
                  iconName='shield'
                  intent='info'
                  ariaLabel={`The user role is ${user.role}`}
                />
              </div>
            </>
          ) : null}
          </>
        )}
        </div>
      </DialogContent>
    </Dialog>
  );
};