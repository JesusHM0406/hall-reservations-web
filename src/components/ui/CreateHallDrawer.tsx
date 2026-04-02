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
} from './drawer';
import Button from '../common/Button';
import FormField from '../common/FormField';
import Input from '../common/Input';
import { Textarea } from './textarea';
import { Switch } from './switch';
import { Controller, useForm } from 'react-hook-form';
import { hallCreateSchema, type HallCreate } from '@/api/schemas/hall.schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { hallService } from '@/api/services/hall.service';
import { getErrorMessage } from '@/api/api.utils';
import { CircleFadingArrowUp } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import SpinnerLoader from '../common/SpinnerLoader';

interface CreateHallDrawerProps {
  children: ReactNode;
  onSuccess: () => void;
}

export const CreateHallDrawer = ({ children, onSuccess }: CreateHallDrawerProps) => {
  const form = useForm<HallCreate>({
    resolver: zodResolver(hallCreateSchema),
    defaultValues: {
      name: '',
      description: '',
      is_available: true
    }
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onValidSubmit = async (createData: HallCreate) => {
    try {
      await hallService.create(createData);

      toast.success('Hall created successfully');

      onSuccess();
      setIsOpen(false);
      form.reset();
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction='right'>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className='max-h-dvh'>
        <DrawerHeader>
          <DrawerTitle>Create a new hall</DrawerTitle>
          <DrawerDescription>Complete the fields below</DrawerDescription>
        </DrawerHeader>
        <div className='p-4 h-full flex overflow-y-auto'>
          <form
            onSubmit={form.handleSubmit(onValidSubmit)}
            id='create-hall-form'
            className='flex flex-col gap-5 grow'
            aria-label='Form to create a new hall'
            noValidate
          >
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <FormField label='name' required error={fieldState.error}>
                  {(id) => (
                    <Input
                      {...field}
                      id={id}
                      required
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
                <FormField label='description' required error={fieldState.error}>
                  {(id) => (
                    <Textarea
                      {...field}
                      id={id}
                      placeholder='Type the hall description here.'
                      className='text-sm leading-4.5 h-50 resize-none focus-within:ring-2'
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
                <FormField label='available' required>
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
            className='grow px-2'
            type='submit'
            form='create-hall-form'
            intent='hall'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <SpinnerLoader size='xs' />
                <span>Creating</span>
              </>
            ) : (
              <>
                <span><CircleFadingArrowUp size={ICON_SIZE.MD} /></span>
                <span>Create</span>
              </>
            )}
          </Button>
          <DrawerClose asChild>
            <Button intent='gray'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};