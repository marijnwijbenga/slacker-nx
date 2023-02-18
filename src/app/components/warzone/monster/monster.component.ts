import {Component, Input, OnInit} from '@angular/core';
import {MonsterService} from "../../../services/monster/monster.service";
import {catchError, throwError} from "rxjs";
import {MonsterInterface} from "../../../interfaces/monster/monster.interface";
import {PlayerInterface} from "../../../interfaces/player/player.interface";
import {WeaponInterface} from "../../../interfaces/weapon/weapon.interface";

@Component({
	selector: 'sl-monster',
	templateUrl: './monster.component.html',
	styleUrls: ['./monster.component.scss'],
})
export class MonsterComponent implements OnInit {

	@Input() player!: PlayerInterface;
	@Input() weapon!: WeaponInterface;

	constructor(private monsterService: MonsterService) {
	}

	public monster!: MonsterInterface;
	public error?: string;
	public loading?: boolean;

	ngOnInit(): void {
		this.getMonster(1);
	}

	onDamageToMonster($event: number) {
		console.log($event)
	}

	public getMonster(monsterNumber: number) {
		this.monsterService.getMonster(monsterNumber).pipe(
			catchError((error) => {
				this.error = error;
				return throwError(error);
			}),
		).subscribe({
			next: (monster: MonsterInterface) => {
				this.monster = monster;
				this.loading = false
			},
			error: (error) => {
				this.error = error;
			},
		})
	}

}
