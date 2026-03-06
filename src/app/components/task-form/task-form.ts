import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly taskService = inject(TaskService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly isEditMode = signal(false);
  protected readonly errorMessage = signal('');
  private taskId: number | null = null;

  protected readonly taskForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    completed: [false],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskId = Number(id);
      this.isEditMode.set(true);
      this.loadTask(this.taskId);
    }
  }

  private loadTask(id: number): void {
    this.taskService.getTaskById(id).subscribe({
      next: (task) => {
        this.taskForm.patchValue({
          title: task.title,
          description: task.description,
          completed: task.completed,
        });
      },
      error: (err) => this.errorMessage.set(err.message),
    });
  }

  protected onSubmit(): void {
    if (this.taskForm.invalid) return;

    const task: Task = this.taskForm.value;

    const request$ = this.isEditMode()
      ? this.taskService.updateTask(this.taskId!, task)
      : this.taskService.createTask(task);

    request$.subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => this.errorMessage.set(err.message),
    });
  }

  protected goBack(): void {
    this.router.navigate(['/tasks']);
  }
}
