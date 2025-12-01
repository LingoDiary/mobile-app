import { Injectable } from '@angular/core';
import { db } from '@core/db/db';
import { v4 as uuidv4 } from 'uuid';
import {Entry, Translate} from '@core/db/db-tables';
import {PageResult} from '@core/type/page-result';


@Injectable({ providedIn: 'root' })
export class EntryRepository {

  PAGE_SIZE = 4;

  async create(item: Entry): Promise<number> {
    return db.entries.add(item);
  }

  async update(id: number, changes: Partial<Entry>): Promise<void> {
    await db.entries.update(id, changes);
  }

  async findById(id: number): Promise<Entry | null> {
    return await db.entries.get(id) ?? null;
  }

  async delete(id: number): Promise<void> {
    await db.entries.where('id').equals(id).delete();
  }

  async paginate(cursor: string | null): Promise<PageResult<Entry>> {
    let collection;

    if (cursor === null) {
      collection = db.entries
        .orderBy('createdAt')
        .reverse()
        .limit(this.PAGE_SIZE);
    } else {
      collection = db.entries
        .where('createdAt')
        .below(cursor)
        .reverse()
        .limit(this.PAGE_SIZE);
    }

    const data: Entry[] = await collection.toArray();

    if (data.length < this.PAGE_SIZE) {
      return {
        data,
        nextCursor: null
      };
    }

    const nextCursor = data[data.length - 1].createdAt ?? null;

    return {
      data,
      nextCursor
    };
  }

/*
  async search(query: string): Promise<DiaryEntry[]> {
    if (!query || query.trim().length < 3) return [];

    query = query.toLowerCase();

    return db.entries.filter(entry =>
      entry.title.toLowerCase().includes(query) ||
      entry.content.toLowerCase().includes(query)
    ).toArray();
  }

  async groupByDate(entries: DiaryEntry[]): Promise<DiaryGroup[]> {
    const groups: Record<string, DiaryGroup> = {};

    for (const entry of entries) {
      const date = entry.createdAt.split('T')[0];
      const display = new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      if (!groups[date]) {
        groups[date] = {
          date,
          display,
          entries: [],
        };
      }
      groups[date].entries.push(entry);
    }

    return Object.values(groups).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }*/
}
