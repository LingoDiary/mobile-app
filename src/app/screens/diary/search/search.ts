import {Component, inject, signal} from '@angular/core';
import {Content} from '@app/components/grid/content/content';
import {Button} from '@app/components/ui/button/button';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {Back} from '@app/components/ui/back/back';
import {EntryRepository} from '@core/repository/entry.repository';
import {Entry} from '@core/db/db-tables';
import {DiaryGroup} from '@core/type/diary-group';
import {Entries} from '@app/screens/diary/_parts/entries/entries';

@Component({
  selector: 'app-search',
  imports: [
    Content,
    Back,
    Entries,
  ],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class SearchScreen {

  protected readonly faSearch = faSearch;
  private entryRepository: EntryRepository = inject(EntryRepository);

  searching = signal('');

  allEntries = signal<Array<{
    date: string;
    display: string;
    entry: Entry;
  }>>([]);

  items = signal<DiaryGroup[]>([]);

  async onSearchInput(value: string) {
    this.searching.set(value);

    if (value.length >= 3) {
      this.items.set(await this.entryRepository.search(value));
    } else {
      this.items.set([]);
    }
  }

}
