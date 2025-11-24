import {Component, inject, OnInit} from '@angular/core';
import {Back} from "@app/components/ui/back/back";
import {Button} from "@app/components/ui/button/button";
import {Content} from "@app/components/grid/content/content";
import {NestedChildActions} from '@app/shared/classes/nested-child-actions';
import {Mentors} from '@app/features/mentors/mentors';
import {UserRepository} from '@core/storage/user.storage';
import {AlertService} from '@app/core/services/alert/alert';
import {DiaryScreen} from '@app/screens/diary/diary';

@Component({
  selector: 'app-mentor-screen',
  imports: [
    Back,
    Button,
    Content,
    Mentors
  ],
  templateUrl: './mentor.html',
  styleUrl: './mentor.scss',
})
export class MentorScreen extends NestedChildActions implements OnInit {

  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly alert: AlertService = inject(AlertService);

  async ngOnInit() {
    const mentorId: number | null = await this.userRepository.getMentor();
    this.value.set(mentorId);
    if (mentorId) this.isValid.set(true);
  }

  async onSave(): Promise<void> {
    await this.userRepository.updateMentor(this.value());
    this.alert.show('Successfully saved', 'success');
  }

}
