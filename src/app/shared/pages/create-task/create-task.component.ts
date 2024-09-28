import { Component, OnInit } from '@angular/core';
import { Tarea } from '../interfaces/task';

import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'shared-create-task',
  templateUrl: './create-task.component.html',
  styles: [],
})
export class CreateTaskComponent implements OnInit {
  tareaForm: FormGroup;
  tareasGuardadas: Tarea[] = [];

  constructor(private fb: FormBuilder) {
    this.tareaForm = this.fb.group({
      nombreTarea: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      tareaCompletada: [false],
      personas: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Cargar las tareas guardadas desde el localStorage cuando el componente se inicializa
    const tareasEnLocalStorage = localStorage.getItem('tareasGuardadas');
    if (tareasEnLocalStorage) {
      this.tareasGuardadas = JSON.parse(tareasEnLocalStorage);
    }
  }

  // Obtener el FormArray de las personas que existan en el array
  get personas(): FormArray {
    return this.tareaForm.get('personas') as FormArray;
  }

  // Agregar una nueva persona al FormArray
  agregarPersona(): void {
    const personaForm = this.fb.group({
      nombreCompleto: [
        '',
        [Validators.required, Validators.minLength(5),this.nombreRepetidoValidator.bind(this)],
      ],
      edad: ['', [Validators.required, Validators.min(18)]],
      habilidadesGroup: this.fb.group({
        nuevaHabilidad: [''],
        habilidades: this.fb.array([], Validators.minLength(1)), // validacion al menos una habilidad
      }),
    });

    this.personas.push(personaForm);
  }

  // Eliminar una persona del FormArray
  eliminarPersona(index: number): void {
    this.personas.removeAt(index);
  }

// trae las habilidades que tiene esa persona en el momento que see consulta
  getHabilidades(personaIndex: number): FormArray {
    return this.personas
      .at(personaIndex)
      .get('habilidadesGroup')
      ?.get('habilidades') as FormArray;
  }

  // Agregar una habilidad a una persona especifica
  agregarHabilidad(personaIndex: number): void {
    const habilidadesGroup = this.personas
      .at(personaIndex)
      .get('habilidadesGroup') as FormGroup;
    const nuevaHabilidad = habilidadesGroup.get('nuevaHabilidad')?.value.trim();

    if (nuevaHabilidad) {
      const habilidadesArray = this.getHabilidades(personaIndex);

      habilidadesArray.push(
        new FormControl(nuevaHabilidad, Validators.required)
      );

      habilidadesGroup.get('nuevaHabilidad')?.reset();
    } else {
      habilidadesGroup.get('nuevaHabilidad')?.setErrors({ required: true });
      habilidadesGroup.get('nuevaHabilidad')?.updateValueAndValidity();
    }
  }

  // Eliminar una habilidad de una persona especifica
  eliminarHabilidad(personaIndex: number, habilidadIndex: number): void {
    const habilidadesArray = this.getHabilidades(personaIndex);
    habilidadesArray.removeAt(habilidadIndex);
  }

  // Validar si el nombre de la persona ya está registrado
  nombreRepetidoValidator(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const nombreIngresado = control.value?.trim();
    const nombresExistentes = this.personas.controls.map((personaControl) =>
      personaControl.get('nombreCompleto')?.value?.trim()
    );
    const duplicado =
      nombresExistentes.filter((nombre) => nombre === nombreIngresado).length >
      1;
    return duplicado ? { nombreRepetido: true } : null;
  }

  // Guardar la tarea
  guardarTarea(): void {

    if (this.tareaForm.valid && this.validarPersonas()) {

      const tarea: Tarea = {
        nombreTarea: this.tareaForm.value.nombreTarea,
        fechaLimite: this.tareaForm.value.fechaLimite,
        tareaCompletada: this.tareaForm.value.tareaCompletada ?? false,

        personas: this.personas.controls.map((personaControl) => {

          const habilidadesArray = this.getHabilidades(
            this.personas.controls.indexOf(personaControl)
          );

          return {
            nombreCompleto: personaControl.value.nombreCompleto,
            edad: personaControl.value.edad,
            habilidades: habilidadesArray.value,
          };
        }),
      };

      // Guardar la tarea en el array local
      this.tareasGuardadas.push(tarea);

      // Almacenar las tareas en el localStorage
      localStorage.setItem(
        'tareasGuardadas',
        JSON.stringify(this.tareasGuardadas)
      );

      console.log('Tarea guardada:', tarea);

      // Resetear el formulario para crear una nueva tarea
      this.tareaForm.reset();
      this.personas.clear();
    } else {
      // Marcar todos los campos como tocados para mostrar validaciones
      this.tareaForm.markAllAsTouched();
    }
  }

  // Validar que cada persona tenga al menos una habilidad y que el nombre no este repetido
  validarPersonas(): boolean {
    let valid = true;
    this.personas.controls.forEach((personaControl, index) => {
      const habilidadesArray = this.getHabilidades(index);
      if (habilidadesArray.length === 0) {
        valid = false;
        personaControl
          .get('habilidadesGroup')
          ?.get('habilidades')
          ?.setErrors({ required: true });
      }
    });
    return valid;
  }
}
