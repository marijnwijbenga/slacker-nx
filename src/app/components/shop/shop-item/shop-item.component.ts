import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ShopInterface} from "../../../interfaces/shop/shop.interface";

@Component({
  selector: 'sl-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})

export class ShopItemComponent {
  @Input() public shop!: ShopInterface;
  @Input() public status?: 'locked' | 'disabled' | 'hinted' | 'unlocked';
  @Output() public shopClicked: EventEmitter<number> = new EventEmitter<number>();
  public imagePath = 'assets/images/shops/';


  public onClick(): void {
    this.shopClicked.emit(this.shop.id);
  }

}


