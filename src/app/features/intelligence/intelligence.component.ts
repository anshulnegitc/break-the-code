import {Component, inject, signal, effect} from '@angular/core';
import {IntelligenceService} from './intelligence.service';

@Component({
  selector: 'app-intelligence',
  standalone: true,
  templateUrl: './intelligence.component.html'
})
export class IntelligenceComponent {
  service = inject(IntelligenceService);
  displayedText = signal('');

  constructor() {
    effect(() => {
      const msg = this.service.activeMessage();
      if (msg) {
        this.typewriterEffect(msg.text);
      }
    });
  }

  typewriterEffect(text: string) {
    this.displayedText.set('');
    let i = 0;
    const interval = setInterval(() => {
      this.displayedText.update(t => t + text.charAt(i));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 30);
  }
}
