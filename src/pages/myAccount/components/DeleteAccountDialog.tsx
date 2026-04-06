import { getErrorMessage } from '@/api/api.utils';
import { userService } from '@/api/services/user.service';
import CustomButton from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { toast } from 'sonner';

export const DeleteAccountDialog = () => {
  const cancelBtnId = 'cancel-delete-self-account-button';

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { logOut } = useAuth();

  const deleteAccount = async () => {
    setIsLoading(true);
    try {
      await userService.deleteCurrent();

      logOut();
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton
          intent='danger'
          className='uppercase text-2xs font-bold tracking-wide'
        >
          Delete account
        </CustomButton>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const cancelBtn = document.getElementById(cancelBtnId);
          if (cancelBtn) cancelBtn.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>Are you sure you want to delete you account?</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end'>
          <CustomButton
            intent='danger'
            disabled={isLoading}
            onClick={deleteAccount}
          >
            {isLoading ? (
              <>
                <SpinnerLoader size='xs' />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete account</span>
            )}
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