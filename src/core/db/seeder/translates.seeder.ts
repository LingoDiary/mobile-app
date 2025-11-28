import { Translate } from '@core/db/db-tables';
import { Db } from '@core/db/db';

export const FAKE_TRANSLATIONS: Translate[] = [
  {
    phrase: "break down",
    translation: "разобраться; сломаться",
    createdAt: "2025-01-10T10:15:00.000Z",
    updatedAt: null
  },
  {
    phrase: "look forward to",
    translation: "ожидать с нетерпением",
    createdAt: "2025-01-11T09:42:00.000Z",
    updatedAt: null
  },
  {
    phrase: "take it easy",
    translation: "не переживай; расслабься",
    createdAt: "2025-01-12T13:05:00.000Z",
    updatedAt: null
  },
  {
    phrase: "as soon as possible (ASAP)",
    translation: "как можно скорее",
    createdAt: "2025-01-12T15:19:00.000Z",
    updatedAt: null
  },
  {
    phrase: "on my own",
    translation: "самостоятельно",
    createdAt: "2025-01-13T08:33:00.000Z",
    updatedAt: null
  },
  {
    phrase: "figure out",
    translation: "понять; разобраться",
    createdAt: "2025-01-13T19:48:00.000Z",
    updatedAt: null
  },
  {
    phrase: "pretty much",
    translation: "в целом; почти",
    createdAt: "2025-01-14T10:28:00.000Z",
    updatedAt: null
  },
  {
    phrase: "by the way (BTW)",
    translation: "кстати",
    createdAt: "2025-01-14T12:10:00.000Z",
    updatedAt: null
  },
  {
    phrase: "no worries",
    translation: "не переживай",
    createdAt: "2025-01-15T09:00:00.000Z",
    updatedAt: null
  },
  {
    phrase: "grab a bite",
    translation: "перекусить",
    createdAt: "2025-01-15T11:22:00.000Z",
    updatedAt: null
  }
];


export class TranslationSeeder {

  async run(db: Db): Promise<void> {
    const count = await db.translates.count();

    if (count === 0) {
      await db.translates.bulkPut(FAKE_TRANSLATIONS);
      console.log('[Seeder] Translations table seeded.');
    } else {
      console.log('[Seeder] Translations table already filled — skip.');
    }
  }
}
