import {Component, inject, OnInit, signal} from '@angular/core';
import {Content} from '@app/components/grid/content/content';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {Navigation} from '@app/components/ui/navigation/navigation';
import {RouterLink} from '@angular/router';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {TranslateRepository} from '@core/repository/translate.repository';
import {IntersectionObserverDirective} from '@core/directive/intersection-observer.directive';
import {Button} from '@app/components/ui/button/button';
import {img} from '@app/shared/utils/helpers';

@Component({
  selector: 'app-list',
  imports: [
    Content,
    FaIconComponent,
    Navigation,
    RouterLink,
    IntersectionObserverDirective,
    Button
  ],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class ListScreen implements OnInit {
  private translateRepository: TranslateRepository = inject(TranslateRepository);

  faSearch = faSearch;

  translations = signal<any[]>([]);
  reachedEnd = signal(false);
  loading = signal(false);

  nextCursor: null | number = null;

  ngOnInit() {
    this.loadMore();
  }

  async loadMore() {
    if (this.loading() || this.reachedEnd()) return;

    this.loading.set(true);

    const res = await this.translateRepository.loadPage(this.nextCursor);

    if (res.data.length > 0) {
      this.translations.set([...this.translations(), ...res.data]);
      this.nextCursor = res.nextCursor;
    }

    if (!res.data.length || res.nextCursor === null) {
      this.reachedEnd.set(true);
    }

    this.loading.set(false);
  }


  onBottomReached() {
    if (!this.reachedEnd()) {
      this.loadMore();
    }
  }

  protected readonly img = img;
}
