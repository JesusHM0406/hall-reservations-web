import { useState, type ReactNode } from 'react';
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
import Button from '@/components/ui/Button';
import FormField from '@/components/common/FormField';
import Input from '@/components/ui/Input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Controller, useForm } from 'react-hook-form';
import { hallUpdateSchema, type HallUpdate } from '@/api/schemas/hall.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { hallService } from '@/api/services/hall.service';
import { getErrorMessage } from '@/api/api.utils';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import SpinnerLoader from '@/components/ui/SpinnerLoader';

interface UpdateHallDrawerProps {
  children: ReactNode;
  onSuccess: () => void;
  hallId: number | string;
}

export const UpdateHallDrawer = ({ children, onSuccess, hallId }: UpdateHallDrawerProps) => {
  const form = useForm<HallUpdate>({
    resolver: zodResolver(hallUpdateSchema),
    defaultValues: {
      name: '',
      description: '',
      is_available: true
    }
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [isLoadingCurrData, setIsLoadingCurrData] = useState<boolean>(false);

  const onValidSubmit = async (updateData: HallUpdate) => {
    try {
      await hallService.update(hallId, {
        ...(updateData.name && updateData.name !== '' ? { name: updateData.name } : {}),
        ...(updateData.description && updateData.description !== '' ? { description: updateData.description } : {}),
        ...(typeof updateData.is_available === 'boolean' ? { is_available: updateData.is_available } : {})
      });

      toast.success('The hall has been updated successfully.');

      onSuccess();
      setIsOpen(false);
      form.reset();
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    }
  };

  const loadCurrentData = async () => {
    setIsLoadingCurrData(true);
    try {
      const currData = await hallService.byId(hallId);

      form.reset(currData);
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    } finally {
      setIsLoadingCurrData(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction='right'>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className='max-h-dvh'>
        <DrawerHeader>
          <DrawerTitle>Update a hall</DrawerTitle>
          <DrawerDescription>The fields below are optional.</DrawerDescription>
        </DrawerHeader>
        <div className='p-4 h-full flex flex-col overflow-y-auto'>
          <Button
            className='mb-5 text-xs text-brand hover:text-brand-light dark:text-brand-light'
            filled={false}
            onClick={loadCurrentData}
            disabled={isLoadingCurrData}
          >
            {isLoadingCurrData ? (
              <>
                <span><SpinnerLoader size='xs' /></span>
                <span>Loading current data...</span>
              </>
            ) : (
              <>
                <span><CircleArrowDown size={ICON_SIZE.MD} /></span>
                <span>Load Current Data</span>
              </>
            )}
          </Button>
          <form
            onSubmit={form.handleSubmit(onValidSubmit)}
            id='update-hall-form'
            className='flex flex-col gap-5 grow'
            aria-label='Form to update a new hall'
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
                      iconName='house'
                      placeholder='The outdoor hall'
                      intention={fieldState.invalid ? 'danger' : 'brand'}
                      {...(fieldState.invalid ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
                    />)
                  }
                </FormField>
              )}
            />

            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='description' error={fieldState.error}>
                  {(id) => (
                    <Textarea
                      {...field}
                      id={id}
                      placeholder='Type the hall description here.'
                      className='leading-4.5 h-50 resize-none focus-within:ring-2'
                      {...(fieldState.invalid ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
                    />)
                  }
                </FormField>
              )}
            />

            <Controller
              name='is_available'
              control={form.control}
              render={({ field }) => (
                <FormField label='available'>
                  {(id) => (
                    <Switch
                      id={id}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />)
                  }
                </FormField>
              )}
            />
          </form>
        </div>
        <DrawerFooter className='flex flex-row'>
          <Button
            className='grow px-2 transition w-0! overflow-hidden text-xs'
            type='submit'
            form='update-hall-form'
            intent='hall'
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
          </Button>
          <DrawerClose asChild>
            <Button intent='danger' filled={false} className='text-danger text-xs hover:text-danger-light'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};