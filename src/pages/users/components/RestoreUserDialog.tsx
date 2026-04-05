import { getErrorMessage } from '@/api/api.utils';
import { userUpdateSchema, type User, type UserUpdate } from '@/api/schemas/user.schemas';
import { userService } from '@/api/services/user.service';
import FormField from '@/components/common/FormField';
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
import Input from '@/components/ui/Input';
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { ICON_SIZE } from '@/constants/ui.constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Undo2 } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface RestoreUserDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  returnFocusTargetId?: string;
  onSuccess: () => void;
}

const getFormValues = (selectedUser: User | null): UserUpdate => ({
  name: selectedUser?.name ?? ''
});

export const RestoreUserDialog = ({
  isOpen,
  onClose,
  user,
  returnFocusTargetId,
  onSuccess
}: RestoreUserDialogProps) => {
  const form = useForm<UserUpdate>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: getFormValues(user)
  });

  useEffect(() => {
    form.reset(getFormValues(user));
  }, [form, user]);

  const onValid = async (payload: UserUpdate) => {
    if (!user) return;

    try {
      await userService.restore(user.id, payload);

      toast.success('The user account has been restored successfully.');
      onSuccess();
      onClose();
      form.reset();
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
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
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          const triggerId = returnFocusTargetId ?? (user ? `dropdown-trigger-${user.id}` : null);
          const trigger = triggerId ? document.getElementById(triggerId) : null;
          if (trigger) trigger.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>Restore user account</DialogTitle>
          <DialogDescription>To restore a user account you need to provide a new name in case the name has already been taken.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(onValid)}
          id='restore-user-form'
          aria-label='Form to restore a user account'
          noValidate
        >
          <Controller
            control={form.control}
            name='name'
            render={({ field, fieldState }) => (
              <FormField label='New name' required error={fieldState.error}>
                {(id) => (
                  <Input
                    {...field}
                    id={id}
                    iconName='user-round'
                    placeholder='John Doe'
                    intention={fieldState.invalid ? 'danger' : 'brand'}
                    {...(fieldState.invalid ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
                  />
                )}
              </FormField>
            )}
          />
        </form>
        <DialogFooter className='justify-end flex-row'>
          <CustomButton
            type='submit'
            form='restore-user-form'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <SpinnerLoader size='xs' />
                <span>Restoring...</span>
              </>
            ) : (
              <>
                <Undo2 size={ICON_SIZE.SM} aria-hidden />
                <span>Restore user</span>
              </>
            )}
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