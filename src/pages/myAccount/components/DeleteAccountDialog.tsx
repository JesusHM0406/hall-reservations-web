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

export const DeleteAccountDialog = () => {
  const cancelBtnId = 'cancel-delete-self-account-button';

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
          >
            Delete account
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