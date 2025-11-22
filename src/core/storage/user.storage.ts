import { Injectable } from '@angular/core';
import { db } from '../db/db';
import {UserDTO} from '../dto/user.dto';
import {User} from '../db/db-tables';

@Injectable({ providedIn: 'root' })
export class UserRepository {

  private readonly userId: number = 1;

  async create(user: UserDTO): Promise<number> {
    const entry: User | null = await this.user();
    if (entry) {
      return this.userId;
    }
    return db.users.add(user);
  }

  async user(): Promise<User | null> {
    return await db.users.get(this.userId) ?? null;
  }

}
