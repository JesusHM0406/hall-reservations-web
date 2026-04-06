import { getErrorMessage } from '@/api/api.utils';
import { userUpdateSchema, type User, type UserUpdate } from '@/api/schemas/user.schemas';
import { userService } from '@/api/services/user.service';
import FormField from '@/components/common/FormField';
import CustomButton from '@/components/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import Input from '@/components/ui/Input';
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface UpdateNameDrawerProps {
  children: ReactNode;
  user: User;
}

export const UpdateNameDrawer = ({ children, user }: UpdateNameDrawerProps) => {
  const form = useForm<UserUpdate>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      name: user.name
    }
  });

  const { updateCurrUser } = useAuth();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onValid = async (payload: UserUpdate) => {
    if (!form.formState.isDirty) {
      toast.info("Your name hasn't changed");
      return;
    }

    try {
      const data = await userService.updateCurrent(payload);

      toast.success('Your name has been updated successfully.');
      setIsOpen(false);
      updateCurrUser(data);
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} onClose={() => {form.reset()}}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <div className='max-w-md w-full mx-auto pb-4 px-4 flex flex-col gap-5'>
          <DrawerHeader className='pb-0'>
            <DrawerTitle>Update name</DrawerTitle>
            <DrawerDescription>Please enter your new name below.</DrawerDescription>
          </DrawerHeader>
          <form
            onSubmit={form.handleSubmit(onValid)}
            id='update-name-form'
            className='flex flex-col gap-5 grow'
            aria-label='Form to update your name'
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
                      value={field.value}
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
          <DrawerFooter className='flex-row w-full p-0 justify-center gap-5'>
            <CustomButton
              type='submit'
              form='update-name-form'
              className='grow'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <>
                  <SpinnerLoader size='xs' />
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update name</span>
              )}
            </CustomButton>
            <DrawerClose asChild>
              <CustomButton
                intent='danger'
                className='grow'
              >
                Cancel
              </CustomButton>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};