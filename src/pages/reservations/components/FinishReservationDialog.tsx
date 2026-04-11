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

interface FinishReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FinishReservationDialog = ({ isOpen, onClose }: FinishReservationDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Finish reservation</DialogTitle>
          <DialogDescription>You can only finish the reservation if today is the day of the reservation.</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end'>
          <CustomButton intent='res'>
            <span>Finish reservation</span>
          </CustomButton>
          <DialogClose asChild>
            <CustomButton intent='gray'>
              <span>Cancel</span>
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};