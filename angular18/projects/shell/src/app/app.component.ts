import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { LifeCycles } from 'single-spa';
import { ParcelModule } from 'single-spa-angular/parcel';
import { mountRootParcel } from 'single-spa';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, ParcelModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private changeDetectorRef = inject(ChangeDetectorRef);
  mountRootParcel = mountRootParcel;
  public singleSpaApps: LifeCycles[] = [];
  ngOnInit(): void {
    Promise.all([
      loadRemoteModule<LifeCycles>({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './App',
      }),
      loadRemoteModule<LifeCycles>({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './App',
      }),
      loadRemoteModule<LifeCycles>({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './App',
      }),
    ]).then((apps) => {
      this.singleSpaApps = apps;
      this.changeDetectorRef.detectChanges();
    });
  }
}
