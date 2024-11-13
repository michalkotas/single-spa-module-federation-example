
Promise.all([
  //do some initial config
])
.then(() => import('./bootstrap'))
.catch(err => console.error('error', err));