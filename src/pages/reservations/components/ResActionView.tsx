import type { ResAction } from "../res.types";
import { CancelResDialog } from "./CancelResDialog";
import { FinishReservationDialog } from "./FinishReservationDialog";
import { UserInfoDialog } from "./UserInfoDialog";

interface ResActionViewProps {
  action: ResAction;
  lastTriggerId?: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export const ResActionView = ({ action, lastTriggerId, onClose, onSuccess }: ResActionViewProps) => {
  if (action === null) return null;

  if (action.type === 'userInfo') return (
    <UserInfoDialog
      res={action.res}
      returnFocusTargetId={lastTriggerId}
      isOpen={true}
      onClose={onClose}
    />
  );

  if (action.type === 'finish') return (
    <FinishReservationDialog
      res={action.res}
      returnFocusTargetId={lastTriggerId}
      isOpen={true}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );

  if (action.type === 'cancel') return (
    <CancelResDialog
      res={action.res}
      returnFocusTargetId={lastTriggerId}
      isOpen={true}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  )
};