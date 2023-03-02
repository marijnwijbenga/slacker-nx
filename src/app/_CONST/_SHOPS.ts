import {ShopItemInterface} from "../interfaces/shop/shop-item.interface";

export const _SHOPS: ShopItemInterface[] = [
	{
		id: 1,
		name: 'Farm',
		price: 100,
		image: 'farm',
		description: 'Your first line of defense',
		quantity: 1,
	},
	{
		id: 2,
		name: 'Barracks',
		price: 500,
		image: 'barracks',
		description: 'Your second line of defense',
		quantity: 0,
	},
]