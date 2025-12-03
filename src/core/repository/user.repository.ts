import { Injectable, inject } from '@angular/core';
import { SQLiteService } from '../db/sqlite.service';
import { User } from '../db/db-tables';
import { UserDTO } from '../dto/user.dto';
import { HoursTimes } from '@core/type/hours-times';

@Injectable({ providedIn: 'root' })
export class UserRepository {

  private sqlite = inject(SQLiteService);

  private readonly USER_ID = 1;

  /** Create or update the single user record */
  async createOrUpdate(user: UserDTO): Promise<void> {
    const sql = `
      INSERT INTO users
      (id, uuid, name, mentorId, nativeLanguageId, languageLevelId,
       passcode, reminder, isOnboarded, isTutorialCompleted, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        uuid = excluded.uuid,
        name = excluded.name,
        mentorId = excluded.mentorId,
        nativeLanguageId = excluded.nativeLanguageId,
        languageLevelId = excluded.languageLevelId,
        passcode = excluded.passcode,
        reminder = excluded.reminder,
        isOnboarded = excluded.isOnboarded,
        isTutorialCompleted = excluded.isTutorialCompleted,
        createdAt = excluded.createdAt,
        updatedAt = excluded.updatedAt;
    `;

    await this.sqlite.run(sql, [
      this.USER_ID,
      user.uuid,
      user.name,
      user.mentorId,
      user.nativeLanguageId,
      user.languageLevelId,
      user.passcode,
      user.reminder ? JSON.stringify(user.reminder) : null,
      user.isOnboarded ? 1 : 0,
      user.isTutorialCompleted ? 1 : 0,
      user.createdAt,
      user.updatedAt
    ]);
  }

  /** Fetch the stored user */
  async user(): Promise<User | null> {
    const result = await this.sqlite.query(
      `SELECT * FROM users WHERE id = ? LIMIT 1`,
      [this.USER_ID]
    );

    if (!result.values || result.values.length === 0) {
      return null;
    }

    const row = result.values[0];

    return {
      ...row,
      isOnboarded: !!row.isOnboarded,
      isTutorialCompleted: !!row.isTutorialCompleted,
      reminder: row.reminder ? JSON.parse(row.reminder) : null
    };
  }

  /** Simple getters */
  async getName() {
    const user = await this.user();
    return user?.name ?? null;
  }

  async getMentor() {
    const user = await this.user();
    return user?.mentorId ?? null;
  }

  async getNativeLanguage() {
    const user = await this.user();
    return user?.nativeLanguageId ?? null;
  }

  async getLanguageLevel() {
    const user = await this.user();
    return user?.languageLevelId ?? null;
  }

  async getReminder() {
    const user = await this.user();
    return user?.reminder ?? null;
  }

  /** Update individual fields */
  async updateName(name: string) {
    await this.sqlite.run(`UPDATE users SET name = ? WHERE id = ?`, [name, this.USER_ID]);
  }

  async updatePasscode(passcode: string | null) {
    await this.sqlite.run(`UPDATE users SET passcode = ? WHERE id = ?`, [passcode, this.USER_ID]);
  }

  async updateMentor(mentorId: number) {
    await this.sqlite.run(`UPDATE users SET mentorId = ? WHERE id = ?`, [mentorId, this.USER_ID]);
  }

  async updateNativeLanguage(nativeLanguageId: number) {
    await this.sqlite.run(`UPDATE users SET nativeLanguageId = ? WHERE id = ?`, [nativeLanguageId, this.USER_ID]);
  }

  async updateLanguageLevel(languageLevelId: number) {
    await this.sqlite.run(`UPDATE users SET languageLevelId = ? WHERE id = ?`, [languageLevelId, this.USER_ID]);
  }

  async updateReminder(reminder: HoursTimes | null) {
    await this.sqlite.run(
      `UPDATE users SET reminder = ? WHERE id = ?`,
      [reminder ? JSON.stringify(reminder) : null, this.USER_ID]
    );
  }
}
