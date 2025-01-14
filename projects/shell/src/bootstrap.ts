import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as singleSpa from 'single-spa';
import 'zone.js'

bootstrapApplication(AppComponent, appConfig)
  .then(() => singleSpa.start())
  .catch((err) => console.error(err));
