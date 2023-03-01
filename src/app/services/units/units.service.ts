import {Injectable} from '@angular/core';


import {UnitInterface} from '../../interfaces/units/unit.interface';
import {map, Observable, of, tap} from "rxjs";
import {_UNITS} from "../../_CONST/_UNITS";

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  public units: UnitInterface[] = _UNITS;

  public getUnit(id: number, building: string): Observable<UnitInterface> {
    return of(this.units).pipe(
        map((units) => {
          return units.filter((unit) => unit.id === id && unit.building === building)[0]
        }),
    );
  }

  public getUnits(): Observable<UnitInterface[]> {
    return of(this.units);
  }


  // map((shops: ShopItemInterface[]) => shops.filter((shop) => unlockedShops.includes(shop.id)))

  public getUnlockedUnits(unlockedUnits: number[]): Observable<UnitInterface[]> {
    return this.getUnits().pipe(
        map((units: UnitInterface[]) => units.filter((unit) => unlockedUnits.includes(unit.id))),
    )
  }

  public updateUnit(unit: { id: number, building: string }): Observable<number> {
    return this.getUnit(unit.id, unit.building).pipe(
        tap((unit) => unit.quantity++),
        map((unit) => unit.quantity),
    )
  }


}
