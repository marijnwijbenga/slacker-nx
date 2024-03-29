import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UnitInterface} from "../../../interfaces/units/unit.interface";
import {UnitsService} from "../../../services/units/units.service";
import {BuildingsService} from "../../../services/building/buildings.service";
import {BuildingInterface} from "../../../interfaces/building/building.interface";
import {BuildingsEnum} from "../../../enums/buildings.enum";
import {PlayerInterface} from "../../../interfaces/player/player.interface";

@Component({
  selector: 'sl-farm',
  templateUrl: './farm.component.html',
  styleUrls: ['./farm.component.scss'],
})
export class FarmComponent implements OnInit {

  @Output() public unitClicked: EventEmitter<number> = new EventEmitter<number>();

  @Input() public player!: PlayerInterface;

  public unlockedFarmUnits!: UnitInterface[];
  public farmBuilding!: BuildingInterface;

  constructor(
      private unitsService: UnitsService,
      private buildingService: BuildingsService,
  ) {
  }

  ngOnInit(): void {
    this.getFarmBuilding()
    this.getUnlockedFarmUnits();
  }

  public getFarmBuilding(): void {
    this.buildingService.getBuildingByName(BuildingsEnum.farm).subscribe({
      next: (building: BuildingInterface) => {
        this.farmBuilding = building;
      },
    })
  }

  public getUnlockedFarmUnits(): void {
    this.unitsService.getUnlockedUnits(this.farmBuilding.unlockedUnits).subscribe({
      next: unlockedUnits => this.unlockedFarmUnits = unlockedUnits
    })
  }

  public handleFarmUnitClick($event: { id: number, cost: number }): void {
    const unit: { id: number, cost: number } = $event;
    if(this.player.gold >= unit.cost) {
      this.player.gold -= unit.cost;
      this.unitsService.updateUnit(unit).subscribe();

      // show unit.armyIcon in gamepage
      // update unit quantity
      this.unitClicked.emit(unit.id);

    }
    // update the farm unit quantity by building, unit id and ..
  }

}
