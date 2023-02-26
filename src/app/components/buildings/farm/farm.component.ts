import {Component, Input, OnInit} from '@angular/core';
import {UnitInterface} from "../../../interfaces/units/unit.interface";

@Component({
  selector: 'sl-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
})
export class FarmComponent implements OnInit  {
  @Input() public farmUnits!: UnitInterface[];

  ngOnInit(): void {

    // todo Refactor to const and service to get the units?
    this.farmUnits = [{
        name: 'scarecrow',
        image: 'scarecrow',
        amount: 13,
        cost: 10,
        building: 'farm',
    }]
  }


}
