import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LifeCycles } from 'single-spa';
import { ParcelModule } from 'single-spa-angular/parcel';
import { mountRootParcel } from 'single-spa';
import { loadRemote } from '@module-federation/enhanced/runtime';

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
  public singleSpaApps: Array<LifeCycles | null> = [];
  ngOnInit(): void {
    Promise.all([
      loadRemote<LifeCycles>('app1/App'),
      loadRemote<LifeCycles>('app2/App'),
      loadRemote<LifeCycles>('app3/App'),
    ]).then((apps) => {
      this.singleSpaApps = apps;
      this.changeDetectorRef.detectChanges();
    });
  }
}
