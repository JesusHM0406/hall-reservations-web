import { getErrorMessage } from '@/api/api.utils';
import type { Reservation } from '@/api/schemas/reservation.schemas';
import { reservationService } from '@/api/services/reservation.service';
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
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { useState } from 'react';
import { toast } from 'sonner';

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

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const finishRes = async () => {
    setIsLoading(true);
    try {
      await reservationService.finish(res.id);
      toast.success('The reservation has been finished successfully.');
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

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
          <CustomButton
            intent='res'
            onClick={finishRes}
            disabled={isLoading}
            className='w-36'
          >
            {isLoading ? (
              <SpinnerLoader size='xs' />
            ) : (
              <span>Finish reservation</span>
            )}
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