import {Component, inject, computed, ViewChild} from '@angular/core';
import { Button } from '@app/components/ui/button/button';
import { Content } from '@app/components/grid/content/content';
import { Passcode as PasscodeFeature } from '@app/features/passcode/passcode';
import { AlertService } from '@app/core/services/alert/alert';
import { img } from '@app/shared/utils/helpers';
import {UserRepository} from '@core/storage/user.storage';
import {Back} from '@app/components/ui/back/back';
import {NestedChildActions} from '@app/shared/classes/nested-child-actions';
import {DiaryScreen} from '@app/screens/diary/diary';

@Component({
  selector: 'app-passcode-screen',
  standalone: true,
  imports: [Button, Content, PasscodeFeature, Back],
  templateUrl: './passcode.html',
  styleUrl: './passcode.scss',
})
export class PasscodeScreen extends NestedChildActions {

  @ViewChild(PasscodeFeature) passcode!: PasscodeFeature;

  protected readonly img = img;

  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly alert: AlertService = inject(AlertService);

  isPasscodeEntered = computed(() => !!this.value()?.length);

  async onSave(): Promise<void>{
    await this.userRepository.updatePasscode(this.value());
    this.alert.show('Successfully saved', 'success');
    this.passcode.clear();
    this.value.set(null);
  }

  async onDrop(): Promise<void>{
    await this.userRepository.updatePasscode(null);
    this.alert.show('Successfully removed', 'success');
  }
}
