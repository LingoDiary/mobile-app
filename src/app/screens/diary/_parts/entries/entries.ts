import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DiaryGroup } from '@core/type/diary-group';
import { formatTime } from '@shared/utils/helpers';

@Component({
  selector: 'app-entries',
  standalone: true,
  imports: [ScrollingModule, RouterLink],
  templateUrl: './entries.html',
  styleUrl: './entries.scss',
})
export class Entries {
  @Input({ required: true }) items!: DiaryGroup[];

  /**
   * Виртуальный скролл нужен только в дневнике.
   * В поиске и словаре он мешает.
   */
  @Input() useVirtualScroll = false;

  /** Только дневник подписывается на это событие */
  @Output() loadMore = new EventEmitter<void>();

  protected readonly formatTime = formatTime;

  private lastIndex = 0;
  private initialFired = false;

  trackGroup = (index: number, item: DiaryGroup) => item.date;

  /**
   * Используется только в режиме виртуального скролла (дневник)
   */
  onVirtualScroll(index: number) {
    if (!this.useVirtualScroll) return;

    const total = this.items.length;
    if (total === 0) return;

    // первое событие от CDK при инициализации — игнорируем
    if (!this.initialFired) {
      this.initialFired = true;
      this.lastIndex = index;
      return;
    }

    // интересует только скролл ВНИЗ
    if (index <= this.lastIndex) {
      this.lastIndex = index;
      return;
    }

    this.lastIndex = index;

    // если подходим к концу — просим подгрузку
    if (index >= total - 3) {
      this.loadMore.emit();
    }
  }
}
