import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TaskService, Task, TaskStatus, TaskPriority } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
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

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load tasks';
        console.error('Error loading tasks:', error);
      },
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

  // TODO for candidates: Implement navigation to task detail/edit component
  editTask(id: string) {
    // FIXME: This component doesn't exist yet - candidates need to create it
    // this.router.navigate(['/tasks', id]);
    alert('Task edit component not implemented yet. TODO: Create task detail component');
  }

  logout() {
    try {
      this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      alert('Logout not fully implemented yet');
    }
  }

  // TODO for candidates: Implement priority filtering
  // Add filter controls and method to filter tasks by priority
}
