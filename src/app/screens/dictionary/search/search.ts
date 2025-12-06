import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Back } from '@app/components/ui/back/back';
import { Entries } from '@app/screens/diary/_parts/entries/entries';
import { Viewport } from '@app/components/viewport/viewport';

import { EntryRepository } from '@core/repository/entry.repository';
import { TranslateRepository } from '@core/repository/translate.repository';
import { Entry } from '@core/db/db-tables';
import { DiaryGroup } from '@core/type/diary-group';

@Component({
  selector: 'app-dictionary-search',
  standalone: true,
  imports: [
    Back,
    Entries,
    Viewport,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchScreen implements OnInit {

  private entryRepository = inject(EntryRepository);
  private translateRepository = inject(TranslateRepository);
  private route = inject(ActivatedRoute);

  phrase = signal('');
  loading = signal(false);
  reachedEnd = signal(false);
  nextCursor: string | null = null;

  private rawEntries = signal<Entry[]>([]);
  items = signal<DiaryGroup[]>([]);

  async ngOnInit(): Promise<void> {
    this.route.queryParamMap.subscribe(async params => {
      const id = params.get('id');
      if (!id) return;

      this.reset();

      const translation = await this.translateRepository.findById(Number(id));
      if (translation) {
        this.phrase.set(translation.phrase);
      }

      await this.loadMore();
    });
  }

  private reset() {
    this.nextCursor = null;
    this.reachedEnd.set(false);
    this.loading.set(false);
    this.rawEntries.set([]);
    this.items.set([]);
  }

  async onScroll(event: Event) {
    if (this.loading() || this.reachedEnd()) return;

    const el = event.target as HTMLElement;
    const offset = el.scrollHeight - el.scrollTop - el.clientHeight;

    if (offset < 200) {
      await this.loadMore();
    }
  }

  async loadMore() {
    if (this.loading() || this.reachedEnd()) return;

    this.loading.set(true);

    const res = await this.entryRepository.fetch({
      cursor: this.nextCursor,
      search: this.phrase(),
    });

    if (!res.data.length) {
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
}

