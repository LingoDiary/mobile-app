import Dexie, { Table } from 'dexie';
import {User, Translate, Entry} from './db-tables';
import { TranslationSeeder } from './seeder/translates.seeder';
import {EntrySeeder} from '@core/db/seeder/entries.seeder';

export class Db extends Dexie {
  users!: Table<User, number>;
  translates!: Table<Translate, number>;
  entries!: Table<Entry, number>;

  private translationSeeder = new TranslationSeeder();
  private entrySeeder = new EntrySeeder();

  constructor() {
    super('LingoDiaryDB');

    this.version(1).stores({
      users: '++id',
      translates: '++id',
      entries: `++id, createdAt`,
    });

    this.on('populate', () => {
      //this.seed();
    });
  }

  private async seed() {
    console.log('[DB] Running seeders...');
    await this.translationSeeder.run(this);
    await this.entrySeeder.run(this);
    console.log('[DB] Seeding completed.');
  }
}

export const db = new Db();
