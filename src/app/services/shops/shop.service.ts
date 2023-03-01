import {Injectable} from "@angular/core";
import {_SHOPS} from "../../_CONST/_SHOPS";
import {ShopItemInterface} from "../../interfaces/shop/shop-item.interface";
import {map, Observable, of, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class ShopService {

	private shops: ShopItemInterface[] = _SHOPS;

	public getShops(): Observable<ShopItemInterface[]> {
		return of(this.shops);
	}

	public getShop(shopId: number): Observable<ShopItemInterface> {
		return this.getShops().pipe(
			map((shops: ShopItemInterface[]) => shops.filter((shop) => shop.id === shopId)[0]),
		)
	}


	public getUnlockedShops(unlockedShops: number[]): Observable<ShopItemInterface[]> {
		return this.getShops().pipe(
			map((shops: ShopItemInterface[]) => shops.filter((shop) => unlockedShops.includes(shop.id)))
		);
	}

	public getLockedShops(unlockedShops: number[]): Observable<ShopItemInterface[]> {
		return this.getShops().pipe(
			map((shops: ShopItemInterface[]) => shops.filter((shop) => !unlockedShops.includes(shop.id))),
		);
	}

	public updateShopQuantity(shopId: number): Observable<number> {
		// get the shop, increase the shop.quantity and return the value
		return this.getShop(shopId).pipe(
			// in here you should build in a feature that if the shop quantity reaches 10, the next shop goes into unlockedShops

			tap((shop: ShopItemInterface) => shop.quantity++),
			map((shop: ShopItemInterface) => shop.quantity)
		)
	}

}