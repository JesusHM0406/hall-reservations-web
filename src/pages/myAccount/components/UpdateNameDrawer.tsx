import type { User } from '@/api/schemas/user.schemas';
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
import type { ReactNode } from 'react';

interface UpdateNameDrawerProps {
  children: ReactNode;
  user: User;
}

export const UpdateNameDrawer = ({ children, user }: UpdateNameDrawerProps) => {
  return (
    <Drawer>
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
            id='update-name-form'
          >
            <Input id='input' value={user.name} />
          </form>
          <DrawerFooter className='flex-row w-full p-0 justify-center gap-5'>
            <CustomButton className='grow'>
              Update name
            </CustomButton>
            <DrawerClose asChild>
              <CustomButton intent='danger' className='grow'>
                Cancel
              </CustomButton>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};