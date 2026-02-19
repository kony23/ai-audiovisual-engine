import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-shader-prompter',
  imports: [ReactiveFormsModule],
  templateUrl: './shader-prompter.html',
  styleUrl: './shader-prompter.css',
})
export class ShaderPrompterComponent implements OnChanges {
  @Input({ required: true }) promptControl!: FormControl<string>;
  @Input() generationStatus = 'Idle';
  @Input() errorMessage: string | null = null;
  @Input() disabled = false;
  @Input() isLoading = false;
  @Input() generatedActive = false;
  isMinimized = true;

  @Output() readonly generate = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.promptControl) {
      return;
    }

    if (changes['promptControl'] || changes['disabled']) {
      if (this.disabled && this.promptControl.enabled) {
        this.promptControl.disable({ emitEvent: false });
      } else if (!this.disabled && this.promptControl.disabled) {
        this.promptControl.enable({ emitEvent: false });
      }
    }
  }

  onGenerate(): void {
    this.generate.emit();
  }

  isGenerateDisabled(): boolean {
    return this.disabled || this.isLoading || !this.promptControl.value.trim();
  }

  toggleMinimized(): void {
    this.isMinimized = !this.isMinimized;
  }
}
