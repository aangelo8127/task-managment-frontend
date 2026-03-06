import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `
    <header class="app-header">
      <h1>Gestión de Tareas</h1>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
  styleUrl: './app.scss',
})
export class App {}
