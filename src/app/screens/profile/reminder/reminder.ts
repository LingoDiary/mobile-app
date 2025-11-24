import {Component, inject, OnInit} from '@angular/core';
import {NestedChildActions} from '@app/shared/classes/nested-child-actions';
import {UserRepository} from '@core/storage/user.storage';
import {AlertService} from '@app/core/services/alert/alert';
import {HoursTimes} from '@core/type/hours-times';
import {Back} from '@app/components/ui/back/back';
import {Button} from '@app/components/ui/button/button';
import {Content} from '@app/components/grid/content/content';
import {Reminder as ReminderFeature} from '@app/features/reminder/reminder';

@Component({
  selector: 'app-reminder-screen',
  imports: [
    Back,
    Button,
    Content,
    ReminderFeature
  ],
  templateUrl: './reminder.html',
  styleUrl: './reminder.scss',
})
export class ReminderScreen extends NestedChildActions implements OnInit {

  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly alert: AlertService = inject(AlertService);

  async ngOnInit() {
    const reminder: HoursTimes | null = await this.userRepository.getReminder();
    this.value.set(reminder);
    if (reminder) this.isValid.set(true);
  }

  async onSave(): Promise<void>{
    console.log(this.value());
    await this.userRepository.updateReminder(this.value());
    this.alert.show('Successfully saved', 'success');
  }
}
