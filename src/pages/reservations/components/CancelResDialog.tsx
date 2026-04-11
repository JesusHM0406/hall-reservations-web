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

interface CancelResDialogProps {
  isOpen: boolean;
  onClose: () => void;
  returnFocusTargetId?: string;
  res: Reservation;
}

export const CancelResDialog = ({
  isOpen,
  onClose,
  returnFocusTargetId,
  res
}: CancelResDialogProps) => {
  const closeBtnId = 'cancel-res-close-btn';

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          const closeBtn = document.getElementById(closeBtnId);
          closeBtn?.focus();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          const triggerId = returnFocusTargetId ?? `res-dropdown-trigger-${res.id}`;
          const trigger = document.getElementById(triggerId);
          trigger?.focus();
        }}
      >
        <DialogHeader>
          <DialogTitle>Cancel reservation</DialogTitle>
          <DialogDescription>Reservations cannot be cancelled if today is the reservation date. Are you sure you want to do this?</DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex-row justify-end'>
          <CustomButton intent='danger'>
            <span>Cancel reservation</span>
          </CustomButton>
          <DialogClose asChild>
            <CustomButton id={closeBtnId} intent='gray'>
              <span>Close</span>
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};