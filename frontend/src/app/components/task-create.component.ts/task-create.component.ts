import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskPriority } from '../../services/task.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.css',
})
export class CreateTaskComponent {
  constructor(private toastService: ToastService) {}

  @Output() create = new EventEmitter<{
    title: string;
    description: string;
    priority: TaskPriority;
  }>();
  @Output() cancel = new EventEmitter<void>();

  priorities = Object.values(TaskPriority);

  newTask = {
    title: '',
    description: '',
    priority: TaskPriority.MEDIUM,
  };

  submitted = false;

  submit() {
    this.submitted = true;

    if (!this.newTask.title.trim()) {
      return;
    }

    this.create.emit(this.newTask);

    this.toastService.success('Task created successfully!');

    //Reset
    this.newTask = {
      title: '',
      description: '',
      priority: TaskPriority.MEDIUM,
    };
    this.submitted = false;
  }
}
