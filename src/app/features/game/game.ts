import {Component, ChangeDetectionStrategy, AfterViewInit, ElementRef, viewChild, OnDestroy, inject, effect, signal, computed} from '@angular/core';
import {GameEngine} from '../../canvas/game-engine';
import {PuzzleComponent} from '../puzzle/puzzle.component';
import {PuzzleService} from '../puzzle/puzzle.service';
import {TimerService} from '../timer/timer.service';
import {IntelligenceComponent} from '../intelligence/intelligence.component';
import {IntelligenceService} from '../intelligence/intelligence.service';
import {VictoryComponent} from '../victory/victory.component';
import {MissionBriefingOverlayComponent} from '../mission-briefing-overlay/mission-briefing-overlay';
import {SoundService} from '../../core/sound.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [PuzzleComponent, IntelligenceComponent, VictoryComponent, MissionBriefingOverlayComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,                
  templateUrl: './game.html',
})
export class Game implements AfterViewInit, OnDestroy {
  canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private engine?: GameEngine;
  private resizeObserver?: ResizeObserver;
  puzzleService = inject(PuzzleService);
  timerService = inject(TimerService);
  intelligenceService = inject(IntelligenceService);
  sound = inject(SoundService);
  gameOverMessage = signal('');
  lives = signal(3);
  isVictory = signal(false);
  showBriefing = signal(true);
  
  getTimerColorClass = computed(() => {
    const time = this.timerService.remainingTime();
    if (time < 10) return 'text-red-500';
    if (time < 20) return 'text-yellow-400';
    return 'text-white';
  });

  constructor() {
    effect(() => {
        if (this.timerService.remainingTime() === 0 && !this.gameOverMessage() && !this.isVictory()) {
            this.onLose('Time expired!');
        }
    });
  }

  ngAfterViewInit() {
    const canvas = this.canvas()?.nativeElement;
    if (canvas) {
        this.engine = new GameEngine(canvas, (msg) => this.onLose(msg), this.sound);
        // Don't start engine immediately, it's started on briefing completion
        // But need to initialize it for resize
        this.resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => {
                if (this.engine) this.engine.resize();
            });
        });
        this.resizeObserver.observe(canvas.parentElement!);
    }
  }

  private initGame() {
    this.engine?.start();
    this.timerService.start(this.puzzleService.getCurrentMission().timer);
  }

  onBriefingComplete() {
    this.showBriefing.set(false);
    this.intelligenceService.setMessageForMission(this.puzzleService.currentPuzzleIndex(), 'start');
    this.initGame();
  }

  onLose(message: string) {
    this.gameOverMessage.set('GAME OVER: ' + message);
    this.sound.playCommLostTone();
    this.intelligenceService.setMessage('COMMAND', 'Enemy forces have breached the defense line.');
    this.engine?.stop();
    this.timerService.stop();
  }

  onWin() {
    this.isVictory.set(true);
    this.sound.playSuccessChime();
    this.intelligenceService.setMessage('FLEET COMMAND', 'Fleet secured. Excellent work.');
    this.engine?.stop();
    this.timerService.stop();
  }
  
  resetGame() {
    this.gameOverMessage.set('');
    this.isVictory.set(false);
    this.showBriefing.set(false);
    this.lives.set(3);

    this.puzzleService.currentPuzzleIndex.set(0);
    this.puzzleService.isSolved.set(false);
    this.timerService.stop();
    
    this.engine?.stop();
    this.engine?.setLevel(0);
    if (this.engine) {
      this.engine.isGameOver = false;
      this.engine.gameOverMessage = '';
    }
    this.initGame();
    this.intelligenceService.setMessageForMission(0, 'start');
  }

  onPuzzleSolved() {
    document.body.style.cursor = 'wait';
    this.intelligenceService.setMessageForMission(this.puzzleService.currentPuzzleIndex(), 'complete');
    
    // Check if we are finished with all missions
    if (this.puzzleService.currentPuzzleIndex() >= this.puzzleService.totalMissions - 1) {
      setTimeout(() => {
        this.intelligenceService.setMessage('FLEET COMMAND', 'Excellent work. Enemy communications compromised.');
        document.body.style.cursor = 'default';
      }, 1500);
      setTimeout(() => this.onWin(), 3000);
      return;
    }
    
    setTimeout(() => {
        this.puzzleService.nextMission();
        this.intelligenceService.setMessageForMission(this.puzzleService.currentPuzzleIndex(), 'start');
        document.body.style.cursor = 'default';
    }, 2000);
    
    this.timerService.start(this.puzzleService.getCurrentMission().timer);
    this.engine?.setLevel(this.puzzleService.currentPuzzleIndex());
  }

  onPuzzleFailed() {
    this.lives.update(l => l - 1);
    this.intelligenceService.setMessage('COMMAND', 'Incorrect answer. Intelligence compromise.');
    if (this.lives() === 0) {
        this.onLose('Fleet destroyed.');
    }
  }

  // updateRadioForPuzzle removed

  ngOnDestroy() {
    this.engine?.stop();
    this.timerService.stop();
    this.resizeObserver?.disconnect();
  }
}
