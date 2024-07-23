import { Component } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-cargue-informacion',
  templateUrl: './cargue-informacion.component.html',
  styleUrls: ['./cargue-informacion.component.css'],
})
export class CargueInformacionComponent {
  nameFile: string = 'Cargar Excel';
  contratos: string[] = [
    'uno',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve',
    'diez',
  ];

  constructor(private peticionesService: PeticionesService) {
    this.peticionesService.obtenerContratos().subscribe((data: any) => {
      console.log(data);

      console.log(data[0].tipoContrato.nombre);
      console.log(data[0].fechaInicial);
      console.log(data[0].fechaFinal);
    });
  }
}
