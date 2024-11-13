import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

export const routes: Routes = [];

export const emptyRoutes: Routes = [
    {
      path: '**',
      component: EmptyRouteComponent,
    },
  ];
  