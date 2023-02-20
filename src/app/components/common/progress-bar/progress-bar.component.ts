import {Component, Input} from '@angular/core';
import {BarType} from "../../../types/bar.type";
import {SizeType} from "../../../types/size.type";

@Component({
  selector: 'sl-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @Input() public icon?: BarType;
  @Input() public color?: string;
  @Input() public totalValue?: number;
  @Input() public label?: string;
  @Input() public showValues: boolean = false;
  @Input() public currentValue?: number;
  @Input() public iconSize: SizeType = 'small';
}
