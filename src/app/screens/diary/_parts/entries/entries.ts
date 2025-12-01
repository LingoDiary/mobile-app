import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DiaryGroup } from '@core/type/diary-group';
import { formatTime } from '@shared/utils/helpers';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [ScrollingModule, RouterLink],
  templateUrl: './entries.html',
  styleUrl: './entries.scss',
})
export class Entries {
  @Input({ required: true }) items!: DiaryGroup[];

  @Output() loadMore = new EventEmitter<void>();

  protected readonly formatTime = formatTime;

  trackGroup = (index: number, item: DiaryGroup) => item.date;

  onScroll(index: number) {
    const total = this.items.length;

    if (index > total - 6) {
      this.loadMore.emit();
    }
  }
}
