import {Injectable} from "@angular/core";
import {WeaponInterface} from "../../interfaces/weapon/weapon.interface";
import {WEAPONS} from "../../_CONST/_WEAPONS";
import {filter, map, Observable, of} from "rxjs";

@Injectable({
	providedIn: 'root',
})

export class WeaponService {
	private weapons: WeaponInterface[] = WEAPONS;

	public getWeapon(weaponNumber: number): Observable<WeaponInterface> {
		return of(this.weapons).pipe(
			map((weapons: WeaponInterface[]) => weapons.filter((weapon: WeaponInterface) => weapon.dropsAtLevel === weaponNumber)),
			filter((weapons) => weapons.length > 0),
			map(weapons => weapons[0])
		)
	}

}