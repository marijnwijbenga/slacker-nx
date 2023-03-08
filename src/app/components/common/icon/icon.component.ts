import {Component, Input} from '@angular/core';
import {SizeType} from '../../../types/size.type';

const IMG_PATH = 'assets/images/icons/';

@Component({
  selector: 'sl-icon[icon]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() public icon!: string;
  @Input() public size?: SizeType;

  public img_path: string = IMG_PATH;

  // first make icon work normally

}
