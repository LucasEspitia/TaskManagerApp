import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div
        *ngFor="let t of toastService.toasts"
        class="toast"
        [class.success]="t.type === 'success'"
        [class.error]="t.type === 'error'"
        [class.info]="t.type === 'info'"
      >
        {{ t.text }}
      </div>
    </div>
  `,
  styleUrl: './toast.css',
})
export class ToastContainerComponent {
  constructor(public toastService: ToastService) {}
}
