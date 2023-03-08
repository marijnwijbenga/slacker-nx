import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {UnitInterface} from '../../../../interfaces/units/unit.interface';

@Component({
  selector: 'sl-army-unit',
  templateUrl: './army-unit.component.html',
  styleUrls: ['./army-unit.component.scss'],
})
export class ArmyUnitComponent {

	@ViewChild('unitIcon') unitIcon!: ElementRef;

	@Input() public armyUnit!: UnitInterface;
	public _ARMY_ICON_PATH = '/assets/images/buildings/farm/units/icons/';


}
