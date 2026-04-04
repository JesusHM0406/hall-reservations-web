import type { User } from "@/api/schemas/user.schemas";
import { Badge } from "@/components/ui/Badge";
import { ICON_SIZE } from "@/constants/ui.constants";
import { MoreVertical } from "lucide-react";

export const UserCard = ({user}: {user: User}) => {
  return (
    <article className='border border-inactive/25 p-3 gap-2 bg-subtle-white/30 dark:bg-dark-gray rounded-lg hover:bg-inactive/10 dark:hover:bg-inactive/15 transition-[background-color_scale] duration-150 flex flex-col'>
      <div className='flex items-center gap-2'>
        <header className='flex flex-col gap-1 grow'>
          <div className='flex gap-2 flex-wrap'>
            <Badge
              label={user.role}
              iconName='shield'
              intent='info'
              ariaLabel={`The user role is ${user.role}`}
            />
            <Badge
              label={user.is_active ? 'Active' : 'Inactive'}
              iconName={user.is_active ? 'user-round-check' : 'user-round-x'}
              intent={user.is_active ? 'success' : 'danger'}
              ariaLabel={`The user is ${user.is_active ? 'active' : 'inactive'}`}
            />
            <Badge
              label={user.is_deleted ? 'Deleted' : 'Not deleted'}
              iconName={user.is_deleted ? 'user-round-minus' : 'circle-check'}
              intent={user.is_deleted ? 'danger' : 'success'}
              ariaLabel={`The user ${user.is_deleted ? 'was deleted' : 'is not deleted'}`}
            />
          </div>
          <h3 className='font-bold text-sm mt-2'>{user.name}</h3>
        </header>
        <button
          type='button'
          className='p-1.5 border border-inactive/25 rounded-md transition-colors hover:border-brand hover:text-brand'
          aria-label='Show actions for this user'
        >
          <MoreVertical size={ICON_SIZE.SM} aria-hidden />
        </button>
      </div>
    </article>
  );
};