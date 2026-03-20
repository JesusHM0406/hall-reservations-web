import { z } from 'zod';

export const parseAPIResponse = <T>(scheme: z.ZodType<T>, dataToParse: unknown): T => {
  const parsedData = scheme.safeParse(dataToParse);
  
  if (!parsedData.success) throw new Error('Error loading data: API format changed, we will fix it as soon as possible.');

  return parsedData.data;
};