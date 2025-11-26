import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskPriority, TaskStatus } from '../../services/task.service';

@Component({
  selector: 'app-bulk-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bulk-edit.component.html',
  styleUrls: ['./bulk-edit.component.css'],
})
export class BulkEditComponent {
  @Input() open = false;

  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<{
    priority: TaskPriority;
    status: TaskStatus;
  }>();

  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);

  selectedPriority: TaskPriority | null = null;
  selectedStatus: TaskStatus | null = null;

  togglePriority(p: TaskPriority) {
    this.selectedPriority = this.selectedPriority === p ? null : p;
  }
  toggleStatus(s: TaskStatus) {
    this.selectedStatus = this.selectedStatus === s ? null : s;
  }

  applyChange() {
    const payload: any = {};

    if (this.selectedPriority !== null) {
      payload.priority = this.selectedPriority;
    }

    if (this.selectedStatus !== null) {
      payload.status = this.selectedStatus;
    }

    this.apply.emit(payload);
    // Reset selections after applying changes
    this.selectedPriority = null;
    this.selectedStatus = null;
  }
  closeModal() {
    this.selectedPriority = null;
    this.selectedStatus = null;

    this.close.emit();
  }
}
