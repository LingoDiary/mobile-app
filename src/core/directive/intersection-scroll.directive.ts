import {
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  OnDestroy,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {

  @Output() scrolled = new EventEmitter<void>();

  private observer!: IntersectionObserver;

  // Флаг, чтобы избежать первого "ложного" срабатывания
  private initial = true;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];

        if (entry.isIntersecting) {

          // Пропускаем самое первое появление
          if (this.initial) {
            this.initial = false;
            return;
          }

          // Настоящее достижение низа — можно грузить
          this.scrolled.emit();
        }
      },
      {
        root: null,
        rootMargin: '300px 0px 300px 0px',
        threshold: 0.1
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
