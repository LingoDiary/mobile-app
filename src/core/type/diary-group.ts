import {Entry} from '@core/db/db-tables';

export interface DiaryGroup {
  date: string;
  display: string;
  entries: Entry[];
}
