import {Component, inject, signal, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {UserRepository} from '@core/repository/user.repository';
import {User} from '@core/db/db-tables';
import {Alert} from '@app/components/ui/alert/alert';
import {SQLiteService} from '@core/db/sqlite.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Alert],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Lingo Diary');

  private readonly userRepository = inject(UserRepository);
  private readonly router = inject(Router);

  private sqlite = inject<SQLiteService>(SQLiteService);

  constructor() {
  }

  async ngOnInit() {
    await this.sqlite.init();

    const user: User | null = await this.userRepository.user();

    if (user?.isOnboarded) {
      await this.router.navigate(['/diary']);
    } else {
      await this.router.navigate(['/onboarding']);
    }
  }
}
