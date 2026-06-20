import {Routes} from '@angular/router';
import {Home} from './features/home/home';
import {Game} from './features/game/game';
import {Victory} from './features/victory/victory';
import {Failure} from './features/failure/failure';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'game', component: Game},
  {path: 'victory', component: Victory},
  {path: 'failure', component: Failure},
];
