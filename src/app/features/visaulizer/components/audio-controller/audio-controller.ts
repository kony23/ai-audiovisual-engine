import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export interface AudioControllerPreset {
  readonly id: string;
  readonly label: string;
}

@Component({
  selector: 'app-audio-controller',
  imports: [ReactiveFormsModule],
  templateUrl: './audio-controller.html',
  styleUrl: './audio-controller.css',
})
export class AudioControllerComponent {
  @Input({ required: true }) urlControl!: FormControl<string>;
  @Input({ required: true }) isPlaying = false;
  @Input({ required: true }) selectedTrackName: string | null = null;
  @Input({ required: true }) statusLabel = 'Waiting for track';
  @Input({ required: true }) isCollapsed = false;
  @Input({ required: true }) selectedPresetId = '';
  @Input({ required: true }) presets: readonly AudioControllerPreset[] = [];

  @Output() readonly fileSelected = new EventEmitter<Event>();
  @Output() readonly loadUrl = new EventEmitter<void>();
  @Output() readonly togglePlayback = new EventEmitter<void>();
  @Output() readonly stop = new EventEmitter<void>();
  @Output() readonly selectPreset = new EventEmitter<string>();
  @Output() readonly toggleController = new EventEmitter<void>();

  onFileSelected(event: Event): void {
    this.fileSelected.emit(event);
  }

  onLoadUrl(): void {
    this.loadUrl.emit();
  }

  onTogglePlayback(): void {
    this.togglePlayback.emit();
  }

  onStop(): void {
    this.stop.emit();
  }

  onSelectPreset(presetId: string): void {
    this.selectPreset.emit(presetId);
  }

  onToggleController(): void {
    this.toggleController.emit();
  }
}
