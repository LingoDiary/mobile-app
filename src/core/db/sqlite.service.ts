import { Injectable } from '@angular/core';
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
  private dbName = 'LingoDiaryDB';
  private isInitialized = false;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async init() {
    // Предотвращаем повторную инициализацию
    if (this.isInitialized && this.db) {
      console.log('[SQLite] Already initialized, reusing connection');
      return;
    }

    try {
      await this.initializeConnection();
    } catch (error: any) {
      console.error('[SQLite] Initialization error:', error);

      // Если соединение уже существует - закрываем и пересоздаем
      if (error?.message?.includes('already exists')) {
        console.log('[SQLite] Connection exists, attempting cleanup and retry...');
        await this.forceCleanup();
        // Повторная попытка после очистки
        await this.initializeConnection();
      } else {
        throw error;
      }
    }
  }

  private async initializeConnection() {
    // Проверяем, существует ли соединение
    const isConnection = await this.sqlite.isConnection(this.dbName, false);

    if (isConnection.result) {
      console.log('[SQLite] Connection exists, retrieving...');
      this.db = await this.sqlite.retrieveConnection(this.dbName, false);
    } else {
      console.log('[SQLite] Creating new connection...');
      this.db = await this.sqlite.createConnection(
        this.dbName,
        false,
        'no-encryption',
        1,
        false
      );
    }

    // Проверяем, открыта ли база данных
    const isOpen = await this.db.isDBOpen();
    if (!isOpen.result) {
      await this.db.open();
      console.log('[SQLite] Database opened');
    } else {
      console.log('[SQLite] Database already open');
    }

    await this.applySchemas();
    this.isInitialized = true;
    console.log('[SQLite] Initialization complete');
  }

  private async forceCleanup() {
    try {
      // Пытаемся получить соединение
      const isConnection = await this.sqlite.isConnection(this.dbName, false);

      if (isConnection.result) {
        const conn = await this.sqlite.retrieveConnection(this.dbName, false);

        // Проверяем, открыто ли оно
        const isOpen = await conn.isDBOpen();
        if (isOpen.result) {
          await conn.close();
          console.log('[SQLite] Closed existing connection');
        }
      }

      // Закрываем все соединения принудительно
      await this.sqlite.closeConnection(this.dbName, false);
      console.log('[SQLite] Force closed connection');

      // Небольшая задержка для завершения операций
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (cleanupError) {
      console.warn('[SQLite] Cleanup warning (may be OK):', cleanupError);
      // Игнорируем ошибки cleanup - возможно соединение уже закрыто
    }
  }

  private async applySchemas() {
    for (const schema of allSchemas) {
      await this.db.execute(schema.create);
      console.log(`[SQLite] Ensured table: ${schema.table}`);
    }
  }

  query(sql: string, params: any[] = []) {
    if (!this.db) {
      throw new Error('Database not initialized. Call init() first.');
    }
    return this.db.query(sql, params);
  }

  run(sql: string, params: any[] = []) {
    if (!this.db) {
      throw new Error('Database not initialized. Call init() first.');
    }
    return this.db.run(sql, params);
  }

  async close() {
    if (this.db) {
      try {
        const isOpen = await this.db.isDBOpen();
        if (isOpen.result) {
          await this.db.close();
          console.log('[SQLite] Database closed');
        }
        this.isInitialized = false;
      } catch (error) {
        console.error('[SQLite] Error closing database:', error);
      }
    }
  }
}
