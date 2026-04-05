import { userUpdateSchema, type User, type UserUpdate } from '@/api/schemas/user.schemas';
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
import { ICON_SIZE } from '@/constants/ui.constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Undo2 } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

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
  returnFocusTargetId
}: RestoreUserDialogProps) => {
  const form = useForm<UserUpdate>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: getFormValues(user)
  });

  useEffect(() => {
    form.reset(getFormValues(user));
  }, [form, user]);

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
          <DialogDescription>To restore a user account you need to provide a new name.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(() => {})}
          id='restore-user-form'
          className='flex flex-col gap-5 grow'
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