import Dexie, { Table } from 'dexie';
import { User } from './db-tables';

export class Db extends Dexie {
  users!: Table<User, number>;

  constructor() {
    super('LingoDiaryDB');

    this.version(1).stores({
      users: '++id',
    });
  }
}

export const db = new Db();
