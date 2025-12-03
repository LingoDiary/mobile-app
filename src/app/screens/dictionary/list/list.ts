import {Component, inject, OnInit, signal} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {Navigation} from '@app/components/ui/navigation/navigation';
import {Router, RouterLink} from '@angular/router';
import {faPlus, faSearch} from '@fortawesome/free-solid-svg-icons';
import {TranslateRepository} from '@core/repository/translate.repository';
import {IntersectionObserverDirective} from '@core/directive/intersection-observer.directive';
import {Button} from '@app/components/ui/button/button';
import {img} from '@shared/utils/helpers';
import {Viewport} from '@app/components/viewport/viewport';

@Component({
  selector: 'app-list',
  imports: [
    FaIconComponent,
    Navigation,
    RouterLink,
    IntersectionObserverDirective,
    Button,
    Viewport,
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListScreen implements OnInit {

  protected readonly img = img;

  private router = inject(Router);
  private translateRepository = inject(TranslateRepository);

  faSearch = faSearch;
  faPlus = faPlus;

  // signals
  items = signal<any[]>([]);
  reachedEnd = signal(false);
  loading = signal(false);

  nextCursor: string | number | null = null;

  async ngOnInit(): Promise<void> {
    await this.loadMore();
  }

  async loadMore(): Promise<void> {
    // prevent double loads or loading after finish
    if (this.loading() || this.reachedEnd()) return;

    this.loading.set(true);

    // fetch page from SQLite
    const res = await this.translateRepository.paginate(this.nextCursor);

    // append new items
    if (res.data.length > 0) {
      this.items.set([...this.items(), ...res.data]);
    }

    // update cursor
    this.nextCursor = res.nextCursor;

    // check if list ended
    if (res.nextCursor === null) {
      this.reachedEnd.set(true);
    }

    this.loading.set(false);
  }

  onBottomReached(): void {
    if (!this.loading() && !this.reachedEnd()) {
      this.loadMore();
    }
  }

  onNew(): void {
    this.router.navigate(['/dictionary/entry']);
  }
}
