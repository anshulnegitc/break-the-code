import {Component, ChangeDetectionStrategy, signal, output, OnInit, OnDestroy, inject} from '@angular/core';
import {SoundService} from '../../core/sound.service';

interface Dialogue {
  speaker: string;
  text: string;
}

@Component({
  selector: 'app-mission-briefing-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mission-briefing-overlay.html'
})
export class MissionBriefingOverlayComponent implements OnInit, OnDestroy {
  briefingComplete = output<void>();

  dialogues: Dialogue[] = [
    { speaker: "Radio Operator", text: "Commander, we've intercepted enemy communications." },
    { speaker: "Commander", text: "Enemy fleet movement has been detected." },
    { speaker: "Commander", text: "Their communications are encrypted." },
    { speaker: "Commander", text: "If we break their code, we can predict their movements." },
    { speaker: "Commander", text: "The fleet depends on your intelligence." },
    { speaker: "Commander", text: "Decrypt the message before enemy ships cross the defense line." },
    { speaker: "Commander", text: "Begin the operation." }
  ];

  index = signal(0);
  displayedText = signal('');
  private intervalId: ReturnType<typeof setInterval> | undefined;
  private sound = inject(SoundService);

  currentDialogue = () => this.dialogues[this.index()];
  isLastDialogue = () => this.index() === this.dialogues.length - 1;

  ngOnInit() {
    this.typeText();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  typeText() {
    const fullText = this.currentDialogue().text;
    let i = 0;
    this.displayedText.set('');
    
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      this.displayedText.update(t => t + fullText[i]);
      this.sound.playTypewriterClick();
      i++;
      if (i === fullText.length) clearInterval(this.intervalId);
    }, 40);
  }

  next() {
    if (this.index() < this.dialogues.length - 1) {
      this.index.update(i => i + 1);
      this.typeText();
    } else {
      this.briefingComplete.emit();
    }
  }
}
