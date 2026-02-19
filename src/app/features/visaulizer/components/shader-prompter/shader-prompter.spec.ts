import { SimpleChange } from '@angular/core';
import { FormControl } from '@angular/forms';
import { describe, expect, it, vi } from 'vitest';
import { ShaderPrompterComponent } from './shader-prompter';

describe('ShaderPrompterComponent', () => {
  it('disables and enables prompt control based on input state', () => {
    const component = new ShaderPrompterComponent();
    component.promptControl = new FormControl('', { nonNullable: true });

    component.disabled = true;
    component.ngOnChanges({
      disabled: new SimpleChange(false, true, false),
    });
    expect(component.promptControl.disabled).toBe(true);

    component.disabled = false;
    component.ngOnChanges({
      disabled: new SimpleChange(true, false, false),
    });
    expect(component.promptControl.enabled).toBe(true);
  });

  it('emits generate event', () => {
    const component = new ShaderPrompterComponent();
    component.promptControl = new FormControl('', { nonNullable: true });
    const onGenerate = vi.fn();
    component.generate.subscribe(onGenerate);

    component.onGenerate();

    expect(onGenerate).toHaveBeenCalledOnce();
  });

  it('computes generate button state from control and flags', () => {
    const component = new ShaderPrompterComponent();
    component.promptControl = new FormControl('   ', { nonNullable: true });
    component.disabled = false;
    component.isLoading = false;

    expect(component.isGenerateDisabled()).toBe(true);

    component.promptControl.setValue('wave');
    expect(component.isGenerateDisabled()).toBe(false);

    component.isLoading = true;
    expect(component.isGenerateDisabled()).toBe(true);
  });

  it('toggles minimized flag', () => {
    const component = new ShaderPrompterComponent();
    component.promptControl = new FormControl('', { nonNullable: true });

    expect(component.isMinimized).toBe(true);
    component.toggleMinimized();
    expect(component.isMinimized).toBe(false);
  });
});
