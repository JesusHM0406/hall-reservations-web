import { useDebounce } from '@/hooks/useDebounce';
import { useSearchParams } from 'react-router';
import { HallCard } from '@/pages/halls/components/HallCard';
import type { HallSearchResponse } from '@/api/schemas/hall.schemas';
import { useEffect, useRef, useState } from 'react';
import { getErrorMessage } from '@/api/api.utils';
import { toast } from 'sonner';
import { hallService } from '@/api/services/hall.service';
import { SearchInput } from '@/components/common/SearchInput';
import Button from '@/components/ui/Button';
import { ArrowUp } from 'lucide-react';
import { ICON_SIZE } from '@/constants/ui.constants';
import SpinnerLoader from '@/components/ui/SpinnerLoader';
import { useTitle } from '@/hooks/useTitle';

export const HallsSearchPage = () => {
  useTitle('Search halls');
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';

  const [search, setSearch] = useState<string>(query);
  const debouncedSearch = useDebounce(search, 400);

  const [data, setData] = useState<HallSearchResponse | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const lastValue = useRef<string>('');

  useEffect(() => {
    if (debouncedSearch === lastValue.current) return;

    if (debouncedSearch && debouncedSearch.length >= 2) {
      lastValue.current = debouncedSearch;
      setSearchParams({ q: debouncedSearch }, { replace: true });
    } else if (!debouncedSearch) {
      lastValue.current = ''
      setSearchParams({}, { replace: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  useEffect(() => {
    setSearch(query);

    if (query.length < 2) {
      setData(null);
      return;
    }

    let isCurrent = true;
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await hallService.search({ q: query }, controller);

        if (isCurrent) setData(response);
      } catch (e) {
        const msg = getErrorMessage(e);
        if (isCurrent && msg) toast.error(msg);
      }
      if (isCurrent) setIsLoading(false);
    };

    fetchData();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [query]);

  return (
    <div className='max-w-xl w-full mx-auto flex flex-col gap-7'>
      <header className='flex justify-between gap-3 items-center'>
        <h1 className='font-bold text-lg xs:text-2xl uppercase'>Search Halls</h1>
      </header>

      <SearchInput
        value={search}
        setSearch={setSearch}
        placeholder='Outdoor, garden and more'
        ariaLabel='Search rooms by name or description'
        clearLabel='Clear search'
      />

      <section>

        {debouncedSearch === '' ? (
          <>
            <h2 className='font-bold uppercase text-sm text-gray tracking-wider mt-4 mb-7 text-center max-w-sm mx-auto'>Try searching for party venues using the word "party" to see the results</h2>
            <Button
              intent='hall'
              filled={false}
              onClick={() => {
                setSearchParams({ q: 'party' });
                setSearch('party');
              }}
              className='mx-auto uppercase text-xs font-bold tracking-wider text-hall hover:text-hall-light hover:-translate-y-1 dark:text-hall-light'
            >
              <span>
                <ArrowUp size={ICON_SIZE.SM} aria-hidden />
              </span>
              <span>Try it</span>
            </Button>
          </>
        ) : (
          <>
            <h2 className='font-bold uppercase text-sm text-gray tracking-wider mb-3'>Showing results for: {debouncedSearch}</h2>

            <ul className='flex flex-col gap-3'>

              {isLoading && (
                <div className='grid place-content-center my-3 w-full grow'>
                  <div className='flex flex-col items-center'>
                    <SpinnerLoader size='xxl' intent='gray' />
                  <span className='uppercase text-xs text-gray font-bold mt-3'>Loading data</span>
                  </div>
                </div>
              )}

              {!isLoading && data ? data.map((item) => {
                return (
                  <li key={item.id}>
                    <HallCard hall={item} />
                  </li>
                );
              }) : null}

            </ul>
          </>
        )}
      </section>
    </div>
  );
};