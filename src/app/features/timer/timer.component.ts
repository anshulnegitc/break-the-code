import {Component, inject, computed} from '@angular/core';
import {TimerService} from './timer.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  templateUrl: './timer.component.html'
})
export class TimerComponent {
  service = inject(TimerService);
  
  colorClass = computed(() => {
    const time = this.service.remainingTime();
    if (time < 10) return 'text-red-500';
    if (time < 20) return 'text-yellow-400';
    return 'text-white';
  });
}
