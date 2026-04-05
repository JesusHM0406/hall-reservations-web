import { getErrorMessage } from '@/api/api.utils';
import type { User } from '@/api/schemas/user.schemas';
import { userService } from '@/api/services/user.service';
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
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  returnFocusTargetId?: string;
  onSuccess: () => void;
}

export const DeleteUserDialog = ({ isOpen, onClose, user, returnFocusTargetId, onSuccess }: DeleteUserDialogProps) => {
  const cancelDeleteBtnID = 'cancel-user-delete-button';

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteUser = async () => {
    if (!user) return;

    setIsDeleting(true);
    try {
      await userService.delete(user.id);

      toast.success('The user has been deleted successfully.');
      onSuccess();
      onClose();
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

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
            You are about to delete {user ? `the user ${user.name}` : 'a user'}. Are you sure you want to perform this action?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end items-center'>
          <CustomButton
            intent='danger'
            onClick={deleteUser}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <SpinnerLoader size='xs' />
                <span>Deleting user...</span>
              </>
            ) : (
              <span>I'm sure I want to delete this user</span>
            )}
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