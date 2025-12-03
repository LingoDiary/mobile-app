import {Component, inject, OnInit} from '@angular/core';
import {Back} from "@app/components/ui/back/back";
import {Button} from "@app/components/ui/button/button";
import {NestedChildActions} from '@shared/classes/nested-child-actions';
import {Mentors} from '@app/features/mentors/mentors';
import {UserRepository} from '@core/repository/user.repository';
import {AlertService} from '@app/core/services/alert/alert';
import {Viewport} from '@app/components/viewport/viewport';

@Component({
  selector: 'app-mentor-screen',
  imports: [
    Back,
    Button,
    Mentors,
    Viewport
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
