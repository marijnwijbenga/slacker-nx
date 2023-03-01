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
import { IconComponent } from './components/common/icon/icon.component';
import { ShopListComponent } from './components/shop/shop-list/shop-list.component';
import { ShopItemComponent } from './components/shop/shop-item/shop-item.component';
import { BuildingItemComponent } from './components/buildings/building-item/building-item.component';
import { BuildingListComponent } from './components/buildings/building-list/building-list.component';
import { UnitListComponent } from './components/buildings/units/unit-list/unit-list.component';
import { UnitItemComponent } from './components/buildings/units/unit-item/unit-item.component';
import { FarmComponent } from './components/buildings/farm/farm.component';
import { ArmyUnitComponent } from './components/warzone/army/army-unit/army-unit.component';

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
    IconComponent,
    ShopListComponent,
    ShopItemComponent,
    BuildingItemComponent,
    BuildingListComponent,
    UnitListComponent,
    UnitItemComponent,
    FarmComponent,
    ArmyUnitComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
