import {
  ApplicationRef,
  NgZone,
} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  Router,
  NavigationStart,
  provideRouter,
  withDisabledInitialNavigation,
} from '@angular/router';

import {
  singleSpaAngular,
  getSingleSpaExtraProviders,
} from 'single-spa-angular';

import { AppComponent } from './app/app.component';
import { APP_BASE_HREF } from '@angular/common';
import { emptyRoutes } from './app/app.routes'
import { AppProps } from 'single-spa';

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
      ],
    }).then((ref) => {
      applicationRef = ref;
      return ref;
    });
  },
  template: '<mfe1-app-root />',
  Router,
  NavigationStart,
  NgZone,
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;