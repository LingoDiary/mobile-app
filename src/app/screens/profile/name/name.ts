import {Component, inject, OnInit, signal} from '@angular/core';
import {Content} from "@app/components/grid/content/content";
import {Button} from '@app/components/ui/button/button';
import {img} from '@app/shared/utils/helpers';
import {Router} from '@angular/router';
import {Name as NameFeature} from '@app/features/name/name'
import {UserRepository} from '@core/storage/user.storage';
import {AlertService} from '@app/core/services/alert/alert';
import {Back} from '@app/components/ui/back/back';
import {NestedChildActions} from '@app/shared/classes/nested-child-actions';

@Component({
  selector: 'app-profile-name',
  imports: [
    Content,
    Button,
    NameFeature,
    Back
  ],
  templateUrl: './name.html',
  styleUrl: './name.scss',
})
export class Name extends NestedChildActions implements OnInit {

  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly alert: AlertService = inject(AlertService);

  protected readonly img = img;

  async ngOnInit() {
    const name: string | null = await this.userRepository.getName();
    this.value.set(name);
    if (name) this.isValid.set(true);
  }

  onSave(): void {
    this.userRepository.updateName(this.value() as string);
    this.alert.show('Successfully saved', 'success');
  }

}
