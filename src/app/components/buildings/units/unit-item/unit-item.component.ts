import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UnitInterface} from "../../../../interfaces/units/unit.interface";

@Component({
  selector: 'sl-unit-item[unit]',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
})
export class UnitItemComponent {
  @Input() public unit!: UnitInterface;
  @Input() public state!: 'unlocked' | 'disabled';
  @Output() public unitClicked: EventEmitter<{ id: number, cost: number }> = new EventEmitter<{ id: number, cost: number }>();

  public onClick(): void {
    const { id, cost } = this.unit;
    this.unitClicked.emit({ id, cost });
  }
}
