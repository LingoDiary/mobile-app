import {Component, inject, OnInit} from '@angular/core';
import {Content} from "@app/components/grid/content/content";
import {Button} from '@app/components/ui/button/button';
import {Name as NameFeature} from '@app/features/name/name'
import {UserRepository} from '@core/repository/user.repository';
import {AlertService} from '@app/core/services/alert/alert';
import {Back} from '@app/components/ui/back/back';
import {NestedChildActions} from '@app/shared/classes/nested-child-actions';

@Component({
  selector: 'app-name-screen',
  imports: [
    Content,
    Button,
    NameFeature,
    Back
  ],
  templateUrl: './name.html',
  styleUrl: './name.scss',
})
export class NameScreen extends NestedChildActions implements OnInit {

  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly alert: AlertService = inject(AlertService);

  async ngOnInit() {
    const name: string | null = await this.userRepository.getName();
    this.value.set(name);
    if (name) this.isValid.set(true);
  }

  async onSave(): Promise<void>{
    await this.userRepository.updateName(this.value() as string);
    this.alert.show('Successfully saved', 'success');
  }

}
