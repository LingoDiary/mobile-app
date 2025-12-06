import { Directive, ElementRef, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: true
})
export class IntersectionObserverDirective implements OnInit, OnDestroy {

  @Output() visible = new EventEmitter<void>();

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.visible.emit();
      }
    }, { rootMargin: '200px' });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
