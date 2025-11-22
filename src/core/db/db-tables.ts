export interface User {
  id?: number;
  name: string;
  mentorId: number;
  nativeLanguageId: number;
  languageLevelId: number;
  passcode: string | null;
  reminder: { hour: string, minutes: string} | null;
  isOnboarded: boolean;
  isTutorialCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}
