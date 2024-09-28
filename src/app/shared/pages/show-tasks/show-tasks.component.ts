import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { Tarea } from '../interfaces/task';
import { ButtonDefaultComponent } from '../../components/buttons/button-default/button-default.component';

// @Component({
//   selector: 'shared-show-tasks',
//   templateUrl: './show-tasks.component.html',
//   styles: [
//   ]
// })

@Component({
  selector: 'shared-show-tasks',
  standalone: true,
  templateUrl: './show-tasks.component.html',
  imports: [NgIf, NgFor, ButtonDefaultComponent],
  styles: [],
})

export class ShowTasksComponent implements OnInit {

  tareas: Tarea[] = [];
  tareasFiltradas: Tarea[] = [];
  filtroActual: string = 'todas'; // Default todas

  constructor() {}

  ngOnInit(): void {
    // Recuperar tareas guardadas desde el localStorage
    const tareasEnLocalStorage = localStorage.getItem('tareasGuardadas');
    if (tareasEnLocalStorage) {
      this.tareas = JSON.parse(tareasEnLocalStorage);
    }
    this.filtrarTareas('todas');
  }

    // Filtrar las tareas según el filtro seleccionado
    filtrarTareas(filtro: string): void {
      this.filtroActual = filtro;
      if (filtro === 'completadas') {
        this.tareasFiltradas = this.tareas.filter(tarea => tarea.tareaCompletada);
      } else if (filtro === 'pendientes') {
        this.tareasFiltradas = this.tareas.filter(tarea => !tarea.tareaCompletada);
      } else {
        this.tareasFiltradas = [...this.tareas]; // Todas las tareas
      }
    }

    // Marcar o desmarcar una tarea como completada
    cambiarEstadoTarea(tarea: Tarea): void {
      tarea.tareaCompletada = !tarea.tareaCompletada;
      localStorage.setItem('tareasGuardadas', JSON.stringify(this.tareas));
      this.filtrarTareas(this.filtroActual);
    }

    eliminarTarea(id: number): void {
      this.tareas = this.tareas.filter((tarea, index) => index !== id);
      localStorage.setItem('tareasGuardadas', JSON.stringify(this.tareas));
      this.filtrarTareas(this.filtroActual);
    }

}
