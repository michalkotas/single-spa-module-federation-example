import { Routes } from '@angular/router';
import { MicrofrontendContainerComponent } from './microfrontend-container.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { getAppNames, registerApplication } from 'single-spa';

const appRegistered = (name: string) => getAppNames().includes(name);

const loadMfe = (name: string, remoteEntry: string, exposedModule: string) =>
  loadRemoteModule({
    type: 'module',
    remoteEntry,
    exposedModule,
  }).then((module) => {
    if (!appRegistered(name)) {
      registerApplication({
        name,
        app: module,
        activeWhen: `/${name}`,
      });
    }
    //@ts-expect-error
    console.log('share scopes', __webpack_share_scopes__)
    return MicrofrontendContainerComponent;
  });

export const routes: Routes = [
  {
    path: 'mfe1',
    loadComponent: () =>
      loadMfe('mfe1', 'http://localhost:4201/remoteEntry.js', './App'),
  },
  {
    path: 'mfe2',
    loadComponent: () =>
      loadMfe('mfe2', 'http://localhost:4202/remoteEntry.js', './App'),
  },
  {
    path: 'mfe3',
    loadComponent: () =>
      loadMfe('mfe3', 'http://localhost:4203/remoteEntry.js', './App'),
  },  
];
