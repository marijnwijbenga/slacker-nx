import {Component, Input} from '@angular/core';
import {UnitInterface} from "../../../../interfaces/units/unit.interface";

@Component({
  selector: 'sl-unit-item',
  templateUrl: './unit-item.component.html',
  styleUrls: ['./unit-item.component.scss'],
})
export class UnitItemComponent {
  @Input() public unit!: UnitInterface;
}
