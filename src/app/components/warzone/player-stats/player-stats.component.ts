import {Component, Input} from '@angular/core';
import {PlayerInterface} from "../../../interfaces/player/player.interface";
import {ColorsEnum} from "../../../enums/colors.enum";

const PLAYER_MAX_HEALTH = 100;

@Component({
  selector: 'sl-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss'],
})
export class PlayerStatsComponent {
  @Input() public player!: PlayerInterface;
  public ColorsEnum = ColorsEnum;

  public playerMaxHealth: number = PLAYER_MAX_HEALTH;

  // what is a good system for health
  // 1. health is a percentage of max health
  // 2. health is a percentage of current health


}