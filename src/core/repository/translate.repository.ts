import { Injectable } from '@angular/core';
import { db } from '@core/db/db';
import { Translate } from '@core/db/db-tables';

export interface PageResult<T> {
  data: T[];
  nextCursor: number | null;
}

@Injectable({ providedIn: 'root' })
export class TranslateRepository {

  PAGE_SIZE = 20;

  async loadPage(cursor: number | null): Promise<PageResult<Translate>> {
    let collection;

    if (cursor === null) {
      collection = db.translates
        .orderBy('id')
        .reverse()
        .limit(this.PAGE_SIZE);
    } else {
      collection = db.translates
        .where('id')
        .below(cursor)
        .reverse()
        .limit(this.PAGE_SIZE);
    }

    const data: Translate[] = await collection.toArray();

    if (data.length < this.PAGE_SIZE) {
      return {
        data,
        nextCursor: null
      };
    }

    const nextCursor = data[data.length - 1].id ?? null;

    return {
      data,
      nextCursor
    };
  }

  async create(item: Translate): Promise<void> {
    await db.translates.put(item);
  }
}
