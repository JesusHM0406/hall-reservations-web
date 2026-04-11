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

interface CancelResDialogProps {
  isOpen: boolean;
  onClose: () => void;
  returnFocusTargetId?: string;
  res: Reservation;
  onSuccess?: () => void;
}

export const CancelResDialog = ({
  isOpen,
  onClose,
  returnFocusTargetId,
  res,
  onSuccess
}: CancelResDialogProps) => {
  const closeBtnId = 'cancel-res-close-btn';

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cancelRes = async () => {
    setIsLoading(true);
    let isSuccess = false;
    try {
      await reservationService.cancel(res.id);
      toast.success('The reservation has been cancelled successfully.');
      isSuccess = true;
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    } finally {
      setIsLoading(false);
      if (isSuccess) {
        onClose();
        if (onSuccess) onSuccess();
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isLoading) onClose();
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
          <CustomButton
            intent='danger'
            onClick={cancelRes}
            disabled={isLoading}
            className='w-40'
          >
            {isLoading ? (
              <SpinnerLoader size='xs' />
            ) : (
              <span>Cancel reservation</span>
            )}
          </CustomButton>
          <DialogClose disabled={isLoading} asChild>
            <CustomButton id={closeBtnId} intent='gray'>
              <span>Close</span>
            </CustomButton>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};