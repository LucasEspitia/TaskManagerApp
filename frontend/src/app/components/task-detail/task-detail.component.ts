import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService, TaskPriority, TaskStatus, Task } from '../../services/task.service';
import { ToastService } from '../../shared/toast/toast.service';

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

  priorities = Object.values(TaskPriority);
  statuses = Object.values(TaskStatus);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private taskService: TaskService,
    private toast: ToastService,
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
      error: () => {
        this.toast.error('Failed to load task details.');
        this.loading = false;
      },
    });
  }
  priorityMenuOpen = false;
  statusMenuOpen = false;

  togglePriorityMenu() {
    this.priorityMenuOpen = !this.priorityMenuOpen;
    this.statusMenuOpen = false;
  }

  toggleStatusMenu() {
    this.statusMenuOpen = !this.statusMenuOpen;
    this.priorityMenuOpen = false;
  }

  selectPriority(p: TaskPriority) {
    this.form.get('priority')?.setValue(p);
    this.priorityMenuOpen = false;
  }

  selectStatus(s: TaskStatus) {
    this.form.get('status')?.setValue(s);
    this.statusMenuOpen = false;
  }

  save() {
    if (this.form.invalid) {
      this.toast.error('Please fill out all required fields.');
      return;
    }

    this.taskService.updateTask(this.taskId, this.form.value).subscribe({
      next: () => {
        this.toast.success('Task updated successfully.');
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.toast.error('Error saving task details.');
      },
    });
  }

  cancel() {
    this.router.navigate(['/tasks']);
  }
}
