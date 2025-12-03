export const translatesSchema = {
  table: 'translates',
  create: `
    CREATE TABLE IF NOT EXISTS translates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      phrase TEXT NOT NULL,
      translation TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT
    );
  `
};
