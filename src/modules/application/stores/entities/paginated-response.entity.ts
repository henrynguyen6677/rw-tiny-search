export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};
