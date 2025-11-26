import { Component, effect, inject, signal } from '@angular/core';
import { AlertService } from '@app/core/services/alert/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.html',
  styleUrl: './alert.scss'
})
export class Alert {
  private readonly alertService: AlertService = inject(AlertService);

  visible = signal(false);
  message = signal('');
  type = signal<'success' | 'danger' | 'info' | 'warning'>('info');

  constructor() {
    document.documentElement.style.setProperty('--alert-time', '2000ms');

    effect(() => {
      const a = this.alertService.alert();
      this.visible.set(a.show);
      this.message.set(a.message);
      this.type.set(a.type);
    });
  }
}
