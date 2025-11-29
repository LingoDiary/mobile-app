import {HoursTimes} from '@core/type/hours-times';

export interface UserDTO {
  uuid: string;
  name: string;
  mentorId: number;
  nativeLanguageId: number;
  languageLevelId: number;
  passcode: string | null;
  reminder: HoursTimes | null,
  isOnboarded: boolean;
  isTutorialCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}
