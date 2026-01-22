import { Component, signal } from '@angular/core';
import { VisualizerComponent } from './features/visaulizer/visaulizer';

@Component({
  selector: 'app-root',
  imports: [VisualizerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ai-audiovisual-engine');
}
