import {Component, inject, OnInit} from '@angular/core';
import {NestedChildActions} from '@shared/classes/nested-child-actions';
import {Back} from '@app/components/ui/back/back';
import {Button} from '@app/components/ui/button/button';
import {Content} from '@app/components/grid/content/content';
import {UserRepository} from '@core/repository/user.repository';
import {AlertService} from '@app/core/services/alert/alert';
import {NativeLanguages} from '@app/features/native-languages/native-languages';
import {DiaryScreen} from '@app/screens/diary/diary';

@Component({
  selector: 'app-native-language-screen',
  imports: [
    Back,
    Button,
    Content,
    NativeLanguages
  ],
  templateUrl: './native-language.html',
  styleUrl: './native-language.scss',
})
export class NativeLanguageScreen extends NestedChildActions implements OnInit {

  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly alert: AlertService = inject(AlertService);

  async ngOnInit() {
    const nativeLanguageId: number | null = await this.userRepository.getNativeLanguage();
    this.value.set(nativeLanguageId);
    if (nativeLanguageId) this.isValid.set(true);
  }

  async onSave(): Promise<void>{
    await this.userRepository.updateNativeLanguage(this.value());
    this.alert.show('Successfully saved', 'success');
  }

}
