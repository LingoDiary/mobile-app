import {Reminder} from '@core/type/reminder';

export interface UserDTO {
  name: string;
  mentorId: number;
  nativeLanguageId: number;
  languageLevelId: number;
  passcode: string | null;
  reminder: Reminder | null,
  isOnboarded: boolean;
  isTutorialCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}
