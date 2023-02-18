import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { CanvasComponent } from './components/layout/canvas/canvas.component';
import { PanelComponent } from './components/layout/panel/panel/panel.component';
import { PlayerStatsComponent } from './components/warzone/player-stats/player-stats.component';
import { MonsterComponent } from './components/warzone/monster/monster.component';
import { BubbleComponent } from './components/warzone/bubble/bubble.component';
import { MonsterBackgroundComponent } from './components/warzone/monster/monster-background/monster-background.component';
import { ProgressBarComponent } from './components/common/progress-bar/progress-bar.component';
import { MonsterButtonComponent } from './components/warzone/monster/monster-button/monster-button.component';
import { ArmyComponent } from './components/warzone/army/army.component';
import { SpellsComponent } from './components/warzone/spells/spells.component';

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    CanvasComponent,
    PanelComponent,
    PlayerStatsComponent,
    MonsterComponent,
    BubbleComponent,
    MonsterBackgroundComponent,
    ProgressBarComponent,
    MonsterButtonComponent,
    ArmyComponent,
    SpellsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
