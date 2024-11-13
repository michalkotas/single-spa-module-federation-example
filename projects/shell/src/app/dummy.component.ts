import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dummy',
  standalone: true,
  imports: [RouterModule],
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DummyComponent {}
