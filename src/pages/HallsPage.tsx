import Button from '@/components/common/Button';
import { PlusCircle } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import { useEffect, useState } from 'react';
import type { HallSearchResponse } from '@/api/schemas/hall.schemas';
import { SearchInput } from '@/components/ui/SearchInput';
import { useDebounce } from '@/hooks/useDebounce';
import { HallSearchCard } from '@/components/ui/HallSearchCard';
import { hallService } from '@/api/services/hall.service';
import { getErrorMessage } from '@/api/axios';
import { toast } from 'sonner';

export const HallsPage = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 400);

  const [data, setData] = useState<HallSearchResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      if (!debouncedSearch || debouncedSearch.length < 2) return;

      try {
        const response = await hallService.search({ q: debouncedSearch }, controller);

        setData(response);
      } catch (e) {
        const msg = getErrorMessage(e);
        if (!msg) return;
        toast.error(msg);
      }
    };

    fetchData();

    return () => { controller.abort() };
  }, [debouncedSearch]);

  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7'>
      <header className='flex justify-between gap-3 items-center'>
        <h1 className='font-bold text-lg xs:text-2xl uppercase'>Explore Halls</h1>
        <Button className='text-2xs uppercase' intent='hall' filled shadow darkFocus >
          <span><PlusCircle size={ICON_SIZE.MD} aria-hidden /></span>
          <span className='w-min 2xs:w-auto'>New Hall</span>
        </Button>
      </header>

      <SearchInput
        value={search}
        setSearch={setSearch}
        placeholder='Outdoor, garden and more'
        ariaLabel='Search rooms by name or description'
        clearLabel='Clear search'
      />

      <section>
        <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>Results for: {debouncedSearch}</h2>
        <ul className='flex flex-col gap-3'>

          {data ? data.map((item) => {
            return (
              <li key={item.id}>
                <HallSearchCard hall={item} />
              </li>
            );
          }) : null}

        </ul>
      </section>
    </div>
  );
};
