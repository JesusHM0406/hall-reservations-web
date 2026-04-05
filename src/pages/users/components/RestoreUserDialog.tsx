import CustomButton from '@/components/ui/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { ICON_SIZE } from '@/constants/ui.constants';
import { Undo2 } from 'lucide-react';

export const RestoreUserDialog = () => {
  return (
    <Dialog open={true}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Restore user account</DialogTitle>
          <DialogDescription>To restore a user account you need to provide a new name.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {e.preventDefault()}}
          id='restore-user-form'
          className='flex flex-col gap-5 grow'
          aria-label='Form to restore a user account'
          noValidate
        >

        </form>
        <DialogFooter className='justify-end flex-row'>
          <CustomButton
            type='submit'
            form='restore-user-form'
          >
            <Undo2 size={ICON_SIZE.SM} aria-hidden />
            Restore user
          </CustomButton>
          <DialogClose asChild>
            <CustomButton
              intent='gray'
              filled={false}
              className='w-fit text-gray hover:text-light-gray dark:text-light-gray'
            >
              Close
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};