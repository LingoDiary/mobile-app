import {Component, inject, OnInit} from '@angular/core';
import {NestedChildActions} from '@app/shared/classes/nested-child-actions';
import {UserRepository} from '@core/storage/user.storage';
import {AlertService} from '@app/core/services/alert/alert';
import {Back} from '@app/components/ui/back/back';
import {Button} from '@app/components/ui/button/button';
import {Content} from '@app/components/grid/content/content';
import {LanguageLevels} from '@app/features/language-level/language-levels';
import {DiaryScreen} from '@app/screens/diary/diary';

@Component({
  selector: 'app-language-level-screen',
  imports: [
    Back,
    Button,
    Content,
    LanguageLevels
  ],
  templateUrl: './language-level.html',
  styleUrl: './language-level.scss',
})
export class LanguageLevelScreen extends NestedChildActions implements OnInit {

  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly alert: AlertService = inject(AlertService);

  async ngOnInit() {
    const languageLevelId: number | null = await this.userRepository.getLanguageLevel();
    this.value.set(languageLevelId);
    if (languageLevelId) this.isValid.set(true);
  }

  async onSave(): Promise<void>{
    await this.userRepository.updateLanguageLevel(this.value());
    this.alert.show('Successfully saved', 'success');
  }
}
