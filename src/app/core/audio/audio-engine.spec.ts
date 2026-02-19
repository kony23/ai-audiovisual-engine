import { describe, expect, it, vi } from 'vitest';
import { AudioEngineService } from './audio-engine';

describe('AudioEngineService', () => {
  it('returns 0 for invalid average ranges', () => {
    const service = new AudioEngineService();
    const average = (service as any).average(new Uint8Array([1, 2, 3]), 2, 2);
    expect(average).toBe(0);
  });

  it('clamps frequency bins to available range', () => {
    const service = new AudioEngineService();
    (service as any).audioContext = { sampleRate: 48000 };

    const low = (service as any).frequencyBinForHz(-10);
    const high = (service as any).frequencyBinForHz(999999);

    expect(low).toBe(0);
    expect(high).toBe(511);
  });

  it('returns 0 spectral flux on first frame and positive value on next frame', () => {
    const service = new AudioEngineService();

    const first = (service as any).calculateSpectralFlux(new Uint8Array([0, 0, 0, 0]));
    const second = (service as any).calculateSpectralFlux(new Uint8Array([255, 255, 255, 255]));

    expect(first).toBe(0);
    expect(second).toBeGreaterThan(0);
    expect(second).toBeLessThanOrEqual(1);
  });

  it('calculates zero crossing rate from time-domain data', () => {
    const service = new AudioEngineService();
    const rate = (service as any).calculateZeroCrossingRate(new Uint8Array([0, 255, 0, 255]));
    expect(rate).toBeCloseTo(1, 5);
  });

  it('returns 0 crest factor when rms is 0', () => {
    const service = new AudioEngineService();
    const crest = (service as any).calculateCrestFactor(new Uint8Array([128, 128, 128]), 0);
    expect(crest).toBe(0);
  });

  it('updates computed metrics from analyser data', () => {
    const service = new AudioEngineService();
    const analyser = {
      getByteFrequencyData: vi.fn((target: Uint8Array) => {
        target.fill(200);
      }),
      getByteTimeDomainData: vi.fn((target: Uint8Array) => {
        for (let i = 0; i < target.length; i++) {
          target[i] = i % 2 === 0 ? 0 : 255;
        }
      }),
    };

    (service as any).analyser = analyser;
    service.update();

    expect(analyser.getByteFrequencyData).toHaveBeenCalledOnce();
    expect(analyser.getByteTimeDomainData).toHaveBeenCalledOnce();
    expect(service.bass()).toBeGreaterThan(0);
    expect(service.rms()).toBeGreaterThan(0);
    expect(service.zcr()).toBeGreaterThan(0);
  });

  it('does not stop stream for file source', () => {
    const service = new AudioEngineService();
    const disconnectSpy = vi.fn();
    const stopStreamSpy = vi.fn();

    (service as any).disconnectCurrentSource = disconnectSpy;
    (service as any).stopStreamTracks = stopStreamSpy;
    service.activeSource.set('file');
    service.stopLiveInput();

    expect(disconnectSpy).not.toHaveBeenCalled();
    expect(stopStreamSpy).not.toHaveBeenCalled();
  });

  it('stops live source and resets state', () => {
    const service = new AudioEngineService();
    const disconnectSpy = vi.fn();
    const stopStreamSpy = vi.fn();

    (service as any).disconnectCurrentSource = disconnectSpy;
    (service as any).stopStreamTracks = stopStreamSpy;
    service.status.set('running');
    service.activeSource.set('microphone');

    service.stopLiveInput();

    expect(disconnectSpy).toHaveBeenCalledOnce();
    expect(stopStreamSpy).toHaveBeenCalledOnce();
    expect(service.status()).toBe('idle');
    expect(service.activeSource()).toBeNull();
  });
});
