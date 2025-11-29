import {HoursTimes} from '@core/type/hours-times';

export interface User {
  id?: number;
  uuid: string;
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

export interface Entry {
  id?: number;
  uuid: string;
  mentorId: number;
  content: string;
  analysis: string | null;
  analysisStatus:
    | 'none' // analysis not started
    | 'pending' // analysis in progress
    | 'completed' // analysis completed successfully ;
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
