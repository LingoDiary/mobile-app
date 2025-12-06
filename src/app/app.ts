import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SQLiteService } from '@core/db/sqlite.service';
import { UserRepository } from '@core/repository/user.repository';
import { User } from '@core/db/db-tables';
import { Alert } from '@app/components/ui/alert/alert';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Alert],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {

  private router = inject(Router);
  private sqlite = inject(SQLiteService);
  private userRepository = inject(UserRepository);

  loading = signal(true);

  async ngOnInit() {
    try {
      await this.sqlite.init();

      const rows = await this.sqlite.query(
        'SELECT id, createdAt FROM entries ORDER BY createdAt DESC'
      );

      console.log('ENTRIES BY DATE:', rows.values);

      const user: User | null = await this.userRepository.user();

      if (user?.isOnboarded) {
        await this.router.navigate(['/diary'], { replaceUrl: true });
      } else {
        await this.router.navigate(['/onboarding'], { replaceUrl: true });
      }

    }  catch (e) {
      if (e instanceof Error && e.message.includes('already exists')) {
        console.warn('Connection already exists, continuing...');
      } else {
        console.error('App init error:', e);
      }
    } finally {
      this.loading.set(false);
    }
  }
}
