import {Component, OnInit, signal} from '@angular/core';
import {Mentor} from '@app/data/interfaces/Mentor';
import {mentors} from '@app/data/mentors';



@Component({
  selector: 'app-mentors',
  standalone: true,
  templateUrl: './mentors.html',
  styleUrl: './mentors.scss',
})
export class Mentors implements OnInit {

  mentors: Array<Mentor> = [];

  ngOnInit(): void {
    this.mentors = mentors;
  }

  activeIndex = signal<number>(0);

  private startX = 0;
  private endX = 0;
  private threshold = 50; // пикселей для свайпа

  // Touch
  startTouch(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  endTouch(event: TouchEvent) {
    this.endX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  // Pointer (mouse/touch)
  protected index: any;
  onPointerDown(event: PointerEvent) {
    this.startX = event.clientX;
  }

  onPointerUp(event: PointerEvent) {
    this.endX = event.clientX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const diff = this.endX - this.startX;

    if (Math.abs(diff) < this.threshold) return;

    if (diff > 0) this.prev();
    else this.next();
  }

  next() {
    if (this.activeIndex() < this.mentors.length - 1) {
      this.activeIndex.update(i => i + 1);
    }
  }

  prev() {
    if (this.activeIndex() > 0) {
      this.activeIndex.update(i => i - 1);
    }
  }

  selectIndex(index: number) {
    this.activeIndex.set(index);
  }
}
