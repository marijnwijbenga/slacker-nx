import {Component, EventEmitter, Input, Output, ViewContainerRef} from '@angular/core';
import {MonsterInterface} from "../../../../interfaces/monster/monster.interface";
import {tap, timer} from "rxjs";
import {BubbleService} from "../../../../services/bubble/bubble.service";
import {LootService} from "../../../../services/loot/loot.service";

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

  public buttonClicked = false;

  constructor (
      private bubbleService: BubbleService,
      private viewContainerRef: ViewContainerRef,
      private lootService: LootService,
      ) {}

  public onClick(event: MouseEvent): void {
    this.buttonClicked = true;
    this.onDamageToMonster(this.playerWeaponDamage);
    timer(90).pipe(tap(() => this.buttonClicked = false)).subscribe();
    this.onShowDamageBubble(event, this.playerWeaponDamage);
    this.onDropGold(this.monster.number, event);

  }

  public onDropGold(monsterNumber: number, event: MouseEvent): void {
    this.lootService.goldDrop(monsterNumber)
        .subscribe((goldDropped: number | null) => {
          if(goldDropped) {
            this.goldDropped.emit(goldDropped);
            this.onShowGoldBubble(event, goldDropped)
          }

    });
  }

  public onDamageToMonster(value: number) {
    this.damageToMonster.emit(value);
  }

  public onShowGoldBubble(event: MouseEvent, goldDropped: number): void {
    this.bubbleService.onShowBubble(
        event,
        goldDropped,
        '',
        this.viewContainerRef,
        0,
        -40,
        'gold',
        3500,
        'ease-out',
    );
  }

  public onShowDamageBubble(event: MouseEvent, weaponDamage: number): void {
    this.bubbleService.onShowBubble(
        event,
        weaponDamage,
        '+ ',
        this.viewContainerRef,
        0,
        40,
        'regular',
        1000,
        'linear'
    );
  }
}
