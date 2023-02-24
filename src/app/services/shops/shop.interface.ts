import {Injectable} from "@angular/core";
import {SHOPS} from "../../_CONST/_SHOPS";
import {ShopItemInterface} from "../../interfaces/shop/shop-item.interface";
import {map, Observable, of, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class ShopService {

	private shops: ShopItemInterface[] = SHOPS;

	public getShops(): Observable<ShopItemInterface[]> {
		return of(this.shops);
	}

	public getUnlockedShops(unlockedShops: number[]): Observable<ShopItemInterface[]> {
		return this.getShops().pipe(
			map((shops: ShopItemInterface[]) => shops.filter((shop) => unlockedShops.includes(shop.id)))
		);
	}


	public getLockedShops(unlockedShops: number[]): Observable<ShopItemInterface[]> {
		return this.getShops().pipe(
			map((shops: ShopItemInterface[]) => shops.filter((shop) => !unlockedShops.includes(shop.id))),
			tap((shops: ShopItemInterface[]) => console.log(shops, 'locked shops'))
		);
	}

}