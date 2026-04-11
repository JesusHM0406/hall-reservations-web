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

interface CancelResDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CancelResDialog = ({ isOpen, onClose }: CancelResDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Cancel reservation</DialogTitle>
          <DialogDescription>Reservations cannot be cancelled if today is the reservation date. Are you sure you want to do this?</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end'>
          <CustomButton intent='danger'>
            <span>Cancel reservation</span>
          </CustomButton>
          <DialogClose asChild>
            <CustomButton intent='gray'>
              <span>Close</span>
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};