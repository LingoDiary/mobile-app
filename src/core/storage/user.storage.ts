import {Injectable} from '@angular/core';
import {db} from '../db/db';
import {UserDTO} from '../dto/user.dto';
import {User} from '../db/db-tables';
import {HoursTimes} from '@core/type/hours-times';

@Injectable({providedIn: 'root'})
export class UserRepository {

  private readonly USER_ID: number = 1;

  async createOrUpdate(user: UserDTO): Promise<void> {
    await db.users.put({...user, id: this.USER_ID});
  }

  async user(): Promise<User | null> {
    return await db.users.get(this.USER_ID) ?? null;
  }

  async getName(): Promise<string | null> {
    const user: User | null = await this.user() ?? null;
    if (user) {
      return user.name;
    }
    return null;
  }

  async getMentor(): Promise<number | null> {
    const user: User | null = await this.user() ?? null;
    if (user) {
      return user.mentorId;
    }
    return null;
  }

  async getNativeLanguage(): Promise<number | null> {
    const user: User | null = await this.user() ?? null;
    if (user) {
      return user.nativeLanguageId;
    }
    return null;
  }

  async getLanguageLevel(): Promise<number | null> {
    const user: User | null = await this.user() ?? null;
    if (user) {
      return user.languageLevelId;
    }
    return null;
  }

  async getReminder(): Promise<HoursTimes | null> {
    const user: User | null = await this.user() ?? null;
    if (user) {
      return user.reminder;
    }
    return null;
  }

  async updateName(name: string): Promise<void> {
    await db.users.update(this.USER_ID, {name});
  }

  async updatePasscode(passcode: string | null): Promise<void> {
    await db.users.update(this.USER_ID, {passcode});
  }

  async updateMentor(mentorId: number): Promise<void> {
    await db.users.update(this.USER_ID, {mentorId});
  }

  async updateNativeLanguage(nativeLanguageId: number): Promise<void> {
    await db.users.update(this.USER_ID, {nativeLanguageId});
  }

  async updateLanguageLevel(languageLevelId: number): Promise<void> {
    await db.users.update(this.USER_ID, {languageLevelId});
  }

  async updateReminder(reminder: HoursTimes | null): Promise<void> {
    await db.users.update(this.USER_ID, {reminder});
  }
}
