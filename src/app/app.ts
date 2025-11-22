import {Component, inject, signal, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Viewport} from '@app/components/core/viewport/viewport';
import {UserRepository} from '@core/storage/user.storage';
import {User} from '@core/db/db-tables';
import {Alert} from '@app/components/ui/alert/alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Viewport, Alert],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Lingo Diary');

  private readonly userRepository = inject(UserRepository);
  private readonly router = inject(Router);

  constructor() {
  }

  async ngOnInit() {
    const user: User | null = await this.userRepository.user();

    if (user?.isOnboarded) {
      await this.router.navigate(['/diary']);
    } else {
      await this.router.navigate(['/onboarding']);
    }
  }
}
