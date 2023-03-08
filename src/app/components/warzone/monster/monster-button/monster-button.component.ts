import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MonsterInterface} from "../../../../interfaces/monster/monster.interface";

@Component({
  selector: 'sl-monster-button',
  templateUrl: './monster-button.component.html',
  styleUrls: ['./monster-button.component.scss'],
})
export class MonsterButtonComponent {
  @Input() monster!: MonsterInterface;
  @Input() playerWeaponDamage!: number;
  @Output() damageToMonster: EventEmitter<number> = new EventEmitter<number>();
  @Output() goldDropped: EventEmitter<number | null> = new EventEmitter<number | null>();


}
