import { Injectable, inject } from '@angular/core';
import { SQLiteService } from '../db/sqlite.service';
import { Translate } from '../db/db-tables';
import {PageResult} from '@core/type/page-result';

@Injectable({ providedIn: 'root' })
export class TranslateRepository {

  private sqlite = inject(SQLiteService);
  PAGE_SIZE = 10;

  /** Paginate by ID (cursor style) */
  async paginate(cursor: string | number | null): Promise<PageResult<Translate>> {
    let sql: string;
    let params: any[];

    if (cursor === null) {
      // first page
      sql = `
        SELECT * FROM translates
        ORDER BY id DESC
        LIMIT ?
      `;
      params = [this.PAGE_SIZE];
    } else {
      // next pages
      sql = `
        SELECT * FROM translates
        WHERE id < ?
        ORDER BY id DESC
        LIMIT ?
      `;
      params = [cursor, this.PAGE_SIZE];
    }

    const result = await this.sqlite.query(sql, params);
    const data = result.values ?? [];

    // next cursor
    const nextCursor =
      data.length < this.PAGE_SIZE ? null : data[data.length - 1].id;

    return {
      data,
      nextCursor
    };
  }

  /** Create new translate */
  async create(item: Translate): Promise<void> {
    const sql = `
      INSERT INTO translates (phrase, translation, createdAt, updatedAt)
      VALUES (?, ?, ?, ?)
    `;

    await this.sqlite.run(sql, [
      item.phrase,
      item.translation,
      item.createdAt,
      item.updatedAt
    ]);
  }

  /** Find by id */
  async findById(id: number) {
    const result = await this.sqlite.query(
      `SELECT * FROM translates WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!result.values || result.values.length === 0) {
      return null;
    }

    return result.values[0] as Translate;
  }

  /** Update translate */
  async update(item: Translate) {
    const sql = `
      UPDATE translates
      SET phrase = ?, translation = ?, createdAt = ?, updatedAt = ?
      WHERE id = ?
    `;

    await this.sqlite.run(sql, [
      item.phrase,
      item.translation,
      item.createdAt,
      item.updatedAt,
      item.id
    ]);
  }

  /** Delete translate */
  async delete(id: number) {
    await this.sqlite.run(`DELETE FROM translates WHERE id = ?`, [id]);
  }
}
