import { z } from 'zod';

export class ZodParseError extends Error {
  override message: string;

  constructor (message: string) {
    super(message);
    this.message = message;
  }
}

export const parseAPIResponse = <T>(scheme: z.ZodType<T>, dataToParse: unknown): T => {
  const parsedData = scheme.safeParse(dataToParse);
  
  if (!parsedData.success) throw new ZodParseError('Error loading data: API format changed, we will fix it as soon as possible.');

  return parsedData.data;
};