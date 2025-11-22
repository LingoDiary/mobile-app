import { Injectable } from '@angular/core';
import { db } from '../db/db';
import {UserDTO} from '../dto/user.dto';
import {User} from '../db/db-tables';

@Injectable({ providedIn: 'root' })
export class UserRepository {

  private readonly USER_ID: number = 1;

  async createOrUpdate(user: UserDTO): Promise<void> {
    await db.users.put({ ...user, id: this.USER_ID });
  }

  async user(): Promise<User | null> {
    return await db.users.get(this.USER_ID) ?? null;
  }

}
