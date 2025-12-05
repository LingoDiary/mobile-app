import {Component, inject, signal} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Back} from '@app/components/ui/back/back';
import {EntryRepository} from '@core/repository/entry.repository';
import {Entry} from '@core/db/db-tables';
import {DiaryGroup} from '@core/type/diary-group';
import {Entries} from '@app/screens/diary/_parts/entries/entries';
import {Viewport} from '@app/components/viewport/viewport';
import {IntersectionObserverDirective} from '@core/directive/intersection-observer.directive';

@Component({
  selector: 'app-search',
  imports: [
    Back,
    Entries,
    Viewport,
    IntersectionObserverDirective,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchScreen {

  protected readonly faSearch = faSearch;
  private entryRepository: EntryRepository = inject(EntryRepository);

  searching = signal('');

  // -------- Component State --------
  loading = signal(false);
  reachedEnd = signal(false);

  nextCursor: string | number | null = null;

  /** Raw entries collected from pagination */
  private rawEntries = signal<Entry[]>([]);

  /** Final UI groups */
  items = signal<DiaryGroup[]>([]);

  async onSearchInput(value: string) {
    this.searching.set(value);

    // reset state
    this.rawEntries.set([]);
    this.items.set([]);
    this.reachedEnd.set(false);
    this.nextCursor = null;

    if (value.length >= 3) {
      await this.loadMore();
    }
  }

  async loadMore() {
    if (this.loading() || this.reachedEnd()) return;

    this.loading.set(true);

    const res = await this.entryRepository.fetch({
      cursor: this.nextCursor,
      search: this.searching(),
    });

    if (res.data.length === 0) {
      this.reachedEnd.set(true);
      this.loading.set(false);
      return;
    }

    const merged = [...this.rawEntries(), ...res.data];

    this.rawEntries.set(merged);

    this.items.set(
      this.entryRepository.groupEntriesForPaginate(merged)
    );

    this.nextCursor = res.nextCursor;

    if (!res.nextCursor) {
      this.reachedEnd.set(true);
    }

    this.loading.set(false);
  }

  async onBottomReached() {
    if (!this.loading() && !this.reachedEnd() && this.searching().length >= 1) {
      await this.loadMore();
    }
  }

}
