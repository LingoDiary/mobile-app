import Dexie, { Table } from 'dexie';
import { User, Translate } from './db-tables';
import { TranslationSeeder } from './seeder/translates.seeder';

export class Db extends Dexie {
  users!: Table<User, number>;
  translates!: Table<Translate, number>;

  private translationSeeder = new TranslationSeeder();

  constructor() {
    super('LingoDiaryDB');

    this.version(1).stores({
      users: '++id',
      translates: '++id',
    });

    this.on('populate', () => {
      //this.seed();
    });
  }

  private async seed() {
    console.log('[DB] Running seeders...');
    await this.translationSeeder.run(this);
    console.log('[DB] Seeding completed.');
  }
}

export const db = new Db();
