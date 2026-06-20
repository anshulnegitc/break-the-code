import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class TimerService {
  remainingTime = signal(60);
  private timerId?: ReturnType<typeof setInterval>;
  private readonly levels = [60, 55, 50, 45, 40];

  start(durationSeconds: number): void {
    this.remainingTime.set(durationSeconds);
    this.stop();
    this.timerId = setInterval(() => {
      this.remainingTime.update(t => {
        if (t <= 0) {
          this.stop();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }

  stop(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = undefined;
    }
  }
}
