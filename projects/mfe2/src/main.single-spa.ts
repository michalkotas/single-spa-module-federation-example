import {
  APP_INITIALIZER,
  ApplicationRef,
  ErrorHandler,
  NgZone,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  Router,
  NavigationStart,
  provideRouter,
  withDisabledInitialNavigation,
} from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from 'single-spa-angular';

import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { emptyRoutes } from './app/app.routes'
import { AppProps, LifeCycleFn } from 'single-spa';

let applicationRef: ApplicationRef;
const lifecycles = singleSpaAngular({
  bootstrapFunction: (singleSpaProps: AppProps) => {
    return bootstrapApplication(AppComponent, {
      providers: [
        ...getSingleSpaExtraProviders(),
        provideRouter(emptyRoutes, withDisabledInitialNavigation()),
        {
          provide: APP_BASE_HREF,
          /**
           * See: https://single-spa.js.org/docs/ecosystem-angular#routing
           */
          useValue: '/',
        },
        provideAnimations(),
      ],
    }).then((ref) => {
      applicationRef = ref;
      return ref;
    });
  },
  template: '<mfe2-app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;

export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;
// export function unmount(props: AppProps) {
//   const unmount = lifecycles.unmount as LifeCycleFn<AppProps>;
//   return unmount(props).then(() => {
//     if (!applicationRef.destroyed) {
//       applicationRef.destroy();
//     }
//   });
// }
