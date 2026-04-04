import type { User } from '@/api/schemas/user.schemas';
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
import { ICON_SIZE } from '@/constants/ui.constants';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';

interface UpdateUserDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  returnFocusTargetId?: string;
}

export const UpdateUserDrawer = ({ isOpen, onClose, user, returnFocusTargetId }: UpdateUserDrawerProps) =>{
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
            onClick={() => {}}
          >
            <span><CircleArrowDown size={ICON_SIZE.MD} aria-hidden /></span>
            <span>Refresh User Data</span>
          </CustomButton >
          <form
            onSubmit={(e) => {e.preventDefault()}}
            id='update-user-form'
            className='flex flex-col gap-5 grow'
            aria-label='Form to update a user'
            noValidate
          >

          </form>
        </div>
        <DrawerFooter className='flex flex-row'>
          <CustomButton
            className='grow px-2 text-xs'
            type='submit'
            form='update-user-form'
            intent='brand'
          >
            <span><CircleArrowUp size={ICON_SIZE.MD} aria-hidden /></span>
            <span>Update</span>
          </CustomButton>
          <DrawerClose asChild>
            <CustomButton intent='danger' filled={false} className='text-danger text-xs hover:text-danger-light'>Cancel</CustomButton>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};