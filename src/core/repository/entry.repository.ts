import { Injectable, inject } from '@angular/core';
import { SQLiteService } from '../db/sqlite.service';
import { Entry } from '../db/db-tables';
import { PageResult } from '@core/type/page-result';
import { DiaryGroup } from '@core/type/diary-group';

@Injectable({ providedIn: 'root' })
export class EntryRepository {

  private sqlite = inject(SQLiteService);
  PAGE_SIZE = 4;

  /** Create */
  async create(item: Entry): Promise<number> {
    const sql = `
      INSERT INTO entries (
        uuid, mentorId, content, analysis, analysisStatus,
        createdAt, updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const res = await this.sqlite.run(sql, [
      item.uuid,
      item.mentorId,
      item.content,
      item.analysis,
      item.analysisStatus,
      item.createdAt,
      item.updatedAt
    ]);

    const typedResult = res as { changes?: { lastId: number, changes: number } };

    return typedResult.changes?.lastId ?? 0;
  }

  /** Update fields by id */
  async update(id: number, changes: Partial<Entry>): Promise<void> {
    const fields = Object.keys(changes);

    if (fields.length === 0) return;

    const sql = `
      UPDATE entries
      SET ${fields.map(f => `${f} = ?`).join(', ')}
      WHERE id = ?
    `;

    const params = [...fields.map(f => (changes as any)[f]), id];

    await this.sqlite.run(sql, params);
  }

  /** Find entry by id */
  async findById(id: number): Promise<Entry | null> {
    const result = await this.sqlite.query(
      `SELECT * FROM entries WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!result.values?.length) return null;

    return result.values[0] as Entry;
  }

  /** Delete entry */
  async delete(id: number): Promise<void> {
    await this.sqlite.run(`DELETE FROM entries WHERE id = ?`, [id]);
  }

  /**
   *------------------------------
   *  PAGINATION + SEARCH (UNIFIED)
   *------------------------------
   */
  async fetch(
    { cursor = null, search = null, limit = this.PAGE_SIZE }:
    { cursor?: string | null; search?: string | null; limit?: number }
  ): Promise<PageResult<Entry>> {

    const limitPlusOne = limit + 1;

    const params: any[] = [];
    const where: string[] = [];

    // SEARCH FILTER
    if (search && search.trim()) {
      where.push("LOWER(content) LIKE ?");
      params.push(`%${search.toLowerCase()}%`);
    }

    // CURSOR FILTER (shared for both search & diary)
    if (cursor) {
      where.push("createdAt < ?");
      params.push(cursor);
    }

    let sql = `
    SELECT * FROM entries
  `;

    if (where.length > 0) {
      sql += " WHERE " + where.join(" AND ");
    }

    sql += `
    ORDER BY createdAt DESC
    LIMIT ?
  `;

    params.push(limitPlusOne);

    const res = await this.sqlite.query(sql, params);

    let rows = res.values ?? [];

    const hasMore = rows.length > limit;

    if (hasMore) {
      rows = rows.slice(0, limit);
    }

    const nextCursor = hasMore
      ? rows[rows.length - 1].createdAt
      : null;

    console.log(hasMore);

    return { data: rows, nextCursor };
  }


  /** Grouping for pagination (UI-friendly format) */
  groupEntriesForPaginate(entries: Entry[]): DiaryGroup[] {
    return this.groupByDate(entries);
  }

  /** Group entries by date */
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
