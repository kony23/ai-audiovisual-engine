import { Injectable, signal, computed } from '@angular/core';
import { AudioMetrics } from './audio-metrics.model';

type AudioStatus = 'idle' | 'running' | 'error';

@Injectable({ providedIn: 'root' })
export class AudioEngineService {
  // --- private Web Audio ---
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: AudioNode | null = null;
  private mediaElement: HTMLAudioElement | null = null;

  private readonly fftSize = 1024;
  private readonly frequencyData = new Uint8Array(this.fftSize / 2);
  private readonly timeData = new Uint8Array(this.fftSize);
  private readonly previousSpectrum = new Float32Array(this.fftSize / 2);
  private hasPreviousSpectrum = false;

  // --- state ---
  readonly status = signal<AudioStatus>('idle');

  private readonly rawMetrics = signal<AudioMetrics>({
    rms: 0,
    bass: 0,
    lowMid: 0,
    mid: 0,
    presence: 0,
    treble: 0,
    spectralCentroid: 0,
    spectralFlux: 0,
    zcr: 0,
    crest: 0,
  });

  // --- public computed signals ---
  readonly rms = computed(() => this.rawMetrics().rms);
  readonly bass = computed(() => this.rawMetrics().bass);
  readonly lowMid = computed(() => this.rawMetrics().lowMid);
  readonly mid = computed(() => this.rawMetrics().mid);
  readonly presence = computed(() => this.rawMetrics().presence);
  readonly treble = computed(() => this.rawMetrics().treble);
  readonly spectralCentroid = computed(() => this.rawMetrics().spectralCentroid);
  readonly spectralFlux = computed(() => this.rawMetrics().spectralFlux);
  readonly zcr = computed(() => this.rawMetrics().zcr);
  readonly crest = computed(() => this.rawMetrics().crest);

  readonly energy = computed(() =>
    (this.bass() * 0.4 + this.mid() * 0.3 + this.presence() * 0.2 + this.treble() * 0.1)
  );

  // --- init from microphone ---
  async initMicrophone(): Promise<void> {
    try {
      this.audioContext = new AudioContext();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.source = this.audioContext.createMediaStreamSource(stream);

      this.setupAnalyser();
      this.source.connect(this.analyser!);

      this.status.set('running');
    } catch {
      this.status.set('error');
    }
  }

  // --- init from <audio> element ---
  async initFromAudioElement(element: HTMLAudioElement): Promise<void> {
    try {
      if (!this.audioContext) {
        this.audioContext = new AudioContext();
      }

      if (this.mediaElement !== element) {
        this.source?.disconnect();
        this.analyser?.disconnect();

        this.source = this.audioContext.createMediaElementSource(element);
        this.mediaElement = element;

        this.setupAnalyser();
        this.source.connect(this.analyser!);
        this.analyser!.connect(this.audioContext.destination);
      }

      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      this.status.set('running');
    } catch {
      this.status.set('error');
    }
  }

  // --- main update loop (called from render loop) ---
  update(): void {
    if (!this.analyser) return;

    this.analyser.getByteFrequencyData(this.frequencyData);
    this.analyser.getByteTimeDomainData(this.timeData);

    this.rawMetrics.set(this.calculateMetrics());
  }

  // --- helpers ---
  private setupAnalyser(): void {
    this.analyser = this.audioContext!.createAnalyser();
    this.analyser.fftSize = this.fftSize;
    this.analyser.smoothingTimeConstant = 0.8;
  }

  private calculateMetrics(): AudioMetrics {
    const freq = this.frequencyData;

    const bassRange = this.averageByHz(freq, 20, 140);
    const lowMidRange = this.averageByHz(freq, 140, 400);
    const midRange = this.averageByHz(freq, 400, 2000);
    const presenceRange = this.averageByHz(freq, 2000, 6000);
    const trebleRange = this.averageByHz(freq, 6000, 16000);

    const rms = this.calculateRMS(this.timeData);
    const spectralCentroid = this.calculateSpectralCentroid(freq);
    const spectralFlux = this.calculateSpectralFlux(freq);
    const zcr = this.calculateZeroCrossingRate(this.timeData);
    const crest = this.calculateCrestFactor(this.timeData, rms);

    return {
      rms,
      bass: bassRange,
      lowMid: lowMidRange,
      mid: midRange,
      presence: presenceRange,
      treble: trebleRange,
      spectralCentroid,
      spectralFlux,
      zcr,
      crest,
    };
  }

  private average(data: Uint8Array, start: number, end: number): number {
    if (end <= start) return 0;

    let sum = 0;
    for (let i = start; i < end; i++) sum += data[i];
    return (sum / (end - start)) / 255;
  }

  private averageByHz(data: Uint8Array, lowHz: number, highHz: number): number {
    const start = this.frequencyBinForHz(lowHz);
    const endExclusive = Math.min(data.length, this.frequencyBinForHz(highHz) + 1);
    return this.average(data, start, endExclusive);
  }

  private frequencyBinForHz(hz: number): number {
    const sampleRate = this.audioContext?.sampleRate ?? 44100;
    const binHz = sampleRate / this.fftSize;
    const bin = Math.floor(hz / binHz);
    return Math.max(0, Math.min(this.frequencyData.length - 1, bin));
  }

  private calculateRMS(data: Uint8Array): number {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    return Math.sqrt(sum / data.length);
  }

  private calculateSpectralCentroid(data: Uint8Array): number {
    let weightedSum = 0;
    let total = 0;

    for (let i = 0; i < data.length; i++) {
      const v = data[i] / 255;
      weightedSum += i * v;
      total += v;
    }

    if (total <= 0.00001) return 0;
    return (weightedSum / total) / (data.length - 1);
  }

  private calculateSpectralFlux(data: Uint8Array): number {
    let flux = 0;

    for (let i = 0; i < data.length; i++) {
      const current = data[i] / 255;
      const delta = current - this.previousSpectrum[i];
      if (delta > 0) flux += delta;
      this.previousSpectrum[i] = current;
    }

    if (!this.hasPreviousSpectrum) {
      this.hasPreviousSpectrum = true;
      return 0;
    }

    return Math.min(1, flux / data.length * 6.0);
  }

  private calculateZeroCrossingRate(data: Uint8Array): number {
    let zeroCrossings = 0;
    let previousSign = ((data[0] - 128) >= 0) ? 1 : -1;

    for (let i = 1; i < data.length; i++) {
      const currentSign = ((data[i] - 128) >= 0) ? 1 : -1;
      if (currentSign !== previousSign) {
        zeroCrossings++;
      }
      previousSign = currentSign;
    }

    return zeroCrossings / (data.length - 1);
  }

  private calculateCrestFactor(data: Uint8Array, rms: number): number {
    let peak = 0;

    for (let i = 0; i < data.length; i++) {
      const v = Math.abs((data[i] - 128) / 128);
      if (v > peak) peak = v;
    }

    if (rms <= 0.00001) return 0;

    const crest = peak / rms;
    return Math.min(1, Math.max(0, (crest - 1) / 9));
  }
}
