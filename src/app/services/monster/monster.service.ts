import {Injectable} from '@angular/core';
import {MonsterInterface} from "../../interfaces/monster/monster.interface";
import {MONSTER_LIST} from "../../_CONST/_MONSTERS";
import {filter, map, Observable, of} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class MonsterService {

	private monsters: MonsterInterface[] = MONSTER_LIST;

	public getMonster(monsterNumber: number): Observable<MonsterInterface> {
		return of(this.monsters).pipe(
			map((monsters) => monsters.filter((monster) => monster.number === monsterNumber)),
			filter((monsters) => monsters.length > 0),
			map(monsters => monsters[0])
		)
	}

// write a function that takes a monster number and a damage number and reduces the monster health with the damage
	public damageMonster(monsterNumber: number, damage: number): Observable<MonsterInterface> {
		return of(this.monsters).pipe(
			map((monsters) => monsters.filter((monster) => monster.number === monsterNumber)),
			filter((monsters) => monsters.length > 0),
			map(monsters => monsters[0]),
			map((monster) => {
				monster.health -= damage;
				return monster;
			})
		)
	}
}
