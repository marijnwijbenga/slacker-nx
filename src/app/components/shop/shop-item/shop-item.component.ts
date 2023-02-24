import {Component, Input} from '@angular/core';
import {ShopItemInterface} from "../../../interfaces/shop/shop-item.interface";

@Component({
  selector: 'sl-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})

/*
 how to make this work?
 we have several shops, each shop has the same properties
    but we want to use the same component for each shop
    so we need to pass the shop data to the component

    but where do we store all the shops?
    we store the shops in a constant that we fetch with the service
    so in the constant the shop needs a name as identifier
    we also need to store somewhere when the shop unlocks
    the shop also needs a greyed out variant when it is locked because the player has not unlocked it yet
    or doesnt have enough money to buy it
    we could add a mask to hide the shop icon and name untill the shop is unlocked
    and if it is unlocked but the player doesnt have enough money we could add layer on top of the shop to
    make it look greyed out
    we could also add a lock icon to the shop icon to indicate that the shop is locked
    or we could add a questionmark to the shop icon to indicate that the shop is locked

    so a shop has 3 states
    hidden - because the player has not unlocked the previous shop yet

    unlocked - because the player has unlocked the previous shop and has enough money to buy the shop
    greyed out - because the player has not enough money to buy the shop


 */

export class ShopItemComponent {
  @Input() shop!: ShopItemInterface;
  @Input() status?: 'locked' | 'disabled';
  public imagePath = 'assets/images/shops/';
}


