import {Injectable} from '@angular/core';
import {map, Observable} from 'rxjs';
import {MonsterService} from '../monster/monster.service';
import {MonsterInterface} from '../../interfaces/monster/monster.interface';
import {_MODIFIERS} from '../../_CONST/_MODIFIERS';

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
					if (Math.random() < _MODIFIERS.GOLD_DROP_CHANCE_PERCENTAGE) {
						if (Math.random() > _MODIFIERS.GOLD_HIGH_DROP_PERCENTAGE) {
							return Math.floor(Math.random() * (Math.random() * _MODIFIERS.GOLD_HIGH_DROP_MODIFIER) * monster.gold);
						} else {
							return Math.floor(Math.random() * (Math.random() * _MODIFIERS.GOLD_LOW_DROP_MODIFIER) * monster.gold);
						}
					}
					return null;
				}
			))
	}

}
