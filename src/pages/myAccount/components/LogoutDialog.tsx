import CustomButton from '@/components/ui/Button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import type { ReactNode } from 'react';

interface LogoutDialogProps {
  children: ReactNode;
}

export const LogoutDialog = ({ children }: LogoutDialogProps) => {
  const cancelBtnId = 'cancel-logout-button';

  const { logOut } = useAuth();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const cancelButton = document.getElementById(cancelBtnId);
          if (cancelButton) cancelButton.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>Log out</DialogTitle>
          <DialogDescription>Are you sure you want to log out?</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end'>
          <CustomButton
            intent='danger'
            onClick={logOut}
          >
            Log Out
          </CustomButton>
          <DialogClose asChild>
            <CustomButton id={cancelBtnId} intent='gray'>
              Cancel
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};