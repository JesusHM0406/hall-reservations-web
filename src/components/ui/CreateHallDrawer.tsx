import type { ReactNode } from 'react';
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
import { useForm } from 'react-hook-form';
import { hallCreateSchema, type HallCreate } from '@/api/schemas/hall.schemas';
import { zodResolver } from '@hookform/resolvers/zod';

interface CreateHallDrawerProps {
  children: ReactNode;
}

export const CreateHallDrawer = ({ children }: CreateHallDrawerProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<HallCreate>({ resolver: zodResolver(hallCreateSchema) })

  return (
    <Drawer direction='right'>
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
          onSubmit={() => {}}
          className='flex flex-col gap-5 grow'
          aria-label='Login form'
          noValidate
        >
          <FormField label='name' required>
            {(id) => (
              <Input
                id={id}
                required
                iconName='house'
                placeholder='The outdoor hall'
                intention={errors.name ? 'danger' : 'brand'}
                {...register('name')}
                {...(errors.name ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
              />)
            }
          </FormField>

          <FormField label='Description' required>
            {(id) => (
              <Textarea
                id={id}
                placeholder='Type the hall description here.'
                className='text-sm leading-4.5 h-50 resize-none focus-within:ring-2'
                {...(errors.description ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
              />
            )}
          </FormField>

          <FormField label='Available'>
            {(id) => (
              <Switch
                id={id}
                {...(errors.is_available ? { 'aria-invalid': true, 'aria-errormessage': `${id}-error` } : {})}
              />
            )}
          </FormField>
        </form>
        </div>
        <DrawerFooter className='flex flex-row'>
          <Button className='grow' type='submit' disabled={isSubmitting}>Update</Button>
          <DrawerClose asChild>
            <Button intent='gray'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};