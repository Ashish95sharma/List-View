import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export const getQueryErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined,
  fallback = 'Something went wrong'
): string => {
  if (!error) {
    return fallback;
  }

  if ('status' in error) {
    if (typeof error.data === 'string' && error.data.trim()) {
      return error.data;
    }

    if (
      error.data &&
      typeof error.data === 'object' &&
      'message' in error.data &&
      typeof (error.data as { message: unknown }).message === 'string'
    ) {
      return (error.data as { message: string }).message;
    }

    if (typeof error.status === 'number') {
      return `Request failed (${error.status})`;
    }

    return fallback;
  }

  return error.message || fallback;
};
