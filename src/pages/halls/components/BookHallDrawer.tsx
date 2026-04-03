import Button from '@/components/ui/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { ICON_SIZE } from '@/constants/ui.constants';
import { ChevronDownIcon, CalendarIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ShadcnButton } from '@/components/ui/ShadcnButton';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { reservationService } from '@/api/services/reservation.service';
import { getErrorMessage } from '@/api/api.utils';
import SpinnerLoader from '@/components/ui/SpinnerLoader';

interface BookHallDrawerProps {
  children: ReactNode;
  hallId: number;
  hallName: string;
}

export const BookHallDrawer = ({ children, hallId, hallName }: BookHallDrawerProps) => {
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const makeReservation = async () => {
    if (!date) {
      toast.error('Please select a date to make your reservation.');
      return;
    }

    const today = new Date();

    if (date <= today) {
      toast.error('The date must be at least one day after the current day.');
      return;
    }

    const nextYearDate = new Date(today.setFullYear(today.getFullYear() + 1));

    if (date >= nextYearDate) {
      toast.error('The date cannot be 1 year in the future (or greater).');
      return;
    }

    setIsSubmitting(true);
    try {
      await reservationService.create({
        hall_id: hallId,
        reservation_date: format(date, 'yyyy-MM-dd')
      });

      toast.success('The reservation has been successfully created.');
      setIsOpen(false);
    } catch(e) {
      const msg = getErrorMessage(e);
      if (msg) toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} direction='bottom'>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a new reservation</DrawerTitle>
          <DrawerDescription>
            You are about to book the hall named {hallName}. Please select the date below.</DrawerDescription>
        </DrawerHeader>
        <div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await makeReservation();
            }}
            id='book-hall-form'
            className='flex my-5 justify-center'
            aria-label='Form to book a hall'
            noValidate
          >
            <Popover >
              <PopoverTrigger asChild>
                <ShadcnButton
                  variant="outline"
                  data-empty={!date}
                  className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                >
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                  <ChevronDownIcon />
                </ShadcnButton>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  defaultMonth={date}
                  required
                />
              </PopoverContent>
            </Popover>

          </form>
        </div>
        <DrawerFooter className='flex flex-row justify-center'>
          <Button
            type='submit'
            intent='res'
            disabled={isSubmitting}
            form='book-hall-form'
          >
            {isSubmitting ? (
              <SpinnerLoader size='xs' />
            ) : (
              <>
                <span><CalendarIcon size={ICON_SIZE.SM} aria-hidden /></span>
                <span>Book now</span>
              </>
            )}
          </Button>
          <DrawerClose asChild>
            <Button className='text-danger hover:text-danger-light' intent='danger' filled={false}>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};