import {Component, ChangeDetectionStrategy, inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SoundService} from '../../core/sound.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html'
})
export class Home implements OnInit {
  private sound = inject(SoundService);
  private router = inject(Router);
  
  ngOnInit() {
    this.sound.playRadioStatic();
  }

  startMission() {
    this.sound.playConfirmationBeep();
    this.router.navigate(['/game']);
  }
}
