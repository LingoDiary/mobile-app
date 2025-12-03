import {Component, inject, OnInit, signal} from '@angular/core';
import {Navigation} from '@app/components/ui/navigation/navigation';
import {Button} from '@app/components/ui/button/button';
import {img} from '@shared/utils/helpers';
import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {DiaryGroup} from '@core/type/diary-group';
import {EntryRepository} from '@core/repository/entry.repository';
import {Entries} from '@app/screens/diary/_parts/entries/entries';
import {IntersectionObserverDirective} from '@core/directive/intersection-observer.directive';
import {Entry} from '@core/db/db-tables';
import {Router} from '@angular/router';
import {Viewport} from '@app/components/viewport/viewport';

@Component({
  selector: 'app-diary-screen',
  imports: [
    Navigation,
    Button,
    FaIconComponent,
    Entries,
    IntersectionObserverDirective,
    Viewport
  ],
  templateUrl: './diary.html',
  styleUrl: './diary.scss',
})
export class DiaryScreen implements OnInit {

  protected readonly img = img;
  protected readonly router: Router = inject(Router);
  protected readonly faSearch = faSearch;
  protected readonly faPlus = faPlus;

  private readonly entryRepository = inject(EntryRepository);

  // -------- Component State --------
  loading = signal(false);
  reachedEnd = signal(false);

  nextCursor: string | number | null = null;

  /** Raw entries collected from pagination */
  private rawEntries = signal<Entry[]>([]);

  /** Final UI groups */
  items = signal<DiaryGroup[]>([]);

  async ngOnInit(): Promise<void> {
    await this.loadMore();
  }

  goToSearch() {
    this.router.navigate(['/diary/search']);
  }

  /**
   * Load next batch of entries with unified fetch()
   */
  async loadMore() {
    if (this.loading() || this.reachedEnd()) return;

    this.loading.set(true);

    const res = await this.entryRepository.fetch({
      cursor: this.nextCursor,
      search: null,            // diary имеет обычную пагинацию
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

  /**
   * Reset pagination completely (pull-to-refresh)
   */
  async onBottomReached() {
    if (!this.loading() && !this.reachedEnd()) {
      await this.loadMore();
    }
  }
}
