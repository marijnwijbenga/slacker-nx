import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player/player.service";
import {filter, map} from "rxjs";
import {PlayerInterface} from "../../interfaces/player/player.interface";
import {WeaponService} from "../../services/weapon/weapon.service";
import {WeaponInterface} from "../../interfaces/weapon/weapon.interface";
import {ShopService} from "../../services/shops/shop.service";
import {ShopItemInterface} from "../../interfaces/shop/shop-item.interface";
import {BuildingsEnum} from "../../enums/buildings.enum";
import {BuildingsService} from "../../services/building/buildings.service";
import {BuildingInterface} from "../../interfaces/building/building.interface";
import {UnitsService} from "../../services/units/units.service";
import {UnitInterface} from "../../interfaces/units/unit.interface";

@Component({
	selector: 'sl-game-page',
	templateUrl: './game-page.component.html',
	styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {

	public player!: PlayerInterface;
	public weapon!: WeaponInterface;
	public unlockedShops!: ShopItemInterface[];
	public lockedShops!: ShopItemInterface[];
	public hintedShops!: ShopItemInterface[];

	public activeArmyUnits: UnitInterface[] = [];

	readonly BuildingsEnum = BuildingsEnum;


	constructor(
		private playerService: PlayerService,
		private weaponService: WeaponService,
		private shopService: ShopService,
		private buildingService: BuildingsService,
		private unitService: UnitsService,
	) {
	}

	ngOnInit(): void {
		this.getPlayer();
		this.getWeapon();
		this.getUnlockedShops();
		this.getLockedShops();
		this.getHintedShops();
		this.getUnlockedUnits()

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

	public getUnlockedShops(): void {
		this.shopService.getUnlockedShops(this.player.unlockedShops).subscribe({
			next: (unlockedShops: ShopItemInterface[]) => {
				this.unlockedShops = unlockedShops;
			}
		})
	}

	public getLockedShops(): void {
		this.shopService.getLockedShops(this.player.unlockedShops).pipe(
			map((shops: ShopItemInterface[]) => shops.slice(1, 2))
		).subscribe({
			next: (lockedShops: ShopItemInterface[]) => {
				this.lockedShops = lockedShops;
			}
		})
	}

	public getHintedShops(): void {
		this.shopService.getLockedShops(this.player.unlockedShops).pipe(
			map((shops: ShopItemInterface[]) => shops.slice(0, 1))
		).subscribe({
			next: (hintedShops: ShopItemInterface[]) => {
				this.hintedShops = hintedShops;
			}
		})
	}


	public buildingUnlocked(shopName: string): boolean | undefined {
		// TODO why is this function being fired every time i click a shop?
		const shop = this.unlockedShops.find(shop => shop.name === shopName);
		return shop && shop.quantity >= 1;
	}

	public getUnlockedUnits(): void {
		this.buildingService.getBuildings().subscribe({
			next: (buildings: BuildingInterface[]) => {
				buildings.forEach((building: BuildingInterface) => {
					building.unlockedUnits.forEach((unitId: number) => {
						// get the unit with unitID that has quantity 1
						this.unitService.getUnit(unitId)
							.pipe(
								filter((unit: UnitInterface) => unit && unit?.quantity >= 1),
							)
							.subscribe({
								next: (unit: UnitInterface) => {
									this.activeArmyUnits.push(unit);
								}
							})
					})
				})
			}
		})
	}

	public handleUnitClick($event: number) {
		const unitId = $event;

		this.unitService.getUnit(unitId)
			.pipe(
				filter((unit: UnitInterface) => unit.quantity === 1),
			)
			.subscribe({
				next: (unit: UnitInterface) => {
					this.activeArmyUnits.push(unit);
				}
			})
	}

	public handleShopClick($event: number): void {
		const shopId: number = $event;
		const playerGold: number = this.player.gold;


		this.shopService.getShop(shopId).pipe(
			map((shop: ShopItemInterface) => shop.price),
		).subscribe((shopCost: number) => {


			if (playerGold >= shopCost) {

				// reduce player gold by shopCost and return new value
				// todo IS THIS SAFE?
				this.player.gold -= shopCost;

				// increase shop.quantity + 1
				this.shopService.updateShopQuantity(shopId).subscribe((shopQuantity: number) => {

					const updatedUnlockedShops = this.unlockedShops.map((shop: ShopItemInterface) => {
						if (shop.id === shopId) {
							return {...shop, quantity: shopQuantity};
						}
						return shop;
					});
					this.unlockedShops = updatedUnlockedShops;

					if (shopQuantity === 10) {
						// Unlock the next shop by adding it to the unlockedShops array
						const newUnlockedShop = this.player.unlockedShops.slice(-1)[0] + 1;
						this.player.unlockedShops.push(newUnlockedShop);

						// Update the player with the new unlocked shop
						this.playerService.updatePlayer(this.player).subscribe((player) => {
							this.player = player;
							this.getUnlockedShops();
						});
					}
				});

			}
		});


	}


}


