import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'onboarding',
    loadComponent: () => import('app/screens/onboarding/onboarding').then(m => m.Onboarding),
  },
  {
    path: 'diary',
    loadComponent: () => import('app/screens/diary/diary').then(m => m.DiaryScreen),
  },
  {
    path: 'diary/entry',
    loadComponent: () => import('app/screens/diary/entry/entry').then(m => m.EntryScreen),
  },
  {
    path: 'diary/entry/:id',
    loadComponent: () => import('app/screens/diary/entry/entry').then(m => m.EntryScreen),
  },
  {
    path: 'calender',
    loadComponent: () => import('@app/screens/calendar/calendar').then(m => m.CalendarScreen),
  },
  {
    path: 'dictionary',
    loadComponent: () => import('app/screens/dictionary/list/list').then(m => m.ListScreen),
  },
  {
    path: 'dictionary/entry',
    loadComponent: () => import('app/screens/dictionary/entry/entry').then(m => m.EntryScreen),
  },
  {
    path: 'dictionary/entry/:id',
    loadComponent: () => import('app/screens/dictionary/entry/entry').then(m => m.EntryScreen),
  },
  {
    path: 'profile',
    loadComponent: () => import('app/screens/profile/profile').then(m => m.ProfileScreen),
  },
  {
    path: 'profile/name',
    loadComponent: () => import('app/screens/profile/name/name').then(m => m.NameScreen),
  },
  {
    path: 'profile/passcode',
    loadComponent: () => import('app/screens/profile/passcode/passcode').then(m => m.PasscodeScreen),
  },
  {
    path: 'profile/mentor',
    loadComponent: () => import('app/screens/profile/mentor/mentor').then(m => m.MentorScreen),
  },
  {
    path: 'profile/native-language',
    loadComponent: () => import('app/screens/profile/native-language/native-language').then(m => m.NativeLanguageScreen),
  },
  {
    path: 'profile/language-level',
    loadComponent: () => import('app/screens/profile/language-level/language-level').then(m => m.LanguageLevelScreen),
  },
  {
    path: 'profile/reminder',
    loadComponent: () => import('app/screens/profile/reminder/reminder').then(m => m.ReminderScreen),
  },
];
