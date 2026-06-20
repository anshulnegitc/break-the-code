import {Component, output} from '@angular/core';

@Component({
  selector: 'app-victory',
  standalone: true,
  templateUrl: './victory.component.html'
})
export class VictoryComponent {
  playAgain = output<void>();
}
