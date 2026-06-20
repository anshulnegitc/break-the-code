import {Injectable, signal, inject} from '@angular/core';
import {SoundService} from '../../core/sound.service';

export interface RadioMessage {
  speaker: string;
  text: string;
}

@Injectable({providedIn: 'root'})
export class IntelligenceService {
  activeMessage = signal<RadioMessage | null>(null);
  private sound = inject(SoundService);
  
  private readonly missionMessages = [
    { start: "Commander, enemy scouts have entered our waters.", complete: "Scout patrol routes decrypted. Their movements are exposed." },
    { start: "We've intercepted communications from an enemy convoy.", complete: "Convoy routes confirmed. Their destination is known." },
    { start: "Enemy reinforcements have been spotted offshore.", complete: "Reinforcement plans decoded. Their support fleet is compromised." },
    { start: "We've locked onto the enemy flagship's transmission.", complete: "Flagship orders decrypted. Enemy command has been exposed." },
    { start: "The enemy offensive has begun. This is our final opportunity.", complete: "Enemy attack plans disrupted. The sector is secure." }
  ];

  setMessageForMission(missionIndex: number, type: 'start' | 'complete'): void {
    const messages = this.missionMessages[missionIndex];
    if (messages) {
      if (type === 'start') this.sound.playRadioStatic();
      this.setMessage('RADIO INTEL', messages[type]);
    }
  }

  setMessage(speaker: string, text: string): void {
    this.activeMessage.set({ speaker, text });
  }
}
