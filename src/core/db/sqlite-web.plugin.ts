import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

export class WebSqliteService {
  private sqliteConnection = new SQLiteConnection(CapacitorSQLite);
  private db: any;

  async init() {
    console.log('[SQLite] Init WEB…');

    await CapacitorSQLite.initWebStore();

    this.db = await this.sqliteConnection.createConnection(
      "LingoDiaryDB",
      false,             // encrypted
      "no-encryption",   // mode
      1,                 // version
      false              // readonly
    );

    await this.db.open();
    console.log('[SQLite] Opened web database');
  }

  async query(sql: string, params: any[] = []) {
    return this.db.query(sql, params);
  }

  async run(sql: string, params: any[] = []) {
    return this.db.run(sql, params);
  }
}
