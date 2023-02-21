import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {BubbleComponent} from "../../components/warzone/bubble/bubble.component";
import {tap, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BubbleService {

  constructor(
      private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  public onShowBubble(
      event: MouseEvent,
      number: number,
      textContent: string,
      viewContainerRef: ViewContainerRef): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BubbleComponent);
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const button = event.currentTarget as HTMLButtonElement;
    const buttonRect = button.getBoundingClientRect();
    const x = event.clientX - buttonRect.left;
    const y = event.clientY - buttonRect.top + 120;
    componentRef.instance.setPosition(x, y);
    componentRef.instance.duration = 1000;
    componentRef.instance.value = number;
    componentRef.instance.textContent = textContent;
    timer(1500).pipe(tap(() => componentRef.destroy())).subscribe();
  }

}
