import {Component, OnInit} from '@angular/core';
import {AnimationType} from '../../../types/animation.type';
import {BubbleType} from '../../../types/bubble.type';

@Component({
  selector: 'sl-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
})
export class BubbleComponent implements OnInit {

  public value = 0;
  public type: BubbleType = 'regular';
  public duration = 1000;
  public animationType: AnimationType = 'linear';
  public position = { x: 0, y: 0 };
  public opacity = 1;
  public textContent?: string;

  ngOnInit(): void {
    setTimeout(() => {
      this.opacity = 0;
    }, this.duration);
  }

  public setPosition(x: number, y: number): void {
    this.position = { x, y };
  }


}
