import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GrupoGabu } from 'src/app/models/grupoGabu';
import { Persona } from 'src/app/models/persona';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { TablaGrupoGabu } from 'src/app/models/tabla-grupo-gabu';
import { Router } from '@angular/router';
import { DiaBeneficio } from 'src/app/models/diaBeneficio';

@Component({
  selector: 'app-modal-nuevo-subsidiado',
  templateUrl: './modal-nuevo-subsidiado.component.html',
  styleUrls: ['./modal-nuevo-subsidiado.component.css'],
})
export class ModalNuevoSubsidiadoComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNuevoSubsidiado, {
      width: '60%',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}

@Component({
  selector: 'dialog-nuevo-subsidiado',
  templateUrl: 'dialog-nuevo-subsidiado.html',
  styleUrls: ['dialog-nuevo-subsidiado.css'],
})
export class DialogNuevoSubsidiado implements OnInit {
  daysOfWeek = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo',
  ];
  mealTypes = ['desayuno', 'almuerzo', 'cena'];

  selectedMeals: { [key: string]: boolean } = {}; // Para almacenar las selecciones de comidas
  selectAll: boolean = false;

  controlForm!: FormGroup;

  myControl = new FormControl();
  options: string[] = [
    '20191176712 - 1076909715 - alejo - educacion - 20201',
    '20149241 - 201876723 - juana - ciencias - 20192',
    '43243242 - 202041242 - mauricio - sociales - 20102',
  ];
  filteredOptions!: Observable<string[]>;
  dataSplited!: string[];
  opcionSeleccionada: string[] = [];
  isInfoVisible: boolean = false;
  radioSeleccionado!: string;
  gabu: TablaGrupoGabu = new TablaGrupoGabu();
  estudiante!: any;
  diasData: any[] = [];
  isEditing: boolean = false;

  estudiantes: Persona[] = [];

  @Output() dialogClosed = new EventEmitter<void>();
  constructor(
    public dialogRef: MatDialogRef<DialogNuevoSubsidiado>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private peticionesService: PeticionesService,
    private router: Router
  ) {}

  inicializarSelecciones() {
    if (
      this.data !== null &&
      this.data !== undefined &&
      Object.keys(this.data).length !== 0
    ) {
      this.isEditing = true;

      this.gabu.identificacion = this.data.identificacion;
      this.gabu.nombre =
        this.data.persona.nombre + ' ' + this.data.persona.apellido;
      this.gabu.codigoEstudiante = this.data.codigoEstudiante;
      this.gabu.programa = this.data.programa;
      this.gabu.vigencia = this.data.vigencia;
      this.radioSeleccionado = this.data.tipoGabu.nombre.toLowerCase().trim();

      this.data.diaBeneficio.forEach((item: any) => {
        const key =
          item.dia.nombre.toLowerCase().trim() +
          '-' +
          item.tipoServicio.nombre.toLowerCase().trim();

        this.selectedMeals[key] = item.estado === 1;
      });

      this.isInfoVisible = true;
    } else {
    }
  }

  ngOnInit() {
    //activelos y creelos
    this.toggleSelectAll('desayuno');
    this.toggleSelectAll('almuerzo');
    this.toggleSelectAll('cena');
    //desactivelos
    this.toggleSelectAll('desayuno');
    this.toggleSelectAll('almuerzo');
    this.toggleSelectAll('cena');

    this.inicializarSelecciones();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.dialogClosed.emit();
  }

  buscarEstudiante() {
    let codigo = this.myControl.value;
    if (codigo === null || codigo === undefined) {
      codigo = 0;
    }
    this.peticionesService
      .obtenerEstudianteByCodigo(codigo)
      .subscribe((data) => {
        if (data === null || data === undefined || data.length === 0) {
          alert('No se encontraron resultados');
        } else {
          this.estudiante = data;

          this.gabu.codigoEstudiante = data[0].codigo;
          this.gabu.identificacion = data[0].persona.identificacion;
          this.gabu.nombre =
            data[0].persona.nombre + ' ' + data[0].persona.apellido;
          this.gabu.programa = data[0].programa.nombreCorto;

          this.isInfoVisible = true;
        }
      });
  }

  guardarRegistro() {
    if (this.isEditing) {
      let registroActualizar = new GrupoGabu();

      registroActualizar.codigo = this.data.codigo;
      registroActualizar.persona = {
        codigo: this.data.persona.codigo,
        nombre: '',
        apellido: '',
        identificacion: '',
      };
      registroActualizar.codigoEstudiante = this.data.codigoEstudiante;

      if (this.radioSeleccionado === 'supervisor') {
        registroActualizar.tipoGabu = { codigo: 1, nombre: '', estado: 1 };
      }
      if (this.radioSeleccionado === 'subsidiado') {
        registroActualizar.tipoGabu = { codigo: 2, nombre: '', estado: 1 };
      }

      registroActualizar.vigencia = new Date(
        this.gabu.vigencia.toString()
      ).toISOString();
      registroActualizar.estado = 1;

      this.peticionesService
        .actualizarGrupoGabu(registroActualizar)
        .subscribe((res) => {
          for (const meal in this.selectedMeals) {
            if (this.selectedMeals.hasOwnProperty(meal)) {
              const isSelected: boolean = this.selectedMeals[meal];

              const daysOfWeek = [
                'lunes',
                'martes',
                'miercoles',
                'jueves',
                'viernes',
                'sabado',
                'domingo',
              ];
              const mealDay = ['desayuno', 'almuerzo', 'cena'];

              const comida = meal.split('-');

              let codigoDia = daysOfWeek.indexOf(comida[0]) + 1;
              let tipoServicio = mealDay.indexOf(comida[1]) + 1;

              let activo = 0;

              if (isSelected) {
                activo = 1;
              } else {
                activo = 0;
              }

              let diaBeneficio: any = {
                codigo: 0,
                codigoGrupoGabu: this.data.codigo,
                dia: { codigo: codigoDia, nombre: '', posicion: 0 },
                estado: activo,
                tipoServicio: { codigo: tipoServicio, nombre: '', estado: 1 },
              };

              this.peticionesService
                .actualizarDiaBeneficio(diaBeneficio)
                .subscribe((res) => {
                  if (
                    comida[0].trim().toLowerCase() === 'domingo' &&
                    comida[1].trim().toLowerCase() === 'cena'
                  ) {
                    this.onNoClick();
                  }
                });
            }
          }
        });
    } else {
      this.gabu.estado = 1;

      let request = new GrupoGabu();
      request.tipoGabu = { codigo: this.gabu.tipoGabu, nombre: '', estado: 1 };
      request.persona = {
        identificacion: this.gabu.identificacion.toString(),
        nombre: this.estudiante[0].persona.nombre,
        apellido: this.estudiante[0].persona.apellido,
        codigo: this.estudiante[0].persona.codigo,
      };

      let fecha = new Date(this.gabu.vigencia);

      request.codigoEstudiante = this.estudiante[0].codigo;
      request.vigencia = fecha ? fecha.toISOString() : request.vigencia;
      request.estado = 1;

      this.peticionesService.crearGrupoGabu(request).subscribe((res) => {
        const daysOfWeek = [
          'lunes',
          'martes',
          'miércoles',
          'jueves',
          'viernes',
          'sábado',
          'domingo',
        ];
        const mealDay = ['desayuno', 'almuerzo', 'cena'];

        const selectedDays: DiaBeneficio[] = [];

        daysOfWeek.forEach((day) => {
          mealDay.forEach((meal) => {
            const codigoDia = daysOfWeek.indexOf(day) + 1;
            const codigoTipoServicio = mealDay.indexOf(meal) + 1;
            const diaBeneficio: DiaBeneficio = {
              codigo: 0,
              codigoGrupoGabu: res,
              dia: { codigo: codigoDia, nombre: day, posicion: 0 },
              estado: 1,
              tipoServicio: {
                codigo: codigoTipoServicio,
                nombre: meal,
                estado: 1,
              },
            };
            selectedDays.push(diaBeneficio);
          });
        });

        this.peticionesService
          .crearDiasBeneficio(selectedDays)
          .subscribe((response) => {
            if (response) {
              this.onNoClick();
            }
          });
      });
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    var result = event.option.viewValue.split('-');

    this.opcionSeleccionada.length = 0;

    result.forEach((e) => {
      this.opcionSeleccionada.push(e.trim());
    });

    this.isInfoVisible = true;
  }

  toggleMealSelection(day: string, mealType: string) {
    const key = day + '-' + mealType;
    this.selectedMeals[key] = !this.selectedMeals[key];
  }

  toggleSelectAll(mealType: string) {
    const allSelected = this.isAllSelected(mealType);
    for (const day of this.daysOfWeek) {
      const key = day + '-' + mealType;
      this.selectedMeals[key] = !allSelected;
    }
  }

  isAllSelected(mealType: string): boolean {
    return this.daysOfWeek.every((day) => {
      const key = day + '-' + mealType;
      return this.selectedMeals[key];
    });
  }

  seleccionRadio(value: string) {
    if (value === 'supervisor') {
      this.gabu.tipoGabu = 1;
    }
    if (value === 'subsidiado') {
      this.gabu.tipoGabu = 2;
    }
    if (value === undefined || value === null) {
      alert('Debe seleccionar si es supervisor o subsidiado');
    }
  }
}
