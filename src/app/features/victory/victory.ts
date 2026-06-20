import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-victory',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="p-8 text-center"><h1 class="text-2xl text-green-600">Victory!</h1></div>`,
})
export class Victory {}
