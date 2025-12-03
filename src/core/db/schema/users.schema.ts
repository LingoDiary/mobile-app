export const usersSchema = {
  table: 'users',
  create: `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      uuid TEXT NOT NULL,
      name TEXT NOT NULL,
      mentorId INTEGER NOT NULL,
      nativeLanguageId INTEGER NOT NULL,
      languageLevelId INTEGER NOT NULL,
      passcode TEXT,
      reminder TEXT,
      isOnboarded INTEGER NOT NULL,
      isTutorialCompleted INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT
    );
  `
};
