import {Injectable} from '@angular/core';
import {BuildingInterface} from '../../interfaces/building/building.interface';
import {map, Observable, of} from 'rxjs';
import {_BUILDINGS} from '../../_CONST/_BUILDINGS';

@Injectable({providedIn: 'root'})

export class BuildingsService {

	public buildings: BuildingInterface[] = _BUILDINGS;

	public getBuildings(): Observable<BuildingInterface[]> {
		return of(this.buildings);
	}

	public getBuildingByName(buildingName: string): Observable<BuildingInterface> {
		return of(this.buildings).pipe(
			map((buildings: BuildingInterface[]) => buildings.filter((building) => building.name === buildingName)[0])
		)
	}
}