import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'danger' | 'info' | 'warning';

@Injectable({ providedIn: 'root' })
@Injectable({ providedIn: 'root' })
export class AlertService {

  private readonly DEFAULT_TIMEOUT = 2000;

  alert = signal<{
    show: boolean;
    message: string;
    type: AlertType;
  }>({
    show: false,
    message: '',
    type: 'info',
  });

  private timer: any;

  show(message: string, type: AlertType = 'info') {
    this.alert.set({ show: true, message, type });

    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.hide(), this.DEFAULT_TIMEOUT);
  }

  hide() {
    this.alert.update(v => ({ ...v, show: false }));
  }
}
