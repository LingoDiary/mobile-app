import {Component, inject, OnInit, signal} from '@angular/core';
import {img} from '@app/shared/utils/helpers';
import {Content} from '@app/components/grid/content/content';
import {Button} from '@app/components/ui/button/button';
import {Mentors} from '@app/features/mentors/mentors';
import {NgClass} from '@angular/common';
import {NativeLanguages} from '@app/features/native-languages/native-languages';
import {Name} from '@app/features/name/name';
import {LanguageLevels} from '@app/features/language-level/language-levels';
import {Passcode} from '@app/features/passcode/passcode';
import {Reminder} from '@app/features/reminder/reminder';
import {UserDTO} from '@core/dto/user.dto';
import {UserRepository} from '@core/storage/user.storage';
import {Router} from '@angular/router';


@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    Content,
    Button,
    Mentors,
    NgClass,
    NativeLanguages,
    Name,
    LanguageLevels,
    Passcode,
    Reminder,
  ],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.scss',
})
export class Onboarding implements OnInit {

  private readonly userRepository: UserRepository = inject(UserRepository);
  private readonly router: Router = inject(Router);

  protected readonly img = img;

  step = signal<number>(0);
  stepValid = signal<boolean>(false);

  totalSteps: number = 7;
  steps: Array<{
    id: number;
    status: string
  }> = [];

  stepStates: Array<{
    key: string;
    value: any;
  }> = [];

  ngOnInit(): void {
    this.steps = Array.from({length: this.totalSteps - 1}, (_, i) => ({
      id: i + 1,
      status: (this.step() >= i + 1) ? 'active' : 'inactive',
    }));
  }

  previous(): void {
    if (this.step() === 1) {
      this.step.set(0);
      this.recalcSteps();
      return;
    }

    if (this.step() > 1) {
      this.step.update(v => v - 1);
      this.recalcSteps();
    }
  }

  next(): void {

    if (this.step() === 0) {
      this.step.set(1);
      this.recalcSteps();
      this.stepValid.set(false);
      return;
    }

    if (this.step() < this.totalSteps) {
      this.step.update(v => v + 1);
      this.recalcSteps();
      this.stepValid.set(false);
    }
  }

  onStepValidChange(val: boolean) {
    this.stepValid.set(val);
  }

  onStepStateChange(data: { key: string; value: any }) {
    this.stepStates[this.step()] = data;
  }

  isNextDisabled(): boolean {
    const stepsWithoutValidation = [0, 7];

    if (stepsWithoutValidation.includes(this.step())) {
      return false;
    }

    return !this.stepValid();
  }

  async subscribe(): Promise<void> {
    const dataMap = this.stepStates.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {} as Record<string, any>);

    const user: UserDTO = {
      name: dataMap['name'],
      mentorId: Number(dataMap['mentorId']),
      nativeLanguageId: Number(dataMap['nativeLanguageId']),
      languageLevelId: Number(dataMap['languageLevelId']),
      passcode: dataMap['passcode'] ?? null,
      reminder: dataMap['reminder']
        ? {
          hour: dataMap['reminder'].hour.toString(),
          minutes: dataMap['reminder'].minute.toString(),
        }
        : null,
      isOnboarded: true,
      isTutorialCompleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: null,
    };

    await this.userRepository.createOrUpdate(user);
    await this.router.navigate(['/diary']);
  }

  private recalcSteps(): void {
    this.steps = this.steps.map(step => ({
      ...step,
      status: (this.step() >= step.id) ? 'active' : 'inactive'
    }));
  }
}
