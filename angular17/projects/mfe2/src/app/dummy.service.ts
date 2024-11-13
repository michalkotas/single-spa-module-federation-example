import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

  constructor() {
    console.log('inside mfe2 DummyService constructor', new Date().toISOString())
   }

   doNothing() {
    console.log('doing nothing for mfe2')
   }
}
