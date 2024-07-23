import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { DiaBeneficio } from 'src/app/models/diaBeneficio';
import { GrupoGabu } from 'src/app/models/grupoGabu';
import { TablaGrupoGabu } from 'src/app/models/tabla-grupo-gabu';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { DialogNuevoSubsidiado } from '../modal-nuevo-subsidiado/modal-nuevo-subsidiado.component';
import { Dia } from 'src/app/models/dia';

@Component({
  selector: 'app-grupo-gabu',
  templateUrl: './grupo-gabu.component.html',
  styleUrls: ['./grupo-gabu.component.css'],
})
export class GrupoGabuComponent {
  displayedColumns: string[] = [
    'tipoGabu',
    'estado',
    'identificacion',
    'codigo',
    'nombre',
    'apellido',
    'programa',
    'vigencia',
    'desayuno',
    'almuerzo',
    'cena',
    'actions',
  ];

  dataSource = new MatTableDataSource<TablaGrupoGabu>([]);

  constructor(
    private dialog: MatDialog,
    private peticionesService: PeticionesService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNuevoSubsidiado, {
      width: '60%',
      data: {},
    });

    dialogRef.afterClosed().subscribe(() => {
      this.actualizarTabla();
    });
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatInput) filterInput!: MatInput;

  searchData = '';
  copiaElement!: any;

  ngOnInit(): void {
    this.actualizarTabla();
  }

  inhabilitarCancelar(element: any) {
    if (element.isEditing) {
      // Implement your logic here to handle the disable action
      delete element.diaBeneficio;
      element.isEditing = false;
      Object.assign(element, this.copiaElement);
      this.copiaElement = null;
    } else {
      if (confirm('Esta seguro de que desea borrar el registro?')) {
        // Implement your logic here to handle the disable action
        delete element.diaBeneficio;
        element.estado = 0;
        this.peticionesService.actualizarGrupoGabu(element).subscribe((res) => {
          this.actualizarTabla();
        });
      }
    }
  }

  editarGuardar(element: any) {
    // Crear una copia inmutable del objeto sin hacer inmutable las propiedades internas
    this.copiaElement = { ...element };
    element.isEditing = !element.isEditing;

    const datosModal: any = element;

    const dialogRef = this.dialog.open(DialogNuevoSubsidiado, {
      width: '60%',
      data: datosModal,
    });

    dialogRef.afterClosed().subscribe((result) => {
      element.isEditing = !element.isEditing;
      this.actualizarTabla();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  transformarDatos(data: any[]) {
    const transformedData: any = {};

    data.forEach((entry) => {
      const key = entry.codigo;

      if (!transformedData[key]) {
        transformedData[key] = {
          codigo: entry.codigo,
          tipoGabu: entry.tipoGabu,
          persona: entry.persona,
          usuario: entry.usuario,
          dependecia: entry.dependecia,
          vigencia: entry.vigencia,
          diasBeneficioCodigo: entry.diasBeneficioCodigo,
          diaCodigo: [],
          estado: entry.estado,
        };
      }

      transformedData[key].diaCodigo.push({
        codigo: entry.diaCodigo.codigo,
        nombre: entry.diaCodigo.nombre.trim(),
        posicion: entry.diaCodigo.posicion,
      });

      for (const codigo in transformedData) {
        if (transformedData.hasOwnProperty(codigo)) {
          const entry = transformedData[codigo];

          if (entry && entry.persona && entry.persona.identificacion) {
            const identificacion = entry.persona.identificacion;

            this.peticionesService
              .obtenerEstudianteById(identificacion)
              .subscribe((estudiante) => {
                transformedData[codigo].programa =
                  estudiante[0].programa.nombreCorto;
              });
          }
        }
      }
    });

    this.dataSource = new MatTableDataSource<TablaGrupoGabu>(
      Object.values(transformedData)
    );

    return Object.values(transformedData);
  }

  actualizarTabla() {
    this.peticionesService.obtenerGrupoGabus().subscribe((gabus) => {
      // Tu array de objetos original
      const datosOriginales = gabus as any; /* Tu array de objetos aquí */

      // Crear un objeto para almacenar datos únicos
      const datosUnicos: any = {};

      // Iterar sobre el array original
      datosOriginales.forEach((dato: any) => {
        const codigo = dato.codigo;

        // Si el código no está en el objeto de datos únicos, agregarlo
        if (!datosUnicos[codigo]) {
          datosUnicos[codigo] = {
            codigo: dato.codigo,
            tipoGabu: dato.tipoGabu,
            persona: dato.persona,
            codigoEstudiante: dato.codigoEstudiante,
            identificacion: dato.identificacion,
            programa: dato.programa,
            vigencia: dato.vigencia,
            estado: dato.estado,
            diaBeneficio: [],
          };
        }

        // Agregar la información de diaBeneficio sin duplicados
        const diaBeneficio = dato.diaBeneficio;
        if (
          !datosUnicos[codigo].diaBeneficio.some(
            (dia: any) => dia.codigo === diaBeneficio.codigo
          )
        ) {
          datosUnicos[codigo].diaBeneficio.push(diaBeneficio);
        }
      });

      // Ordenar los días dentro de cada grupo
      Object.values(datosUnicos).forEach((grupo: any) => {
        grupo.diaBeneficio.sort((a: any, b: any) => {
          // Ordenar por tipo de servicio y luego por día de la semana
          if (a.tipoServicio.codigo !== b.tipoServicio.codigo) {
            return a.tipoServicio.codigo - b.tipoServicio.codigo;
          } else {
            return a.dia.posicion - b.dia.posicion;
          }
        });
      });

      // Obtener un array de objetos únicos
      const datosComprimidos = Object.values(datosUnicos);

      this.dataSource = new MatTableDataSource<any>(datosComprimidos);
    });
  }
}
