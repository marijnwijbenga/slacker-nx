import {Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {MonsterService} from "../monster/monster.service";
import {MonsterInterface} from "../../interfaces/monster/monster.interface";

@Injectable({
	providedIn: 'root'
})
export class LootService {

	constructor(private monsterService: MonsterService) {
	}

	public goldDrop(monsterNumber: number): Observable<number | null> {
		return this.monsterService.getMonster(monsterNumber).pipe(
			map((monster: MonsterInterface) => {
					if (monster.gold <= 0) {
						return null;
					}
					if (Math.random() < monster.goldDropChance) {
						if (Math.random() > 0.97) {
							return Math.floor(Math.random() * (Math.random() * 25) * monster.gold);
						} else {
							return Math.floor(Math.random() * (Math.random() * 1.1) * monster.gold);
						}
					}
					return null;
				}
			))
	}

}
