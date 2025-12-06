import {Component, signal, computed, effect, inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import { NgClass } from '@angular/common';
import {Back} from '@app/components/ui/back/back';
import {FormsModule} from '@angular/forms';
import {
  faCheck,
  faPencil,
  faPlus,
  faSearch,
  faTrash,
  faWandMagicSparkles
} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {Button} from '@app/components/ui/button/button';
import {now} from '@shared/utils/helpers';
import {DateTimePicker} from '@app/components/ui/date-time-picker/date-time-picker';
import {EntryRepository} from '@core/repository/entry.repository';
import {UserRepository} from '@core/repository/user.repository';
import {Entry} from '@core/db/db-tables';
import { v4 as uuidv4 } from 'uuid';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '@app/core/services/alert/alert';
import {Viewport} from '@app/components/viewport/viewport';

@Component({
  selector: 'app-entry-form',
  standalone: true,
  imports: [NgClass, Back, FormsModule, FaIconComponent, Button, DateTimePicker, Viewport],
  templateUrl: './entry.html',
  styleUrls: ['./entry.scss']
})
export class EntryScreen implements OnInit {
  protected readonly faCheck = faCheck;
  protected readonly now = now;

  private readonly alert: AlertService = inject(AlertService);
  private readonly userRepository: UserRepository = inject<UserRepository>(UserRepository);
  private readonly repository: EntryRepository = inject<EntryRepository>(EntryRepository);
  private route: ActivatedRoute = inject<ActivatedRoute>(ActivatedRoute);
  private readonly router: Router = inject<Router>(Router);



  id = signal<number | null>(null);
  entry: Entry | null = null;

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
  isShowMode = signal<boolean>(false);

  @ViewChild('contentInput') contentInput!: ElementRef<HTMLTextAreaElement>;

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
      this.isShowMode.set(true);
      this.entry = await this.repository.findById(Number(this.id()));
      if (this.entry) {
        this.selectedDate.set(DateTimePicker.fromISO(this.entry.createdAt));
        this.form.set({
          content: this.entry.content
        });
      } else {
        await this.router.navigate(['/diary']);
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
    const user = await this.userRepository.user();
    if (!user) return;

    try {

      if (!this.id()) {

        // ----------------------------
        // CREATE NEW ENTRY
        // ----------------------------
        const id: number = await this.repository.create(<Entry>{
          uuid: uuidv4(),
          mentorId: user.mentorId,
          content: this.form().content,
          analysis: null,
          createdAt: DateTimePicker.toISOLocal(this.selectedDate()),
          updatedAt: null,
          analysisStatus: 'none'
        });

        this.id.set(id);

      } else if (this.entry) {
        // ----------------------------
        // UPDATE EXISTING ENTRY
        // ----------------------------


        await this.repository.update(this.entry.id!, {
          content: this.form().content,
          createdAt: DateTimePicker.toISOLocal(this.selectedDate()),
          updatedAt: DateTimePicker.toISOLocal(now())
        });

        this.isShowMode.set(true);
      }

      this.alert.show('Successfully saved', 'success');
      await this.router.navigate([`/diary/entry/${this.id()}`])

    } catch (e: any) {
      alert(e.toString());
    }
  }


  onEdit() {
    this.isShowMode.set(false);

    setTimeout(() => {
      this.contentInput?.nativeElement?.focus();
    }, 0);
  }

  async onDelete() {
    const id: number | null = this.id();
    if (id) {
      await this.repository.delete(id);
      this.alert.show('Successfully deleted', 'success');
      await this.router.navigate([`/diary`])
    }
  }

  onAnalyze() {}

  onDateUpdated(newValue: string) {
    this.selectedDate.set(newValue);
  }

  protected readonly DateTimePicker = DateTimePicker;
  protected readonly faTrash = faTrash;
  protected readonly faPencil = faPencil;
  protected readonly faWandMagicSparkles = faWandMagicSparkles;
}
