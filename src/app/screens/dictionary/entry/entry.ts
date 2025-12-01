import {Component, OnInit, inject, signal, computed} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateRepository} from '@core/repository/translate.repository';
import {Content} from '@app/components/grid/content/content';
import {Navigation} from '@app/components/ui/navigation/navigation';
import {Button} from '@app/components/ui/button/button';
import {Back} from '@app/components/ui/back/back';
import {AlertService} from '@app/core/services/alert/alert';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [
    Content,
    Navigation,
    Button,
    Back
  ],
  templateUrl: './entry.html',
  styleUrl: './entry.scss',
})
export class EntryScreen implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private translateRepository: TranslateRepository = inject(TranslateRepository);
  private readonly alert: AlertService = inject(AlertService);

  id = signal<number | null>(null);

  phrase = signal('');
  translation = signal('');

  isEdit = computed(() => this.id() !== null);
  isValid = computed(() =>
    this.phrase().trim().length >= 3 &&
    this.translation().trim().length >= 3
  );

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.id.set(Number(param));
      this.loadEntry(Number(param));
    }
  }

  async loadEntry(id: number) {
    const entry = await this.translateRepository.findById(id);
    if (entry) {
      this.phrase.set(entry.phrase);
      this.translation.set(entry.translation);
    }
  }

  async save() {
    if (!this.isValid()) return;

    if (this.isEdit()) {
      await this.translateRepository.update({
        id: this.id()!,
        phrase: this.phrase(),
        translation: this.translation(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });
    } else {
      await this.translateRepository.create({
        phrase: this.phrase(),
        translation: this.translation(),
        createdAt: new Date().toISOString(),
        updatedAt: null,
      });

      this.phrase.set('');
      this.translation.set('');
    }
    this.alert.show('Successfully saved', 'success');
  }

  async delete() {
    if (!this.isEdit()) return;
    await this.translateRepository.delete(this.id()!);
    this.alert.show('Successfully deleted', 'success');
    await this.router.navigate(['/dictionary']);
  }
}
