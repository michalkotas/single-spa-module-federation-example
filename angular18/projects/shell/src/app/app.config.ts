import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { getSingleSpaExtraProviders } from 'single-spa-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    ...getSingleSpaExtraProviders(),
    provideRouter(routes),
  ],
};
