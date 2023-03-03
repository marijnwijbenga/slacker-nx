import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {BubbleComponent} from "../../components/warzone/bubble/bubble.component";
import {tap, timer} from "rxjs";
import {AnimationType} from "../../types/animation.type";
import {BubbleType} from "../../types/bubble.type";

@Injectable({
	providedIn: 'root'
})
export class BubbleService {

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
	) {
	}

	public onShowBubble(
		event: MouseEvent,
		number: number,
		textContent: string,
		viewContainerRef: ViewContainerRef,
		offsetX: number,
		offsetY: number,
		type: BubbleType,
		duration: number,
		animationType: AnimationType,
	): void {
		const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BubbleComponent);
		const componentRef = viewContainerRef.createComponent(componentFactory);
		const button = event.currentTarget as HTMLButtonElement;
		const buttonRect = button.getBoundingClientRect();
		const x = event.clientX - buttonRect.left + offsetX
		const y = event.clientY - buttonRect.top + offsetY;
		componentRef.instance.setPosition(x, y);
		componentRef.instance.duration = duration;
		componentRef.instance.value = number;
		componentRef.instance.textContent = textContent;
		componentRef.instance.type = type;
		componentRef.instance.animationType = animationType;
		timer(duration).pipe(tap(() => componentRef.destroy())).subscribe();
	}

}
