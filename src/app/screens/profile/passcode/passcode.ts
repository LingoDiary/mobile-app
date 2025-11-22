import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '@app/components/ui/button/button';
import { Content } from '@app/components/core/content/content';
import { Passcode as PasscodeFeature } from '@app/features/passcode/passcode';
import { AlertService } from '@app/core/services/alert/alert';
import { img } from '@app/shared/utils/helpers';
import {UserRepository} from '@core/storage/user.storage';

@Component({
  selector: 'app-profile-passcode',
  standalone: true,
  imports: [Button, Content, PasscodeFeature],
  templateUrl: './passcode.html',
  styleUrl: './passcode.scss',
})
export class Passcode {

  value = signal<string | null>(null);
  isValid = signal<boolean>(false);

  protected readonly img = img;

  private readonly router: Router = inject(Router);
  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly alert: AlertService = inject(AlertService);

  isPasscodeEntered = computed(() => !!this.value()?.length);

  back(): void {
    this.router.navigate(['/profile']);
  }

  onValidChange(valid: boolean): void {
    this.isValid.set(valid);
  }

  onStateChange(data: { key: string; value: any }): void {
    this.value.set(data.value ?? null);
  }

  onSave(): void {
    this.userRepository.updatePasscode(this.value());
    this.alert.show('Successfully saved', 'success');
  }

  onDrop(): void {
    this.userRepository.updatePasscode(null);
    this.alert.show('Successfully removed', 'success');
  }
}
