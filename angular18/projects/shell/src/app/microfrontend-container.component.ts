import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-microfrontend-container',
  host: {'id': 'microfrontend-container'},
  standalone: true,
  imports: [RouterModule],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MicrofrontendContainerComponent {}
