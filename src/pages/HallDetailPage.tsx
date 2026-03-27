import { getErrorMessage } from '@/api/axios';
import type { Hall } from '@/api/schemas/hall.schemas';
import { hallService } from '@/api/services/hall.service';
import { Badge } from '@/components/common/Badge';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import SpinnerLoader from '@/components/common/SpinnerLoader';
import { ICON_SIZE } from '@/constants/ui.constants';
import { Calendar, Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

export const HallDetailPage = () => {
  const hallId = useParams().hallId;
  const numericId = parseInt(hallId || '', 10);

  if (isNaN(numericId)) {
    return <h1>Invalid hall id provided</h1>;
  }

  const [hallDetail, setHallDetail] = useState<Hall | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchHallDetail = async (id: number) => {
      try {
        const hall = await hallService.byId(id, controller);

        setHallDetail(hall);
      } catch (e) {
        const msg = getErrorMessage(e);
        if (!msg) return;
        toast.error(msg);
      }
    };

    fetchHallDetail(numericId);

    return () => { controller.abort() }
  }, [numericId]);

  const isAva = hallDetail?.is_available;

  return (
    <div className='grid place-content-center grow'>
      <Container>
        <article className='flex flex-col gap-5 max-w-md min-w-3xs min-h-72'>
          {hallDetail === null ?
            <div className='grid place-content-center grow'>
              <SpinnerLoader size='xxl' intent='gray' />
            </div>
           :
            <>
              <header>
                <h1 className='font-bold uppercase text-center text-balance mb-5'>{hallDetail?.name}</h1>
                <Badge
                  label={isAva ? 'Available' : 'Unavailable'}
                  ariaLabel={isAva ? 'Available' : 'Unavailable'}
                  iconName={isAva ? 'circle-check' : 'circle-x'}
                  intent={isAva ? 'success' : 'danger'}
                />
              </header>

              <section>
                <h2 className='font-bold uppercase text-xs text-gray'>Description</h2>
                <p className='text-sm'>{hallDetail?.description}</p>
              </section>

              <footer className='flex gap-2 mt-3'>
                <Button className='grow' disabled={!isAva}>
                  <span>
                    <Calendar size={ICON_SIZE.SM} aria-hidden />
                  </span>
                  <span className='uppercase text-xs'>Reserve hall</span>
                </Button>
                <Button
                  filled={false}
                  intent='hall'
                  className='text-hall hover:bg-hall hover:text-white'
                  aria-label='Edit this hall'
                >
                  <Edit2 size={ICON_SIZE.SM} aria-hidden />
                </Button>
              </footer>
            </>
          }
        </article>
      </Container>
    </div>
  );
};
