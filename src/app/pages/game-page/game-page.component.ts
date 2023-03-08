import {Component, ElementRef, OnInit, QueryList, ViewChildren, ViewContainerRef} from '@angular/core';
import {PlayerService} from '../../services/player/player.service';
import {filter, interval, map, Observable} from 'rxjs';
import {PlayerInterface} from '../../interfaces/player/player.interface';
import {WeaponService} from '../../services/weapon/weapon.service';
import {WeaponInterface} from '../../interfaces/weapon/weapon.interface';
import {ShopService} from '../../services/shops/shop.service';
import {ShopInterface} from '../../interfaces/shop/shop.interface';
import {BuildingsEnum} from '../../enums/buildings.enum';
import {BuildingsService} from '../../services/building/buildings.service';
import {BuildingInterface} from '../../interfaces/building/building.interface';
import {UnitsService} from '../../services/units/units.service';
import {UnitInterface} from '../../interfaces/units/unit.interface';
import {MonsterService} from '../../services/monster/monster.service';
import {MonsterInterface} from '../../interfaces/monster/monster.interface';
import {_MONSTER_LIST} from '../../_CONST/_MONSTERS';
import {BubbleService} from '../../services/bubble/bubble.service';
import {ArmyUnitComponent} from '../../components/warzone/army/army-unit/army-unit.component';

@Component({
	selector: 'sl-game-page',
	templateUrl: './game-page.component.html',
	styleUrls: ['./game-page.component.scss'],
})
export class GamePageComponent implements OnInit {

	@ViewChildren(ArmyUnitComponent) public unitIcons!: QueryList<ArmyUnitComponent>

	public player!: PlayerInterface;
	public weapon!: WeaponInterface;
	public unlockedShops!: ShopInterface[];
	public lockedShops!: ShopInterface[];
	public hintedShops!: ShopInterface[];

	public activeArmyUnits: UnitInterface[] = [];
	public activeMonster: MonsterInterface = _MONSTER_LIST[0];

	readonly BuildingsEnum = BuildingsEnum;

	constructor(
		private viewContainerRef: ViewContainerRef,
		private playerService: PlayerService,
		private weaponService: WeaponService,
		private shopService: ShopService,
		private buildingService: BuildingsService,
		private unitService: UnitsService,
		private monsterService: MonsterService,
		private bubbleService: BubbleService,
	) {
	}

	ngOnInit(): void {
		this.getPlayer();
		this.getWeapon();
		this.getUnlockedShops();
		this.getLockedShops();
		this.getHintedShops();
		this.getUnlockedUnits();
		this.gameLoop();
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
			next: (unlockedShops: ShopInterface[]) => {
				this.unlockedShops = unlockedShops;
			}
		})
	}

	public getLockedShops(): void {
		this.shopService.getLockedShops(this.player.unlockedShops).pipe(
			map((shops: ShopInterface[]) => shops.slice(1, 2))
		).subscribe({
			next: (lockedShops: ShopInterface[]) => {
				this.lockedShops = lockedShops;
			}
		})
	}

	public getHintedShops(): void {
		this.shopService.getLockedShops(this.player.unlockedShops).pipe(
			map((shops: ShopInterface[]) => shops.slice(0, 1))
		).subscribe({
			next: (hintedShops: ShopInterface[]) => {
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

	public gameLoop(): void {
		/* 	AUTO DPS

			when a unit is purchased it should start generating auto dps based on its baseDamage value
			then multiply that value by the unit amount
			the active units are in activeArmyUnits

			the timing with which a unit does damage is per second

			so get the unit from activeArmyUnits
			add it to gameloop


		 */

		// Unit damage + gold

		if(this.activeArmyUnits.length) {
			interval(1000).pipe(
				map(() => {
					// do stuff

					// units doing damage
					this.activeArmyUnits.forEach((unit: UnitInterface) => {
						this.handleUnitDamage(unit).pipe(
							map((damage) =>
								// TODO rewrite this to work for all icons
								this.showUnitDamageBubble(this.unitIcons.toArray()[0].unitIcon, damage),

								// do goldDrop
								// this.showUnitGoldDropBubble(this.unitIcons.toArray()[0].unitIcon, gold),
							),
						).subscribe();
					})
				})
			).subscribe();
		}
	}

	public getUnitsShopQuantity(shopName: string): number {

		const unlockedShop = this.unlockedShops.find((unlockedShop: ShopInterface) => {
			return unlockedShop.name === shopName;
		});

		return unlockedShop?.quantity ?? 0;
	}

	public onUnitMonsterDamage$(unit: UnitInterface, shopQuantity: number): Observable<number> {
		// deal damage to monster
		return this.monsterService.damageMonster(
			this.activeMonster.number,
			unit.baseDamage * unit.quantity * shopQuantity,
		)
	}

	public handleUnitDamage(unit: UnitInterface): Observable<number> {
		const shopQuantity = this.getUnitsShopQuantity(unit.building);
		return this.onUnitMonsterDamage$(unit, shopQuantity).pipe(
			map((damage: number) => {
				return damage;
			})
		);
	}

	public showUnitDamageBubble(unitIconElement: ElementRef, unitDamage: number): void {
		this.bubbleService.onShowBubble(
			unitIconElement.nativeElement,
			unitDamage,
			'+ ',
			this.viewContainerRef,
			-48,
			-20,
			'regular',
			1500,
			'linear',
		);
	}

	public showUnitGoldDropBubble(unitIconElement: ElementRef, unitDamage: number): void {
		this.bubbleService.onShowBubble(
			unitIconElement.nativeElement,
			unitDamage,
			'',
			this.viewContainerRef,
			-48,
			-20,
			'gold',
			1500,
			'linear',
		);
	}


	public handleUnitClick($event: number): void {
		this.unitService.getUnit($event)
			.pipe(
				filter((unit: UnitInterface) => unit.quantity === 1),
			)
			.subscribe({
				next: (unit: UnitInterface) => {
					this.activeArmyUnits.push(unit);
					this.gameLoop();
				}
			})
	}

	public handleShopClick($event: number): void {
		const shopId: number = $event;
		const playerGold: number = this.player.gold;


		this.shopService.getShop(shopId).pipe(
			map((shop: ShopInterface) => shop.price),
		).subscribe((shopCost: number) => {


			if (playerGold >= shopCost) {

				// reduce player gold by shopCost and return new value
				// todo IS THIS SAFE?
				this.player.gold -= shopCost;

				// increase shop.quantity + 1
				this.shopService.updateShopQuantity(shopId).subscribe((shopQuantity: number) => {

					const updatedUnlockedShops = this.unlockedShops.map((shop: ShopInterface) => {
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


