export interface PageResult<T> {
  data: T[];
  nextCursor: string | null;
}
