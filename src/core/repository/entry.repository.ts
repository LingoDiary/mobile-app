import { Injectable } from '@angular/core';
import { db } from '@core/db/db';
import { v4 as uuidv4 } from 'uuid';
import {Entry, Translate} from '@core/db/db-tables';
import {PageResult} from '@core/type/page-result';
import {DiaryGroup} from '@core/type/diary-group';


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

  /**
   * -----------------------------
   * PAGINATION
   * -----------------------------
   */
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

    const nextCursor = data.length < this.PAGE_SIZE
      ? null
      : data[data.length - 1].createdAt;

    return { data, nextCursor };
  }

  /**
   * -----------------------------
   * SEARCH → returns grouped result
   * -----------------------------
   */
  async search(query: string): Promise<DiaryGroup[]> {
    if (!query || query.trim().length < 3) return [];

    const q = query.toLowerCase();

    const matches = await db.entries
      .filter(entry => entry.content.toLowerCase().includes(q))
      .toArray();

    return this.groupByDate(matches);
  }

  /**
   * -----------------------------
   * For pagination → grouping raw merged entries
   * -----------------------------
   */
  groupEntriesForPaginate(entries: Entry[]): DiaryGroup[] {
    return this.groupByDate(entries);
  }

  /**
   * -----------------------------
   * UNIVERSAL GROUPING FUNCTION
   * -----------------------------
   */
  private groupByDate(entries: Entry[]): DiaryGroup[] {
    const groups: Record<string, DiaryGroup> = {};

    for (const entry of entries) {
      const dateObj = new Date(entry.createdAt);
      const date = dateObj.toISOString().slice(0, 10);

      const display = dateObj.toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      if (!groups[date]) {
        groups[date] = { date, display, entries: [] };
      }

      groups[date].entries.push(entry);
    }

    return Object.values(groups).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }
}
