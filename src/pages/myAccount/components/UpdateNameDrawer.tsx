import { userUpdateSchema, type User, type UserUpdate } from '@/api/schemas/user.schemas';
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
import { zodResolver } from '@hookform/resolvers/zod';
import type { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';

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

  return (
    <Drawer onClose={() => {form.reset()}}>
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
            onSubmit={form.handleSubmit(() => {})}
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
            >
              Update name
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