import { Injectable, signal, computed } from '@angular/core';

type AudioStatus = 'idle' | 'running' | 'error';

interface AudioMetrics {
  rms: number;        // ogólna głośność
  bass: number;       // niskie częstotliwości
  mid: number;
  treble: number;
}

@Injectable({ providedIn: 'root' })
export class AudioEngineService {
  // --- private Web Audio ---
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private source: AudioNode | null = null;

  private readonly fftSize = 1024;
  private readonly frequencyData = new Uint8Array(this.fftSize / 2);
  private readonly timeData = new Uint8Array(this.fftSize);

  // --- state ---
  readonly status = signal<AudioStatus>('idle');

  private readonly rawMetrics = signal<AudioMetrics>({
    rms: 0,
    bass: 0,
    mid: 0,
    treble: 0,
  });

  // --- public computed signals ---
  readonly rms = computed(() => this.rawMetrics().rms);
  readonly bass = computed(() => this.rawMetrics().bass);
  readonly mid = computed(() => this.rawMetrics().mid);
  readonly treble = computed(() => this.rawMetrics().treble);

  readonly energy = computed(() =>
    (this.bass() * 0.5 + this.mid() * 0.3 + this.treble() * 0.2)
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
  initFromAudioElement(element: HTMLAudioElement): void {
    this.audioContext = new AudioContext();
    this.source = this.audioContext.createMediaElementSource(element);

    this.setupAnalyser();
    this.source.connect(this.analyser!);
    this.analyser!.connect(this.audioContext.destination);

    this.status.set('running');
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

    const bassRange = this.average(freq, 0, 10);
    const midRange = this.average(freq, 10, 40);
    const trebleRange = this.average(freq, 40, freq.length);

    const rms = this.calculateRMS(this.timeData);

    return {
      rms,
      bass: bassRange,
      mid: midRange,
      treble: trebleRange,
    };
  }

  private average(data: Uint8Array, start: number, end: number): number {
    let sum = 0;
    for (let i = start; i < end; i++) sum += data[i];
    return (sum / (end - start)) / 255;
  }

  private calculateRMS(data: Uint8Array): number {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      const v = (data[i] - 128) / 128;
      sum += v * v;
    }
    return Math.sqrt(sum / data.length);
  }
}
