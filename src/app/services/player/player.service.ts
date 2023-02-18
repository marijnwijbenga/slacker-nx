import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {PlayerInterface} from "../../interfaces/player/player.interface";
import {PLAYER} from "../../_CONST/PLAYER";

@Injectable({
	providedIn: 'root',
})

export class PlayerService {
	private player: PlayerInterface = PLAYER;

	public getPlayer(): Observable<PlayerInterface> {
		return of(this.player);
	}

}