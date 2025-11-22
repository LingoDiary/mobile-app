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
];
