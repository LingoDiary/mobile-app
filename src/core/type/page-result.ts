export interface PageResult<T> {
  data: T[];
  nextCursor: number | null;
}
