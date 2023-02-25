import {Component, Input} from '@angular/core';
import {ShopItemInterface} from "../../../interfaces/shop/shop-item.interface";

@Component({
  selector: 'sl-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})

export class ShopItemComponent {
  @Input() shop!: ShopItemInterface;
  @Input() status?: 'locked' | 'disabled' | 'hinted' | 'unlocked';
  public imagePath = 'assets/images/shops/';
}


