export const entriesSchema = {
  table: 'entries',
  create: `
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      mentorId INTEGER NOT NULL,
      content TEXT NOT NULL,
      analysis TEXT,
      analysisStatus TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_entries_createdAt
      ON entries(createdAt);
  `
};
