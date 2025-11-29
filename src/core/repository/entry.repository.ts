import { Injectable } from '@angular/core';
import { db } from '@core/db/db';
import { v4 as uuidv4 } from 'uuid';
import {Entry, Translate} from '@core/db/db-tables';
import {PageResult} from '@core/type/page-result';


@Injectable({ providedIn: 'root' })
export class EntryRepository {

  PAGE_SIZE = 10;

  async create(item: Entry): Promise<number> {
    return db.entries.add(item);
  }

  async findById(id: number): Promise<Entry | null> {
    return await db.entries.get(id) ?? null;
  }

  /*
  async create(entry: {
    title: string;
    content: string;
    mentorId: number;
  }): Promise<number> {
  // WITH TIMEZONE
    const now = new Date().toISOString();

    return db.entries.add({
      uuid: uuidv4(),
      mentorId: entry.mentorId,
      title: entry.title,
      content: entry.content,
      analysis: null,
      analysisStatus: 'none',
      createdAt: now,
    });
  }

  async update(uuid: string, update: Partial<DiaryEntry>) {
    const now = new Date().toISOString();

    await db.entries
      .where('uuid')
      .equals(uuid)
      .modify({
        ...update,
        updatedAt: now,
        updatedLocallyAt: now,
        status: 'changed',
      });
  }

  async delete(uuid: string): Promise<void> {
    await db.entries.where('uuid').equals(uuid).delete();
  }
*/

  async paginate(cursor: number | null): Promise<PageResult<Entry>> {
    let collection;

    if (cursor === null) {
      collection = db.entries
        .orderBy('id')
        .reverse()
        .limit(this.PAGE_SIZE);
    } else {
      collection = db.entries
        .where('id')
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

    const nextCursor = data[data.length - 1].id ?? null;

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
