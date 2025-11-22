import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'onboarding',
    loadComponent: () => import('./screens/onboarding/onboarding').then(m => m.Onboarding),
  },
  {
    path: 'diary',
    loadComponent: () => import('./screens/diary/diary').then(m => m.Diary),
  },
];
