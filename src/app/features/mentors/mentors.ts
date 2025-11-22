import {Component, EventEmitter, OnInit, Output, signal} from '@angular/core';
import {Mentor} from '@app/data/interfaces/Mentor';
import {mentors} from '@app/data/mentors';



@Component({
  selector: 'app-mentors',
  standalone: true,
  templateUrl: './mentors.html',
  styleUrl: './mentors.scss',
})
export class Mentors implements OnInit {

  @Output() validChange = new EventEmitter<boolean>();
  @Output() stateChange = new EventEmitter<{ key: string, value: any }>();

  mentors: Array<Mentor> = [];

  ngOnInit(): void {
    this.mentors = mentors;
    this.validChange.emit(true);
    this.stateChange.emit({
      key: 'mentor_id',
      value: this.mentors[0].id,
    });
  }

  activeIndex = signal<number>(0);

  private startX = 0;
  private endX = 0;
  private threshold = 50;

  // Touch
  startTouch(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  endTouch(event: TouchEvent) {
    this.endX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const diff = this.endX - this.startX;

    if (Math.abs(diff) < this.threshold) return;

    if (diff > 0) this.prev();
    else this.next();

    this.selectIndex();
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

  selectIndex() {
    this.stateChange.emit({
      key: 'mentor_id',
      value: this.mentors[this.activeIndex()].id,
    });
  }
}
