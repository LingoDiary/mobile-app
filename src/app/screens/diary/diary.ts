import {Component, inject, OnInit, signal} from '@angular/core';
import {Content} from "@app/components/grid/content/content";
import {Navigation} from '@app/components/ui/navigation/navigation';
import {Button} from '@app/components/ui/button/button';
import {img} from '../../../shared/utils/helpers';

import {faPlus, faSearch, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {DiaryEntry} from '@core/type/diary-entry';
import {DiaryGroup} from '@core/type/diary-group';
import {EntryRepository} from '@core/repository/entry.repository';
import {Entries} from '@app/screens/diary/_parts/entries/entries';
import {IntersectionObserverDirective} from '@core/directive/intersection-observer.directive';
import {Entry} from '@core/db/db-tables';
import {db} from '@core/db/db';
import {Router} from '@angular/router';

@Component({
  selector: 'app-diary-screen',
  imports: [
    Content,
    Navigation,
    Button,
    FaIconComponent,
    Entries,
    IntersectionObserverDirective
  ],
  templateUrl: './diary.html',
  styleUrl: './diary.scss',
})
export class DiaryScreen implements OnInit {

  protected readonly img = img;

  private entryRepository: EntryRepository = inject(EntryRepository);
  protected router: Router = inject(Router);

  isSearching = signal(false);
  searching = signal('');
  loading = signal(false);
  reachedEnd = signal(false);

  page = signal(1);

  allEntries = signal<Array<{
    date: string;
    display: string;
    entry: Entry;
  }>>([]);

  items = signal<DiaryGroup[]>([]);

  nextCursor: null | string = null;

  async ngOnInit(): Promise<void> {
    await this.loadMore();
  }

  async toggleSearch() {
    this.isSearching.update(v => !v);

    if (!this.isSearching()) {
      this.searching.set('');
      await this.resetAndFetch();
    }
  }

  async onSearchInput(value: string) {
    this.searching.set(value);

    if (value.length >= 5 || value.length === 0) {
      await this.resetAndFetch();
    }
  }

  groupEntries() {
    const groups: Record<string, DiaryGroup> = {};

    for (const item of this.allEntries()) {
      if (!groups[item.date]) {
        groups[item.date] = {
          date: item.date,
          display: item.display,
          entries: [],
        };
      }

      groups[item.date].entries.push(item.entry);
    }

    this.items.set(
      Object.values(groups).sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    );
  }

  async loadMore() {
    if (this.loading() || this.reachedEnd()) return;

    this.loading.set(true);

    const search = this.searching().trim();

    const res = await this.entryRepository.paginate(this.nextCursor);

    if (res.data.length === 0) {
      this.reachedEnd.set(true);
      this.loading.set(false);
      return;
    }

    this.nextCursor = res.nextCursor;

    if (res.nextCursor === null) {
      this.reachedEnd.set(true);
    }

    const newEntries: Array<{
      date: string;
      display: string;
      entry: Entry;
    }> = [];

    for (const item of res.data) {
      const date = item.createdAt.split('T')[0];

      const display = new Date(date).toLocaleDateString('uk-UA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      newEntries.push({
        date,
        display,
        entry: item,
      });
    }

    this.allEntries.set([...this.allEntries(), ...newEntries]);

    this.groupEntries();

    if (!search) {
      this.page.update(p => p + 1);
    }

    this.loading.set(false);
  }

  async resetAndFetch() {
    this.page.set(1);
    this.reachedEnd.set(false);
    this.allEntries.set([]);
    this.items.set([]);
    this.nextCursor = null;
    await this.loadMore();
  }

  async onBottomReached() {
    if (!this.loading() && !this.reachedEnd() && !this.isSearching()) {
      await this.loadMore();
    }
  }

  protected readonly faSearch = faSearch;
  protected readonly faSpinner = faSpinner;
  protected readonly faPlus = faPlus;
}
