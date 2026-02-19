import { describe, expect, it, vi } from 'vitest';
import {
  DEFAULT_SHADER_CONTROL_STATE,
  ShaderControlState,
} from '../../../../core/visual/shader-control.model';
import { ShaderControlPanelComponent } from './shader-control-panel';

describe('ShaderControlPanelComponent', () => {
  function createControls(): ShaderControlState {
    return { ...DEFAULT_SHADER_CONTROL_STATE };
  }

  it('emits default controls on reset', () => {
    const component = new ShaderControlPanelComponent();
    component.controls = createControls();
    const emitSpy = vi.fn();
    component.controlsChange.subscribe(emitSpy);

    component.onReset();

    expect(emitSpy).toHaveBeenCalledOnce();
    expect(emitSpy).toHaveBeenCalledWith(DEFAULT_SHADER_CONTROL_STATE);
  });

  it('clamps slider value and emits updated controls', () => {
    const component = new ShaderControlPanelComponent();
    component.controls = createControls();
    const emitSpy = vi.fn();
    component.controlsChange.subscribe(emitSpy);

    component.onSliderInput(
      'bassGain',
      { target: { value: '5' } } as unknown as Event,
    );

    expect(emitSpy).toHaveBeenCalledOnce();
    const next = emitSpy.mock.calls[0]?.[0] as ShaderControlState;
    expect(next.bassGain).toBe(3);
    expect(next.midGain).toBe(component.controls.midGain);
  });

  it('ignores NaN input values', () => {
    const component = new ShaderControlPanelComponent();
    component.controls = createControls();
    const emitSpy = vi.fn();
    component.controlsChange.subscribe(emitSpy);

    component.onSliderInput(
      'midGain',
      { target: { value: 'NaN' } } as unknown as Event,
    );

    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('returns default value when controls are not set', () => {
    const component = new ShaderControlPanelComponent();
    (component as unknown as { controls: ShaderControlState | undefined }).controls = undefined;

    expect(component.readValue('fluxGain')).toBe(DEFAULT_SHADER_CONTROL_STATE.fluxGain);
  });

  it('formats slider values with two decimals', () => {
    const component = new ShaderControlPanelComponent();
    expect(component.formatValue(1.239)).toBe('1.24');
  });

  it('toggles minimized state', () => {
    const component = new ShaderControlPanelComponent();
    expect(component.isMinimized).toBe(true);

    component.toggleMinimized();

    expect(component.isMinimized).toBe(false);
  });
});
