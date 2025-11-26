import { Injectable } from '@angular/core';

export interface ToastMessage {
  type: 'success' | 'error' | 'info';
  text: string;
  id: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: ToastMessage[] = [];

  show(type: 'success' | 'error' | 'info', text: string) {
    const id = Date.now();
    this.toasts.push({ type, text, id });

    // Auto remove after 3s
    setTimeout(() => {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    }, 3000);
  }

  success(text: string) {
    this.show('success', text);
  }

  error(text: string) {
    this.show('error', text);
  }

  info(text: string) {
    this.show('info', text);
  }
}
