import {Component, inject, output, signal, effect} from '@angular/core';
import {PuzzleService} from './puzzle.service';
import {SoundService} from '../../core/sound.service';

@Component({
  selector: 'app-puzzle',
  standalone: true,
  templateUrl: './puzzle.component.html'
})
export class PuzzleComponent {
  service = inject(PuzzleService);
  sound = inject(SoundService);
  solved = output<void>();
  failed = output<void>();
  selectedOption = signal<string | number | null>(null);
  isCorrect = signal<boolean | null>(null);

  isLoading = signal<boolean>(false);
  progress = signal<number>(0);

  constructor() {
    effect(() => {
      // Whenever the puzzle index changes, reset the loading state
      this.service.currentPuzzleIndex();
      this.isLoading.set(false);
      this.progress.set(0);
      this.selectedOption.set(null);
      this.isCorrect.set(null);
    });
  }

  selectOption(option: string | number) {
    this.selectedOption.set(option);
    this.isCorrect.set(this.service.checkAnswer(option));

    if (this.isCorrect()) {
      this.sound.playConfirmationBeep();
      setTimeout(() => {
        this.isLoading.set(true);
        const interval = setInterval(() => {
          this.progress.update(p => Math.min(p + 5, 100));
          if (this.progress() >= 100) {
            clearInterval(interval);
            this.solved.emit();
          }
        }, 75); // 1500ms total
      }, 500);
    } else {
      this.sound.playErrorBuzz();
      setTimeout(() => {
        this.failed.emit();
        this.selectedOption.set(null);
        this.isCorrect.set(null);
      }, 500);
    }
  }
}
