import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/tasks';

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      map((tasks) => tasks.map((task) => this.mapTaskFromApi(task))),
      catchError(this.handleError)
    );
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      map((task) => this.mapTaskFromApi(task)),
      catchError(this.handleError)
    );
  }

  createTask(task: Task): Observable<Task> {
    const payload = this.mapTaskToApi(task);
    return this.http.post<Task>(this.apiUrl, payload).pipe(
      map((response) => this.mapTaskFromApi(response)),
      catchError(this.handleError)
    );
  }

  updateTask(id: number, task: Task): Observable<Task> {
    const payload = this.mapTaskToApi(task);
    return this.http.put<Task>(`${this.apiUrl}/${id}`, payload).pipe(
      map((response) => this.mapTaskFromApi(response)),
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private mapTaskFromApi(apiTask: any): Task {
    return {
      id: apiTask.taskId || apiTask.id,
      taskId: apiTask.taskId,
      title: apiTask.title,
      description: apiTask.description,
      completed: apiTask.completed,
      createdAt: apiTask.createdAt,
      updatedAt: apiTask.updatedAt,
    };
  }

  private mapTaskToApi(task: Task): any {
    return {
      title: task.title,
      description: task.description,
      completed: task.completed,
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Ocurrió un error inesperado';
    if (error.status === 0) {
      message = 'No se pudo conectar con el servidor';
    } else {
      message = `Error del servidor: ${error.status} - ${error.message}`;
    }
    console.error(message, error);
    return throwError(() => new Error(message));
  }
}
