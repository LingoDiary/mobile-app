import { Db } from '@core/db/db';
import { Entry } from '@core/db/db-tables';
import { v4 as uuidv4 } from 'uuid';

export const FAKE_ENTRIES: Entry[] = [
  {
    uuid: uuidv4(),
    mentorId: 1,
    content: "Today I started using LingoDiary. It feels nice to write something in English.",
    analysis: null,
    analysisStatus: 'none',
    createdAt: "2025-01-14T09:12:00.000Z",
    updatedAt: null
  },
  {
    uuid: uuidv4(),
    mentorId: 2,
    content: "I learned several new phrasal verbs today: break down, look forward to, figure out.",
    analysis: null,
    analysisStatus: 'none',
    createdAt: "2025-01-14T18:40:00.000Z",
    updatedAt: null
  },
  {
    uuid: uuidv4(),
    mentorId: 1,
    content: "I wrote a short story in English and it was surprisingly fun!",
    analysis: null,
    analysisStatus: 'none',
    createdAt: "2025-01-15T08:20:00.000Z",
    updatedAt: null
  },
  {
    uuid: uuidv4(),
    mentorId: 3,
    content: "Didn't have much time today, just noting down a few thoughts.",
    analysis: null,
    analysisStatus: 'none',
    createdAt: "2025-01-16T14:55:00.000Z",
    updatedAt: null
  }
];


export class EntrySeeder {

  async run(db: Db): Promise<void> {
    const count = await db.entries.count();

    if (count === 0) {
      await db.entries.bulkPut(FAKE_ENTRIES);
      console.log('%c[Seeder]', 'color: green', 'Entries table seeded.');
    } else {
      console.log('%c[Seeder]', 'color: orange', 'Entries table already filled — skip.');
    }
  }
}
