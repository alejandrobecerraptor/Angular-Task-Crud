export interface Tarea {
  nombreTarea: string;
  fechaLimite: string;
  tareaCompletada: boolean;
  personas: Persona[];
}

export interface Persona {
  nombreCompleto: string;
  edad: number;
  habilidades: string[];
}
