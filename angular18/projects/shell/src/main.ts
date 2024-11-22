import { init } from '@module-federation/enhanced/runtime';

init({
  name: 'app-main',
  remotes: [
    {
      type: 'module',
      name: 'app1',
      entry: 'http://localhost:4201/mf-manifest.json',
    },
    {
      type: 'module',
      name: 'app2',
      entry: 'http://localhost:4202/mf-manifest.json',
      shareScope: 'legacy'
    },
    {
      type: 'module',
      name: 'app3',
      entry: 'http://localhost:4203/mf-manifest.json',
      shareScope: 'legacy'
    },
  ],
});

Promise.all([
])
.then(() => import('./bootstrap'))
.catch(err => console.error('error', err));