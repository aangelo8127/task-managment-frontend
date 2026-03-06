import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-list.html',
  styleUrl: './task-list.scss',
})
export class TaskListComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);

  protected readonly tasks = signal<Task[]>([]);
  protected readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loadTasks();
  }

  protected loadTasks(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => this.tasks.set(tasks),
      error: (err) => this.errorMessage.set(err.message),
    });
  }

  protected toggleCompleted(task: Task): void {
    const updated: Task = { ...task, completed: !task.completed };
    this.taskService.updateTask(task.id!, updated).subscribe({
      next: () => this.loadTasks(),
      error: (err) => this.errorMessage.set(err.message),
    });
  }

  protected goToCreate(): void {
    this.router.navigate(['/tasks/new']);
  }

  protected goToEdit(id: number): void {
    this.router.navigate(['/tasks/edit', id]);
  }

  protected deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => this.errorMessage.set(err.message),
    });
  }
}
