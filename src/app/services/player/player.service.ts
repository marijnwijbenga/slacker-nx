import {Injectable} from "@angular/core";
import {map, Observable, of} from "rxjs";
import {PlayerInterface} from "../../interfaces/player/player.interface";
import {_PLAYER} from "../../_CONST/_PLAYER";

@Injectable({
	providedIn: 'root',
})

export class PlayerService {
	private player: PlayerInterface = _PLAYER;

	public getPlayer(): Observable<PlayerInterface> {
		return of(this.player);
	}

	// write updatePlayer method
	public updatePlayer(player: PlayerInterface): Observable<PlayerInterface> {
		this.player = { ...this.player, ...player }
		return of(this.player);
	}


}