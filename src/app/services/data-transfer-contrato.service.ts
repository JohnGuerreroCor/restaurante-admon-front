import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Contrato } from '../models/contrato';

@Injectable({
  providedIn: 'root'
})
export class DataTransferContratoService {

  constructor() { }

  private dataSubject = new BehaviorSubject<Contrato>(
    {
      codigo: 0,
      tipoContrato: {
        codigo: 0,
        nombre: '',
        descripcion: '',
        estado: 0
      },
      dependencia: {
        codigo: 0,
        correo: '',
        direccion: '',
        jefe: '',
        nombre: '',
        pagina: '',
        telefono: ''
      },
      fechaInicial: '',
      fechaFinal: '',
      valorContrato: 0,
      subsidioDesayuno: 0,
      subsidioAlmuerzo: 0,
      subsidioCena: 0,
      pagoEstudianteDesayuno: 0,
      pagoEstudianteAlmuerzo: 0,
      pagoEstudianteCena: 0,
      cantidadDesayunos: 0,
      cantidadAlmuerzos: 0,
      cantidadCenas: 0,
      isEditing: false,
      estado: 1
    }
  ); // Puedes usar cualquier tipo de dato

  getData() {
    return this.dataSubject.asObservable();
  }

  setData(data: Contrato) {
    this.dataSubject.next(data);
  }
}
