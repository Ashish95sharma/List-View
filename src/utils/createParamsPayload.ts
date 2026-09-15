const isEmptyParam = (value: unknown): boolean => {
  if (value === undefined || value === null || value === '') {
    return true;
  }

  return Array.isArray(value) && value.length === 0;
};

/**
 * Builds a query/request params object with empty values omitted.
 * Use for any API call so the payload stays clean.
 */
export const createParamsPayload = <T extends object>(
  params?: T | null | void
): Partial<T> => {
  if (!params) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => !isEmptyParam(value))
  ) as Partial<T>;
};
