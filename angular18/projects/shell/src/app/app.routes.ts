import { Routes } from '@angular/router';
import { DummyComponent } from './dummy.component';
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
    return DummyComponent;
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
];
