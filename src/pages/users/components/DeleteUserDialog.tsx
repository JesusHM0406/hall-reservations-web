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

export const DeleteUserDialog = () => {
  return (
    <Dialog open>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete a user</DialogTitle>
          <DialogDescription>
            You are about to delete a user. Are you sure you want to perform this action?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end items-center'>
          <CustomButton
            intent='danger'
          >
            <span>I'm sure I want to delete this user</span>
          </CustomButton>
          <DialogClose asChild>
            <CustomButton
              intent='gray'
              filled={false}
              className='text-gray hover:text-light-gray dark:text-light-gray'
            >
              Close
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};