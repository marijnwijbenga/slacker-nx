import {Injectable} from '@angular/core';
import {_SHOPS} from '../../_CONST/_SHOPS';
import {ShopInterface} from '../../interfaces/shop/shop.interface';
import {map, Observable, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShopService {

	private shops: ShopInterface[] = _SHOPS;

	public getShops(): Observable<ShopInterface[]> {
		return of(this.shops);
	}

	public getShop(shopId: number): Observable<ShopInterface> {
		return this.getShops().pipe(
			map((shops: ShopInterface[]) => shops.filter((shop) => shop.id === shopId)[0]),
		)
	}


	public getUnlockedShops(unlockedShops: number[]): Observable<ShopInterface[]> {
		return this.getShops().pipe(
			map((shops: ShopInterface[]) => shops.filter((shop) => unlockedShops.includes(shop.id)))
		);
	}

	public getLockedShops(unlockedShops: number[]): Observable<ShopInterface[]> {
		return this.getShops().pipe(
			map((shops: ShopInterface[]) => shops.filter((shop) => !unlockedShops.includes(shop.id))),
		);
	}

	public updateShopQuantity(shopId: number): Observable<number> {
		// get the shop, increase the shop.quantity and return the value
		return this.getShop(shopId).pipe(
			// in here you should build in a feature that if the shop quantity reaches 10, the next shop goes into unlockedShops

			tap((shop: ShopInterface) => shop.quantity++),
			map((shop: ShopInterface) => shop.quantity)
		)
	}

}