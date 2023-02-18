import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player/player.service";
import {Observable, of} from "rxjs";
import {PlayerInterface} from "../../interfaces/player/player.interface";
import {WeaponService} from "../../services/weapon/weapon.service";
import {WeaponInterface} from "../../interfaces/weapon/weapon.interface";

@Component({
	selector: 'sl-game-page',
	templateUrl: './game-page.component.html',
	styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {

public player!: PlayerInterface;
public weapon!: WeaponInterface;

	constructor(private playerService: PlayerService, private weaponService: WeaponService) {
	}

	ngOnInit(): void {
		this.getPlayer();
		this.getWeapon();
	}

	public getPlayer(): void {
		this.playerService.getPlayer().subscribe({
			next: (player: PlayerInterface) => {
				this.player = player
			}
		})
	}

	public getWeapon(): void {
		this.weaponService.getWeapon(this.player.weapon).subscribe({
			next: (weapon: WeaponInterface) => {
				this.weapon = weapon;
			}
		})
	}

}


