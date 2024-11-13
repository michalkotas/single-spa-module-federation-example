import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DummyService } from './dummy.service';

@Component({
  selector: 'mfe3-app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'mfe3';
  private dummyService = inject(DummyService)

  ngOnInit(): void {
    this.dummyService.doNothing()
  }
}