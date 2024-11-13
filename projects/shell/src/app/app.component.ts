import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { registerApplication } from 'single-spa';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  ngOnInit() {
    registerApplication({
      name: 'mfe1',
      // @ts-expect-error
      app: () => import('mfe1/App'),
      activeWhen: `/mfe1`,
    });

    registerApplication({
      name: 'mfe2',
      // @ts-expect-error
      app: () => import('mfe2/App'),
      activeWhen: `/mfe2`,
    });
  }
}
