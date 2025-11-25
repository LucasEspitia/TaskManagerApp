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

  selectedPriority: TaskPriority = TaskPriority.MEDIUM;
  selectedStatus: TaskStatus = TaskStatus.TODO;

  applyChange() {
    this.apply.emit({
      priority: this.selectedPriority,
      status: this.selectedStatus,
    });
  }
}
