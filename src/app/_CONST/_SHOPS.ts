import {ShopInterface} from "../interfaces/shop/shop.interface";
import {BuildingsEnum} from "../enums/buildings.enum";

export const _SHOPS: ShopInterface[] = [
	{
		id: 1,
		name: BuildingsEnum.farm,
		price: 100,
		image: 'farm',
		description: 'Your first line of defense',
		quantity: 0,
	},
	{
		id: 2,
		name: BuildingsEnum.barracks,
		price: 500,
		image: 'barracks',
		description: 'Your second line of defense',
		quantity: 0,
	},
]