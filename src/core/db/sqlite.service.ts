import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';
import { allSchemas } from './schema';

@Injectable({ providedIn: 'root' })
export class SQLiteService {

  private sqlite: SQLiteConnection;
  private db!: SQLiteDBConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async init() {
    const platform = Capacitor.getPlatform();

    if (platform === 'web') {
      await CapacitorSQLite.initWebStore();
    }

    this.db = await this.sqlite.createConnection(
      'LingoDiaryDB',
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();
    await this.applySchemas();
  }

  private async applySchemas() {
    for (const schema of allSchemas) {
      await this.db.execute(schema.create);
      console.log(`[SQLite] Ensured table: ${schema.table}`);
    }
  }

  query(sql: string, params: any[] = []) {
    return this.db.query(sql, params);
  }

  run(sql: string, params: any[] = []) {
    return this.db.run(sql, params);
  }
}
