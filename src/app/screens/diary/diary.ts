import {Component, inject, OnInit, signal} from '@angular/core';
import {Content} from "@app/components/grid/content/content";
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
  protected readonly router: Router = inject(Router);
  protected readonly faSearch = faSearch;
  protected readonly faPlus = faPlus;

  private readonly entryRepository = inject(EntryRepository);

  // -------- Component State --------
  loading = signal(false);
  reachedEnd = signal(false);

  nextCursor: string | null = null;

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
   * Load next page
   */
  async loadMore() {
    if (this.loading() || this.reachedEnd()) return;

    this.loading.set(true);

    const res = await this.entryRepository.paginate(this.nextCursor);

    if (res.data.length === 0) {
      this.reachedEnd.set(true);
      this.loading.set(false);
      return;
    }

    // Merge new entries with existing
    const merged = [...this.rawEntries(), ...res.data];

    this.rawEntries.set(merged);

    // Build grouped structure
    this.items.set(
      this.entryRepository.groupEntriesForPaginate(merged)
    );

    this.nextCursor = res.nextCursor;

    if (res.nextCursor === null) {
      this.reachedEnd.set(true);
    }

    this.loading.set(false);
  }

  /**
   * Reset list (pull-to-refresh or search reset)
   */
  async resetAndFetch() {
    this.rawEntries.set([]);
    this.items.set([]);
    this.nextCursor = null;
    this.reachedEnd.set(false);

    await this.loadMore();
  }

  async onBottomReached() {
    if (!this.loading() && !this.reachedEnd()) {
      await this.loadMore();
    }
  }
}
