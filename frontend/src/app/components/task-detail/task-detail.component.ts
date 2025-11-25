import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService, TaskPriority, TaskStatus, Task } from '../../services/task.service';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
})
export class TaskDetailComponent implements OnInit {
  form!: FormGroup;
  taskId!: string;
  loading = true;
  errorMessage = '';

  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService,
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.taskService.getTask(this.taskId).subscribe({
      next: (task: Task) => {
        this.form.patchValue(task);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error loading task details.';
        this.loading = false;
      },
    });
  }

  save() {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.taskService.updateTask(this.taskId, this.form.value).subscribe({
      next: (updatedTask: Task) => {
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.errorMessage = 'Error saving task details.';
      },
    });
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
