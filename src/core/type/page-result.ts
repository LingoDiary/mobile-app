export interface PageResult<T> {
  data: T[];
  nextCursor: string | number | null;
}
