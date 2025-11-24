import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'onboarding',
    loadComponent: () => import('app/screens/onboarding/onboarding').then(m => m.Onboarding),
  },
  {
    path: 'diary',
    loadComponent: () => import('app/screens/diary/diary').then(m => m.Diary),
  },
  {
    path: 'calender',
    loadComponent: () => import('@app/screens/calendar/calendar').then(m => m.Calendar),
  },
  {
    path: 'dictionary',
    loadComponent: () => import('app/screens/dictionary/dictionary').then(m => m.Dictionary),
  },
  {
    path: 'profile',
    loadComponent: () => import('app/screens/profile/profile').then(m => m.Profile),
  },
  {
    path: 'profile/name',
    loadComponent: () => import('app/screens/profile/name/name').then(m => m.Name),
  },
  {
    path: 'profile/passcode',
    loadComponent: () => import('app/screens/profile/passcode/passcode').then(m => m.Passcode),
  },
  {
    path: 'profile/mentor',
    loadComponent: () => import('app/screens/profile/mentor/mentor').then(m => m.Mentor),
  },
  {
    path: 'profile/native-language',
    loadComponent: () => import('app/screens/profile/native-language/native-language').then(m => m.NativeLanguage),
  },
  {
    path: 'profile/language-level',
    loadComponent: () => import('app/screens/profile/language-level/language-level').then(m => m.LanguageLevel),
  },
  {
    path: 'profile/reminder',
    loadComponent: () => import('app/screens/profile/reminder/reminder').then(m => m.Reminder),
  },
];
