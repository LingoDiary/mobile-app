import {Component, inject, signal} from '@angular/core';
import {Back} from '@app/components/ui/back/back';
import {EntryRepository} from '@core/repository/entry.repository';
import {Entry} from '@core/db/db-tables';
import {DiaryGroup} from '@core/type/diary-group';
import {Entries} from '@app/screens/diary/_parts/entries/entries';
import {Viewport} from '@app/components/viewport/viewport';

@Component({
  selector: 'app-search',
  imports: [
    Back,
    Entries,
    Viewport,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchScreen {

  private entryRepository: EntryRepository = inject(EntryRepository);

  searching = signal('');

  // -------- Component State --------
  loading = signal(false);
  reachedEnd = signal(false);


  nextCursor: string | null = null;

  queryStep: number = 1;

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

    this.queryStep++;

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

  async onScroll(event: Event) {
    if (this.loading() || this.reachedEnd()) return;

    const el = event.target as HTMLElement;
    const offset = el.scrollHeight - el.scrollTop - el.clientHeight;

    if (offset < 200) {
      await this.loadMore();
    }
  }

}
