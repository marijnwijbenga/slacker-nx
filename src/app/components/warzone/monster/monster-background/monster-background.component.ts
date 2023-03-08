import {Component, Input} from '@angular/core';
import {MonsterInterface} from '../../../../interfaces/monster/monster.interface';

@Component({
  selector: 'sl-monster-background',
  templateUrl: './monster-background.component.html',
  styleUrls: ['./monster-background.component.scss'],
})
export class MonsterBackgroundComponent {
  @Input() public monster!: MonsterInterface;
}
