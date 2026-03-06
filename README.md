# TaskApp — Gestión de Tareas

Aplicación frontend desarrollada con [Angular CLI](https://github.com/angular/angular-cli) v21 para la gestión de tareas (CRUD). Se conecta a un backend REST en `http://localhost:8080/api/tasks`.

## Funcionalidades

- Listado de tareas con título, descripción y estado de completado.
- Creación y edición de tareas mediante formulario reactivo con validación.
- Marcar tareas como completadas directamente desde la lista.
- Eliminación de tareas con refresco automático.

## Tecnologías

- Angular 21 (standalone components, signals, control flow nativo)
- TypeScript
- HTML5, SCSS
- RxJS para manejo asíncrono
- Formularios reactivos

## Estructura del proyecto

```
src/app/
├── models/
│   └── task.model.ts          # Interface Task
├── services/
│   └── task.service.ts        # Servicio HTTP (CRUD)
├── components/
│   ├── task-list/             # Componente de listado
│   └── task-form/             # Componente de formulario (crear/editar)
├── app.routes.ts              # Definición de rutas
├── app.config.ts              # Configuración de la aplicación
└── app.ts                     # Componente raíz
```

## Servidor de desarrollo

Para iniciar el servidor local:

```bash
ng serve
```

Abre el navegador en `http://localhost:4200/`. La aplicación se recarga automáticamente al modificar archivos.

## Compilación

Para compilar el proyecto:

```bash
ng build
```

Los artefactos se generan en el directorio `dist/`. La compilación de producción optimiza rendimiento y velocidad.

## Pruebas unitarias

Para ejecutar las pruebas unitarias con [Vitest](https://vitest.dev/):

```bash
ng test
```

## Recursos adicionales

Para más información sobre Angular CLI, visita la [referencia de comandos de Angular CLI](https://angular.dev/tools/cli).
