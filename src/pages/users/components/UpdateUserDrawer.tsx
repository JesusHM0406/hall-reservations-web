import { getErrorMessage } from '@/api/api.utils';
import { userAdminUpdateSchema, type User, type UserAdminUpdate } from '@/api/schemas/user.schemas';
import { userService } from '@/api/services/user.service';
import { AllowTo } from '@/components/common/AllowTo';
import { CustomSelect } from '@/components/common/CustomSelect';
import FormField from '@/components/common/FormField';
import CustomButton from '@/components/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import Input from '@/components/ui/Input';
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { Switch } from '@/components/ui/switch';
import { ICON_SIZE } from '@/constants/ui.constants';
import { USER_ROLE_OPTIONS_ITEMS } from '@/constants/user.constants';
import { useAuth } from '@/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

interface UpdateUserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  returnFocusTargetId?: string;
  onSuccess: () => void;
}

const getFormValues = (selectedUser: User | null): UserAdminUpdate => ({
  name: selectedUser?.name ?? '',
  role: selectedUser?.role ?? 'user',
  is_active: selectedUser?.is_active ?? true
});

export const UpdateUserDrawer = ({ isOpen, onClose, user, returnFocusTargetId, onSuccess }: UpdateUserDrawerProps) =>{
  const form = useForm<UserAdminUpdate>({
    resolver: zodResolver(userAdminUpdateSchema),
    defaultValues: getFormValues(user),
  });

  useEffect(() => {
    form.reset(getFormValues(user));
  }, [user, form]);

  const auth = useAuth();

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const onValid = async (data: UserAdminUpdate) => {
    if (!user) return;

    const payload: UserAdminUpdate = {
      ...(form.formState.dirtyFields.name && data.name?.trim() ? { name: data.name } : {}),
      ...(auth.user?.role === 'superadmin' && form.formState.dirtyFields.role && data.role ? { role: data.role } : {}),
      ...(form.formState.dirtyFields.is_active ? { is_active: data.is_active } : {})
    };

    if (Object.keys(payload).length === 0) {
      toast.info("The data hasn't changed.");
      return;
    }

    try {
      await userService.update(user.id, payload);

      toast.success('The user has been updated successfully');
      onSuccess();
      onClose();
      form.reset();
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    }
  };

  const refreshUserData = async () => {
    if (!user) return;

    setIsRefreshing(true);
    try {
      const data = await userService.byId(user.id);

      form.reset(data);
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <Drawer open={isOpen} onClose={onClose} direction='right'>
      <DrawerContent
        id='update-user-drawer'
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const firstActionButton = document.getElementById('update-user-load-data-button');
          if (firstActionButton) firstActionButton.focus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          const triggerId = returnFocusTargetId ?? (user ? `dropdown-trigger-${user.id}` : null);
          const trigger = triggerId ? document.getElementById(triggerId) : null;
          if (trigger) trigger.focus();
        }}
      >
        <DrawerHeader>
          <DrawerTitle>Update a user</DrawerTitle>
          <DrawerDescription>The fields below are optional.</DrawerDescription>
        </DrawerHeader>
        <div className='p-4 h-full flex flex-col overflow-y-auto'>
          <CustomButton
            id='update-user-load-data-button'
            className='mb-5 text-xs text-brand dark:text-brand-light hover:bg-transparent'
            filled={false}
            onClick={refreshUserData}
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <>
                <SpinnerLoader size='xs' />
                <span>Loading</span>
              </>
            ) : (
              <>
                <span><CircleArrowDown size={ICON_SIZE.MD} aria-hidden /></span>
                <span>Refresh User Data</span>
              </>
            )}
          </CustomButton >
          <form
            onSubmit={form.handleSubmit(onValid)}
            id='update-user-form'
            className='flex flex-col gap-5 grow'
            aria-label='Form to update a user'
            noValidate
          >
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='name' error={fieldState.error}>
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

            <AllowTo requires={['superadmin']}>
              <Controller
                name='role'
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormField label='role' error={fieldState.error}>
                    {(id) => (
                      <CustomSelect
                        id={id}
                        items={USER_ROLE_OPTIONS_ITEMS}
                        onValueChange={field.onChange}
                        placeholder='Select role'
                        value={field.value}
                        {...(fieldState.invalid ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
                      />
                    )}
                  </FormField>
                )}
              />
            </AllowTo>


            <Controller
              name='is_active'
              control={form.control}
              render={({ field }) => (
                <FormField label='Active'>
                  {(id) => (
                    <Switch
                      id={id}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                </FormField>
              )}
            />
          </form>
        </div>
        <DrawerFooter className='flex flex-row'>
          <CustomButton
            className='grow px-2 text-xs'
            type='submit'
            form='update-user-form'
            intent='brand'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <SpinnerLoader size='xs' />
                <span>Updating</span>
              </>
            ) : (
              <>
                <span><CircleArrowUp size={ICON_SIZE.MD} aria-hidden /></span>
                <span>Update</span>
              </>
            )}
          </CustomButton>
          <DrawerClose asChild>
            <CustomButton intent='danger' filled={false} className='text-danger text-xs hover:text-danger-light'>Cancel</CustomButton>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};