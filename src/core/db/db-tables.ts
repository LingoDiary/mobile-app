import {HoursTimes} from '@core/type/hours-times';

export interface User {
  id?: number;
  name: string;
  mentorId: number;
  nativeLanguageId: number;
  languageLevelId: number;
  passcode: string | null;
  reminder: HoursTimes | null;
  isOnboarded: boolean;
  isTutorialCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface Translate {
  id?: number;
  phrase: string;
  translation: string;
  createdAt: string;
  updatedAt: string | null;
}
