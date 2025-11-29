import {Component, Input, signal, computed, effect, inject, OnInit} from '@angular/core';
import { NgClass } from '@angular/common';
import {Content} from '@app/components/grid/content/content';
import {Back} from '@app/components/ui/back/back';
import {FormsModule} from '@angular/forms';
import {faCheck, faPlus, faSave, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {Button} from '@app/components/ui/button/button';
import {now} from '@shared/utils/helpers';
import {DateTimePicker} from '@app/components/ui/date-time-picker/date-time-picker';
import {EntryRepository} from '@core/repository/entry.repository';
import {UserRepository} from '@core/repository/user.repository';
import {Entry, User} from '@core/db/db-tables';
import { v4 as uuidv4 } from 'uuid';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [NgClass, Content, Back, FormsModule, FaIconComponent, Button, DateTimePicker],
  templateUrl: './entry.html',
  styleUrls: ['./entry.scss']
})
export class EntryScreen implements OnInit {


  protected readonly faSearch = faSearch;
  protected readonly faPlus = faPlus;
  protected readonly faCheck = faCheck;
  protected readonly now = now;

  private readonly userRepository: UserRepository = inject<UserRepository>(UserRepository);
  private readonly repository: EntryRepository = inject<EntryRepository>(EntryRepository);
  private route: ActivatedRoute = inject<ActivatedRoute>(ActivatedRoute);
  private readonly router: Router = inject<Router>(Router);


  id = signal<number | null>(null);

  // -------------------------
  //  Constants
  // -------------------------
  maxLength = 1000;
  minContentLength = 100;

  // -------------------------
  //  Form State (signals)
  // -------------------------
  form = signal({
    content: ''
  });

  // -------------------------
  //  UI State
  // -------------------------
  isLoading = signal(false);
  isSaveDisabled = signal(false);
  isDeleting = signal(false);
  isAnalysisActive = signal(false);
  isAnalysisAvailable = signal(true);

  // Дата в читаемом виде — пока заглушка, позже добавим локализацию
  currentDate = signal('');

  // Для анализа (прокручивать вниз)
  analysisRef = signal<HTMLElement | null>(null);


  // -------------------------
  //  Computed helpers
  // -------------------------
  contentLength = computed(() => this.form().content.length);

  isValid = computed(() =>
    this.form().content.trim().length >= this.minContentLength
  );

  selectedDate = signal(
    DateTimePicker.format()
  );

  // edit mode?
  isEditMode = computed(() => !!this.id());

  constructor() {
    effect(() => {
      const form = this.form();
      if (form.content.length > this.maxLength) {
        this.form.update(f => ({ ...f, content: f.content.slice(0, this.maxLength) }));
      }
    });
  }

  async ngOnInit() {
    const param: string | null = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.id.set(Number(param));
      const result: Entry | null = await this.repository.findById(Number(this.id()));
      if (result) {
        this.selectedDate.set(DateTimePicker.fromISO(result.createdAt));
        this.form.set({
          content: result.content
        });
      }
    }
  }


  // -------------------------
  //  Handlers
  // -------------------------

  onContentInput(value: string) {
    this.form.update(f => ({ ...f, content: value }));
  }

  async onSubmit(): Promise<void> {
    const user: User | null = await this.userRepository.user();
    if (user) {
      if (this.isEditMode()) {

      } else {
        const id: number = await this.repository.create(<Entry>{
          uuid: uuidv4(),
          mentorId: user.mentorId,
          content: this.form().content,
          analysis: null,
          createdAt: DateTimePicker.toISOLocal(this.selectedDate()),
          updatedAt: null,
          analysisStatus: 'none'
        });
        await this.router.navigate([`/diary/entry/${id}`]);
      }

    }

  }

  onDelete() {}
  onAnalyze() {}

  onDateUpdated(newValue: string) {
    this.selectedDate.set(newValue);
  }

  protected readonly DateTimePicker = DateTimePicker;
}
