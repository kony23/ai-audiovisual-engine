import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  DEFAULT_SHADER_CONTROL_STATE,
  ShaderControlState,
} from '../../../../core/visual/shader-control.model';

type ShaderControlKey = keyof ShaderControlState;

interface SliderConfig {
  key: ShaderControlKey;
  label: string;
  min: number;
  max: number;
  step: number;
}

@Component({
  selector: 'app-shader-control-panel',
  templateUrl: './shader-control-panel.html',
  styleUrl: './shader-control-panel.css',
})
export class ShaderControlPanelComponent {
  @Input({ required: true }) controls!: ShaderControlState;
  @Output() readonly controlsChange = new EventEmitter<ShaderControlState>();

  isMinimized = true;

  readonly sliderConfigs: readonly SliderConfig[] = [
    { key: 'timeSpeed', label: 'Time speed', min: 0.1, max: 3, step: 0.05 },
    { key: 'reactivity', label: 'Global reactivity', min: 0, max: 3, step: 0.05 },
    { key: 'energyGain', label: 'Energy gain', min: 0, max: 3, step: 0.05 },
    { key: 'bassGain', label: 'Bass gain', min: 0, max: 3, step: 0.05 },
    { key: 'midGain', label: 'Mid gain', min: 0, max: 3, step: 0.05 },
    { key: 'trebleGain', label: 'Treble gain', min: 0, max: 3, step: 0.05 },
    { key: 'fluxGain', label: 'Detail gain', min: 0, max: 3, step: 0.05 },
  ];

  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
  }

  onReset(): void {
    this.controlsChange.emit({ ...DEFAULT_SHADER_CONTROL_STATE });
  }

  onSliderInput(key: ShaderControlKey, event: Event): void {
    if (!this.controls) {
      return;
    }

    const input = event.target as HTMLInputElement | null;
    if (!input) {
      return;
    }

    const slider = this.sliderConfigs.find((item) => item.key === key);
    if (!slider) {
      return;
    }

    const rawValue = Number(input.value);
    if (Number.isNaN(rawValue)) {
      return;
    }

    const nextValue = this.clamp(rawValue, slider.min, slider.max);
    const nextControls: ShaderControlState = {
      ...this.controls,
      [key]: nextValue,
    };
    this.controlsChange.emit(nextControls);
  }

  readValue(key: ShaderControlKey): number {
    return this.controls?.[key] ?? DEFAULT_SHADER_CONTROL_STATE[key];
  }

  formatValue(value: number): string {
    return value.toFixed(2);
  }

  private clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, value));
  }
}
