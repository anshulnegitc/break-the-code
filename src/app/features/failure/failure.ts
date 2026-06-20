import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-failure',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './failure.html',
})
export class Failure {}
