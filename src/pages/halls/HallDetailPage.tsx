import { getErrorMessage } from '@/api/api.utils';
import type { Hall } from '@/api/schemas/hall.schemas';
import { hallService } from '@/api/services/hall.service';
import { Badge } from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Container from '@/components/layout/Container';
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { ICON_SIZE } from '@/constants/ui.constants';
import { ArrowLeft, Calendar, Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { UpdateHallDrawer } from './components/UpdateHallDrawer';

export const HallDetailPage = () => {
  const hallId = useParams().hallId;
  const numericId = parseInt(hallId || '', 10);

  const [hallDetail, setHallDetail] = useState<Hall | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [refreshCount, setRefreshCount] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(numericId) || numericId < 1) return;

    let isCurrent = true;
    const controller = new AbortController();

    const fetchHallDetail = async (id: number) => {
      setIsLoading(true);
      try {
        const hall = await hallService.byId(id, controller);

        if (isCurrent) setHallDetail(hall);
      } catch (e) {
        const msg = getErrorMessage(e);
        if (isCurrent && msg) toast.error(msg);
      }
      if (isCurrent) setIsLoading(false);
    };

    fetchHallDetail(numericId);

    return () => {
      isCurrent = false;
      controller.abort();
    }
  }, [numericId, refreshCount]);

  const isAva = hallDetail?.is_available;

  if (isNaN(numericId) || numericId < 1) {
    return <h1>Invalid hall id provided</h1>;
  }

  return (
    <div className='grid place-content-center h-full gap-5'>
      <Container>
        <article className='flex flex-col gap-5 max-w-md min-w-3xs min-h-72 justify-center'>
          {isLoading && (
            <div className='grid place-content-center grow'>
              <SpinnerLoader size='xxl' intent='gray' />
            </div>
          )}

          {!isLoading && hallDetail && (
            <>
              <header>
                <h1 className='font-bold uppercase text-center text-balance mb-5'>{hallDetail.name}</h1>
                <Badge
                  label={isAva ? 'Available' : 'Unavailable'}
                  ariaLabel={isAva ? 'Available' : 'Unavailable'}
                  iconName={isAva ? 'circle-check' : 'circle-x'}
                  intent={isAva ? 'success' : 'danger'}
                />
              </header>

              <section>
                <h2 className='font-bold uppercase text-xs text-gray'>Description</h2>
                <p className='text-sm'>{hallDetail.description}</p>
              </section>

              <footer className='flex gap-2 mt-3'>
                <Button className='grow' disabled={!isAva}>
                  <span>
                    <Calendar size={ICON_SIZE.SM} aria-hidden />
                  </span>
                  <span className='uppercase text-xs'>Reserve hall</span>
                </Button>

                <UpdateHallDrawer onSuccess={() => setRefreshCount((prev) => prev + 1)} hallId={numericId}>
                  <Button
                    filled={false}
                    intent='hall'
                    className='text-hall hover:text-hall-light dark:text-hall-light'
                    aria-label='Edit this hall'
                  >
                    <Edit2 size={ICON_SIZE.SM} aria-hidden />
                  </Button>
                </UpdateHallDrawer>
              </footer>
            </>
          )}
        </article>
      </Container>
      <Button
        filled={false}
        intent='hall'
        className='w-fit text-2xs uppercase font-bold text-hall hover:text-hall-light dark:text-hall-light'
        onClick={() => { navigate(-1) }}
      >
        <span><ArrowLeft size={ICON_SIZE.SM} aria-hidden /></span>
        <span>Go Back</span>
      </Button>
    </div>
  );
};