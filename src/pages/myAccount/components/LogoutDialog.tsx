import CustomButton from '@/components/ui/Button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { ReactNode } from 'react';

interface LogoutDialogProps {
  children: ReactNode;
}

export const LogoutDialog = ({ children }: LogoutDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Log out</DialogTitle>
          <DialogDescription>Are you sure you want to log out?</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end'>
          <CustomButton intent='danger' >
            Log Out
          </CustomButton>
          <DialogClose asChild>
            <CustomButton intent='gray'>
              Cancel
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};