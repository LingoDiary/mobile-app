import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'onboarding',
    loadComponent: () => import('./screens/onboarding/onboarding').then(m => m.Onboarding),
  }
];
