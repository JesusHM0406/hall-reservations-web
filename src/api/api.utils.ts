import { isCancel, isAxiosError } from 'axios';
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

export const getErrorMessage = (error: unknown) => {
  if (isCancel(error)) return;

  if (error instanceof ZodParseError) return error.message;

  if (isAxiosError(error)) {
    const data = error.response?.data;

    // These are Pydantic-specific errors
    if (data?.detail && Array.isArray(data?.detail)) {
      return 'Validation error: Please ensure that the values ​​are correct.';
    }

    // These are the general API errors
    if (typeof data?.detail === 'string') {
      return data.detail;
    }

    return error.message || 'Network error.';
  }

  return 'Unexpected error';
};