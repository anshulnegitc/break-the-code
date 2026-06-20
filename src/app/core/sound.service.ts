import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
  }

  private playTone(freq: number, type: OscillatorType, duration: number, vol: number = 0.1) {
    this.init();
    const osc = this.ctx!.createOscillator();
    const gain = this.ctx!.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx!.currentTime);
    gain.gain.setValueAtTime(vol, this.ctx!.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx!.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx!.destination);
    osc.start();
    osc.stop(this.ctx!.currentTime + duration);
  }

  playRadioStatic() {
    this.init();
    const bufferSize = this.ctx!.sampleRate * 0.5; // 0.5 seconds
    const buffer = this.ctx!.createBuffer(1, bufferSize, this.ctx!.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx!.createBufferSource();
    noise.buffer = buffer;
    const gain = this.ctx!.createGain();
    gain.gain.setValueAtTime(0.05, this.ctx!.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx!.currentTime + 0.5);
    noise.connect(gain);
    gain.connect(this.ctx!.destination);
    noise.start();
  }

  playConfirmationBeep() { this.playTone(880, 'sine', 0.2); }
  playErrorBuzz() { this.playTone(150, 'sawtooth', 0.3); }
  playSonarTone() { this.playTone(440, 'sine', 0.5, 0.05); }
  playSuccessChime() {
    this.playTone(523.25, 'sine', 0.3);
    setTimeout(() => this.playTone(783.99, 'sine', 0.5), 200);
  }
  playCommLostTone() {
    this.playTone(400, 'square', 0.5);
    setTimeout(() => this.playTone(200, 'square', 0.8), 300);
  }

  playTypewriterClick() {
    this.playTone(1200 + Math.random() * 200, 'square', 0.05, 0.02);
  }
}
