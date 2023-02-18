import {Component, OnInit} from '@angular/core';
import {MonsterService} from "../../../services/monster/monster.service";
import {catchError, throwError} from "rxjs";
import {MonsterInterface} from "../../../interfaces/monster/monster.interface";

@Component({
	selector: 'sl-monster',
	templateUrl: './monster.component.html',
	styleUrls: ['./monster.component.scss'],
})
export class MonsterComponent implements OnInit {

	constructor(private monsterService: MonsterService) {
	}

	public monster!: MonsterInterface;
	public error?: string;
	public loading?: boolean;

	ngOnInit(): void {
		this.monsterService.getMonster(1).pipe(
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
