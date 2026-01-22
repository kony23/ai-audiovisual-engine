import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { ThreeEngineService } from '../../core/visual/three-engine';

@Component({
  selector: 'app-visualizer',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [`
    canvas {
      width: 100vw;
      height: 100vh;
      display: block;
      background: black;
    }
  `],
  providers: [ThreeEngineService]
})
export class VisualizerComponent implements AfterViewInit {

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private three: ThreeEngineService) {}

  ngAfterViewInit() {
    this.three.init(this.canvas.nativeElement);
    this.three.animate();
  }
}