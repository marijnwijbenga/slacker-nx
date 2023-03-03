import {Injectable} from '@angular/core';


import {UnitInterface} from '../../interfaces/units/unit.interface';
import {map, Observable, of, tap} from "rxjs";
import {_UNITS} from "../../_CONST/_UNITS";

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  public units: UnitInterface[] = _UNITS;

  public getUnit(id: number): Observable<UnitInterface> {
    return of(this.units).pipe(
        map((units) => {
          return units.filter((unit) => unit && unit.id === id)[0]
        }),
    );
  }

  public getUnits(): Observable<UnitInterface[]> {
    return of(this.units);
  }


  public getUnlockedUnits(unlockedUnits: number[]): Observable<UnitInterface[]> {
    return this.getUnits().pipe(
        map((units: UnitInterface[]) => units.filter((unit) => unlockedUnits.includes(unit.id))),
    )
  }

  public updateUnit(unit: { id: number }): Observable<number> {
    return this.getUnit(unit.id).pipe(
        tap((unit) => unit.quantity++),
        map((unit) => unit.quantity),
    )
  }


}
