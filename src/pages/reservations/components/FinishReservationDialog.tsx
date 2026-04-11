import type { Reservation } from '@/api/schemas/reservation.schemas';
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
  res: Reservation;
  isOpen: boolean;
  onClose: () => void;
  returnFocusTargetId?: string;
}

export const FinishReservationDialog = ({
  isOpen,
  onClose,
  returnFocusTargetId,
  res
}: FinishReservationDialogProps) => {
  const cancelBtnId = 'cancel-finish-res-btn';

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const cancelBtn = document.getElementById(cancelBtnId);
          cancelBtn?.focus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          const triggerId = returnFocusTargetId ?? `res-dropdown-trigger-${res.id}`;
          const trigger = document.getElementById(triggerId);
          trigger?.focus();
        }}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Finish reservation</DialogTitle>
          <DialogDescription>You can only finish the reservation if today is the day of the reservation.</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end'>
          <CustomButton intent='res'>
            <span>Finish reservation</span>
          </CustomButton>
          <DialogClose asChild>
            <CustomButton id={cancelBtnId} intent='gray'>
              <span>Cancel</span>
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};