import type { User } from '@/api/schemas/user.schemas';
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

interface DeleteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  returnFocusTargetId?: string;
  onSuccess: () => void;
}

export const DeleteUserDialog = ({ isOpen, onClose, user, returnFocusTargetId }: DeleteUserDialogProps) => {
  const cancelDeleteBtnID = 'cancel-user-delete-button';

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const button = document.getElementById(cancelDeleteBtnID);
          if (button) button.focus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          const triggerId = returnFocusTargetId ?? (user ? `dropdown-trigger-${user.id}` : null);
          const trigger = triggerId ? document.getElementById(triggerId) : null;
          if (trigger) trigger.focus();
        }}
      >
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
              id={cancelDeleteBtnID}
              intent='gray'
              filled={false}
              className='text-gray hover:text-light-gray dark:text-light-gray'
            >
              Cancel
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};