import { Route } from '@angular/router';
import {GamePageComponent} from './pages/game-page/game-page.component';

export const appRoutes: Route[] = [
	{
		path: '', component: GamePageComponent
	}
];
