import type { Method } from 'axios';
import { z } from 'zod';

interface BaseEndpoint {
  path: string;
  method: Method;
}

type Requirement<T, Key extends string, ValueType> = T extends undefined ? 
  { [K in Key]?: never } : { [K in Key]: ValueType };

export type Endpoint<
  TResponse = undefined, 
  TParams = undefined, 
  TData = undefined
> = 
  BaseEndpoint & 
  Requirement<TResponse, 'schema', z.ZodType<TResponse>> & 
  Requirement<TParams, 'params', TParams> & 
  Requirement<TData, 'data', TData>;