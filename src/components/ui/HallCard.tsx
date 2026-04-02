import type { HallPreview} from '@/api/schemas/hall.schemas';
import { Link } from 'react-router';
import { Badge } from './Badge';
import { PATHS } from '@/paths';

interface HallCardProps {
  hall: HallPreview;
}

export const HallCard = ({ hall }: HallCardProps) => {
  const isAvailable = hall.is_available;

  return (
    <Link to={`/${PATHS.halls.root}/${PATHS.halls.detail}/${hall.id}`}>
      <article className='border border-inactive/25 p-3 gap-2 bg-subtle-white/30 dark:bg-dark-gray rounded-lg hover:scale-102 hover:bg-inactive/10 dark:hover:bg-inactive/15 transition-[background-color_scale] duration-150 flex flex-col'>
        <header>
          <Badge
            label={isAvailable ? 'Available' : 'Unavailable'}
            iconName={isAvailable ? 'circle-check' : 'circle-x'}
            intent={isAvailable ? 'success' : 'danger'}
            ariaLabel={isAvailable ? 'Available' : 'Unavailable'}
          />
          <h2 className='font-bold text-sm mt-2'>{hall.name}</h2>
        </header>
        <p className='text-xs'>{hall.preview}</p>
      </article>
    </Link>
  )
};
