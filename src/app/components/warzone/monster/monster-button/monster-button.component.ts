import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewContainerRef
} from '@angular/core';
import {MonsterInterface} from "../../../../interfaces/monster/monster.interface";
import {tap, timer} from "rxjs";
import {BubbleComponent} from "../../bubble/bubble.component";
import {BubbleService} from "../../../../services/bubble/bubble.service";

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

  constructor (
      private bubbleService: BubbleService,
      private viewContainerRef: ViewContainerRef,
      ) {}

  public onClick(event: MouseEvent): void {
    this.buttonClicked = true;
    this.onDamageToMonster(this.playerWeaponDamage);
    timer(90).pipe(tap(() => this.buttonClicked = false)).subscribe();
    this.onShowBubble(event, this.playerWeaponDamage);
  }

  public onDamageToMonster(value: number) {
    this.damageToMonster.emit(value);
  }

  public onShowBubble(event: MouseEvent, weaponDamage: number): void {
    this.bubbleService.onShowBubble(event, weaponDamage, '- ', this.viewContainerRef);
  }
}
