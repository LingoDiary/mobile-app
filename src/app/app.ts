import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Viewport} from './components/viewport/viewport';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Viewport],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app');
}
