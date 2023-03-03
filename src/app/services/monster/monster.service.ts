import {Injectable} from '@angular/core';
import {MonsterInterface} from "../../interfaces/monster/monster.interface";
import {_MONSTER_LIST} from "../../_CONST/_MONSTERS";
import {filter, map, Observable, of} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class MonsterService {

	private monsters: MonsterInterface[] = _MONSTER_LIST;

	public getMonster(monsterNumber: number): Observable<MonsterInterface> {
		return of(this.monsters).pipe(
			map((monsters) => monsters.filter((monster) => monster.number === monsterNumber)),
			filter((monsters) => monsters.length > 0),
			map(monsters => monsters[0])
		)
	}

	public damageMonster(monsterNumber: number, damage: number): Observable<number> {
		return of(this.monsters).pipe(
			map((monsters) => monsters.filter((monster) => monster.number === monsterNumber)),
			filter((monsters) => monsters.length > 0),
			map(monsters => monsters[0]),
			map((monster) => {
				if(monster.health > 0) {
					monster.health -= damage;
					return damage;
				} else {
					monster.health = 0;
					return monster.health;
				}
			})
		)
	}
}
