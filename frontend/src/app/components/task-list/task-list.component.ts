import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService, Task, TaskStatus, TaskPriority } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { PriorityFilterComponent } from '../priority-filter/priority-filter.component';
import { CreateTaskComponent } from '../task-create.component.ts/task-create.component';
import { BulkEditComponent } from '../bulk-priority.component/bulk-edit.component';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, PriorityFilterComponent, CreateTaskComponent, BulkEditComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage = '';
  creating = false;
  // Expose enums to template
  TaskStatus = TaskStatus;
  TaskPriority = TaskPriority;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(priority?: string) {
    this.taskService.getTasks(priority).subscribe({
      next: (tasks) => (this.tasks = tasks),
      error: () => (this.errorMessage = 'Error loading tasks'),
    });
  }

  // TODO for candidates: Implement delete functionality
  deleteTask(id: string) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete task';
          console.error('Error deleting task:', error);
        },
      });
    }
  }

  editTask(id: string) {
    this.router.navigate(['/tasks', id]);
  }
  // Logout user
  logout() {
    try {
      this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Logout not fully implemented yet');
    }
  }
  // Apply filter based on selected priority
  applyFilter(priority: string) {
    this.loadTasks(priority);
  }
  openCreateForm() {
    this.creating = true;
  }

  handleCreate(task: any) {
    this.taskService.createTask(task).subscribe(() => {
      this.creating = false;
      this.loadTasks();
    });
  }

  // Implement bulk functionality
  bulkEditOpen = false;
  selectedTasks = new Set<string>();

  toggleSelectAll(event: any) {
    if (event.target.checked) {
      this.tasks.forEach((t) => this.selectedTasks.add(t._id!));
    } else {
      this.selectedTasks.clear();
    }
  }

  toggleSelection(id: string, event: any) {
    if (event.target.checked) {
      this.selectedTasks.add(id);
    } else {
      this.selectedTasks.delete(id);
    }
  }
  openBulkEdit() {
    this.bulkEditOpen = true;
  }
  applyBulkEdit(values: { priority?: TaskPriority; status?: TaskStatus }) {
    const taskIds = Array.from(this.selectedTasks);

    this.taskService.bulkEdit(taskIds, values).subscribe({
      next: () => {
        this.bulkEditOpen = false;
        this.selectedTasks.clear();
        this.loadTasks();
      },
      error: (err) => {
        console.error('🔥 FRONT — Bulk edit ERROR:', err);
        this.errorMessage = 'Error applying bulk update';
      },
    });
  }

  // Implement bulk delete functionality
  bulkDelete() {
    const ids = Array.from(this.selectedTasks);

    if (ids.length === 0) return;

    if (!confirm('Are you sure you want to delete the selected tasks?')) {
      return;
    }

    let completed = 0;

    ids.forEach((id) => {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          completed++;
          if (completed === ids.length) {
            this.loadTasks();
            this.selectedTasks.clear();
          }
        },
        error: () => console.error('Error deleting: ', id),
      });
    });
  }
}
