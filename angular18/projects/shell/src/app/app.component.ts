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

  async ngOnInit() {
    for (const remoteName of [
      'app1/App',
      'app2/App',
      'app3/App',
    ]) {
      const module = await loadRemote<LifeCycles>(remoteName);
      this.singleSpaApps.push(module)
      if (this.singleSpaApps.length === 3) {
        this.changeDetectorRef.detectChanges();
      }
      
    }
  }
}
