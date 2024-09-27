import { Component } from '@angular/core';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  links = [
    { path: 'createTask', label: 'Crear Tarea' },
    { path: 'showTasks', label: 'Lista De Tareas' },
  ];
}
