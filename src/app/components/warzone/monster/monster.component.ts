import {Component, Input, OnInit} from '@angular/core';
import {MonsterService} from '../../../services/monster/monster.service';
import {catchError, throwError} from 'rxjs';
import {MonsterInterface} from '../../../interfaces/monster/monster.interface';
import {PlayerInterface} from '../../../interfaces/player/player.interface';
import {WeaponInterface} from '../../../interfaces/weapon/weapon.interface';

@Component({
	selector: 'sl-monster',
	templateUrl: './monster.component.html',
	styleUrls: ['./monster.component.scss'],
})
export class MonsterComponent implements OnInit {

	@Input() player!: PlayerInterface;
	@Input() weapon!: WeaponInterface;
	@Input() activeMonster!: number;

	constructor(private monsterService: MonsterService) {
	}

	public monster!: MonsterInterface;
	public monsterTotalHealth!: number;
	public error?: string;
	public loading?: boolean;

	ngOnInit(): void {
		this.getMonster(this.activeMonster);
	}

	public onDamageToMonster($event: number): void {
		this.monsterService.damageMonster(this.monster.number, $event).pipe(
			catchError((error) => {
					this.error = error;
					return throwError(error);
				}
			)).subscribe();
	}

	public onGoldDropped($event: number | null): void {
		//  TODO: Add gold to player through service?
		if($event) {
			this.player.gold += $event;
		}

	}

	public getMonster(monsterNumber: number): void {
		this.monsterService.getMonster(monsterNumber).pipe(
			catchError((error) => {
				this.error = error;
				return throwError(error);
			}),
		).subscribe({
			next: (monster: MonsterInterface) => {
				this.monster = monster;
				this.monsterTotalHealth = monster.health;
				this.loading = false
			},
			error: (error) => {
				this.error = error;
			},
		})
	}

}
