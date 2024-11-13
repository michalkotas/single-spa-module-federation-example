import { Routes } from '@angular/router';
import { EmptyRouteComponent } from './empty-route/empty-route.component';

export const routes: Routes = [];

/**
 * See: https://single-spa.js.org/docs/ecosystem-angular#routing
 */
export const emptyRoutes: Routes = [
    {
      path: '**',
      component: EmptyRouteComponent,
    },
  ];
  