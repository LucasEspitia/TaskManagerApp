import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService, Task, TaskStatus, TaskPriority } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { PriorityFilterComponent } from '../priority-filter/priority-filter.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, PriorityFilterComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage = '';
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

  logout() {
    try {
      this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Logout not fully implemented yet');
    }
  }
  applyFilter(priority: string) {
    this.loadTasks(priority);
  }
}
