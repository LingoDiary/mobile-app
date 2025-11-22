import {Component, inject, OnInit, signal} from '@angular/core';
import {Content} from "@app/components/core/content/content";
import {Button} from '@app/components/ui/button/button';
import {img} from '@app/shared/utils/helpers';
import {Router} from '@angular/router';
import {Name as NameFeature} from '@app/features/name/name'
import {UserRepository} from '@core/storage/user.storage';
import {AlertService} from '@app/core/services/alert/alert';

@Component({
  selector: 'app-profile-name',
  imports: [
    Content,
    Button,
    NameFeature
  ],
  templateUrl: './name.html',
  styleUrl: './name.scss',
})
export class Name implements OnInit {

  value = signal<string|null>(null);
  isValid = signal<boolean>(true);

  private readonly router: Router = inject(Router);
  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly alert: AlertService = inject(AlertService);

  protected readonly img = img;

  async ngOnInit() {
    const name: string | null = await this.userRepository.getName();
    this.value.set(name);
    if (name) this.isValid.set(true);
  }

  back(): void {
    this.router.navigate(['/profile']);
  }

  onValidChange(val: boolean) {
    this.isValid.set(val);
  }

  onStateChange(data: { key: string; value: any }) {
    this.value.set(data.value);
  }

  onSave(): void {
    this.userRepository.updateName(this.value() as string);
    this.alert.show('Successfully saved', 'success');
  }

}
