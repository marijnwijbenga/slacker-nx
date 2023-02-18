import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MonsterInterface} from "../../../../interfaces/monster/monster.interface";
import {tap, timer} from "rxjs";

@Component({
  selector: 'sl-monster-button',
  templateUrl: './monster-button.component.html',
  styleUrls: ['./monster-button.component.scss'],
})
export class MonsterButtonComponent {
  @Input() monster!: MonsterInterface;
  @Input() playerWeaponDamage!: number;
  @Output() damageToMonster: EventEmitter<number> = new EventEmitter<number>();

  public buttonClicked = false;

  onClick() {
    this.buttonClicked = true;
    this.onDamageToMonster(this.playerWeaponDamage);
    timer(90).pipe(tap(() => this.buttonClicked = false)).subscribe();
  }

  public onDamageToMonster(value: number) {
    this.damageToMonster.emit(value);
  }
}
