import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sl-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.scss'],
})
export class BubbleComponent implements OnInit {
  @Input() public value: number = 0;
  @Input() public duration: number = 1000;

  public position = { x: 0, y: 0 };
  public opacity = 1;
  public textContent?: string;

  ngOnInit() {
    setTimeout(() => {
      this.opacity = 0;
    }, this.duration);
  }

  public setPosition(x: number, y: number) {
    this.position = { x, y };
  }


}
