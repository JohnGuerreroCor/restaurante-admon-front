import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TablaSupervisor } from 'src/app/models/tabla-supervisor';
import { DialogNuevoSubsidiado } from '../modal-nuevo-subsidiado/modal-nuevo-subsidiado.component';

const ELEMENT_DATA: TablaSupervisor[] = [
  { idTablaSupervisor: 1, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'activo', identificacion: 1076898716, codigo: 'u20191178342', nombreSupervisorEstudiantil: 'fabian murcia canaberales', programa: 'ing de petroleos', periodoAcademico: 20231, fechaIncial: '24-07-2023', fechaFinal: '30-07-2023' },
  { idTablaSupervisor: 2, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'inactivo', identificacion: 1076898717, codigo: 'u20191178343', nombreSupervisorEstudiantil: 'Laura González', programa: 'Ingeniería Civil', periodoAcademico: 20231, fechaIncial: '01-08-2023', fechaFinal: '15-12-2023' },
  { idTablaSupervisor: 3, isEditing: false, opcionesSupervisor: 'tipo 3', estadoSupervisor: 'activo', identificacion: 1076898718, codigo: 'u20191178344', nombreSupervisorEstudiantil: 'Carlos Ramírez', programa: 'Licenciatura en Historia', periodoAcademico: 20231, fechaIncial: '10-08-2023', fechaFinal: '30-11-2023' },
  { idTablaSupervisor: 4, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'inactivo', identificacion: 1076898719, codigo: 'u20191178345', nombreSupervisorEstudiantil: 'Ana López', programa: 'Ingeniería de Sistemas', periodoAcademico: 20231, fechaIncial: '20-08-2023', fechaFinal: '25-11-2023' },
  { idTablaSupervisor: 5, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'activo', identificacion: 1076898720, codigo: 'u20191178346', nombreSupervisorEstudiantil: 'Diego Mendoza', programa: 'Licenciatura en Música', periodoAcademico: 20231, fechaIncial: '05-09-2023', fechaFinal: '10-12-2023' },
  { idTablaSupervisor: 6, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'inactivo', identificacion: 1076898721, codigo: 'u20191178347', nombreSupervisorEstudiantil: 'Sara Jiménez', programa: 'Ingeniería Industrial', periodoAcademico: 20231, fechaIncial: '15-09-2023', fechaFinal: '30-11-2023' },
  { idTablaSupervisor: 7, isEditing: false, opcionesSupervisor: 'tipo 3', estadoSupervisor: 'activo', identificacion: 1076898722, codigo: 'u20191178348', nombreSupervisorEstudiantil: 'Hugo Sánchez', programa: 'Licenciatura en Filosofía', periodoAcademico: 20231, fechaIncial: '01-10-2023', fechaFinal: '15-12-2023' },
  { idTablaSupervisor: 8, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'inactivo', identificacion: 1076898723, codigo: 'u20191178349', nombreSupervisorEstudiantil: 'María Torres', programa: 'Ingeniería Química', periodoAcademico: 20231, fechaIncial: '10-10-2023', fechaFinal: '30-11-2023' },
  { idTablaSupervisor: 9, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'activo', identificacion: 1076898724, codigo: 'u20191178350', nombreSupervisorEstudiantil: 'Pedro González', programa: 'Licenciatura en Psicología', periodoAcademico: 20231, fechaIncial: '20-10-2023', fechaFinal: '25-12-2023' },
  { idTablaSupervisor: 10, isEditing: false, opcionesSupervisor: 'tipo 3', estadoSupervisor: 'inactivo', identificacion: 1076898725, codigo: 'u20191178351', nombreSupervisorEstudiantil: 'Carolina Ramírez', programa: 'Ingeniería Ambiental', periodoAcademico: 20231, fechaIncial: '05-11-2023', fechaFinal: '10-12-2023' },
  { idTablaSupervisor: 11, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'activo', identificacion: 1076898726, codigo: 'u20191178352', nombreSupervisorEstudiantil: 'Javier Mendoza', programa: 'Licenciatura en Ciencias Sociales', periodoAcademico: 20231, fechaIncial: '15-11-2023', fechaFinal: '30-11-2023' },
  { idTablaSupervisor: 12, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'inactivo', identificacion: 1076898727, codigo: 'u20191178353', nombreSupervisorEstudiantil: 'Laura Rodríguez', programa: 'Ingeniería Electrónica', periodoAcademico: 20231, fechaIncial: '01-12-2023', fechaFinal: '15-01-2024' },
  { idTablaSupervisor: 13, isEditing: false, opcionesSupervisor: 'tipo 3', estadoSupervisor: 'activo', identificacion: 1076898728, codigo: 'u20191178354', nombreSupervisorEstudiantil: 'Hugo Pérez', programa: 'Licenciatura en Biología', periodoAcademico: 20231, fechaIncial: '10-12-2023', fechaFinal: '30-01-2024' },
  { idTablaSupervisor: 14, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'inactivo', identificacion: 1076898729, codigo: 'u20191178355', nombreSupervisorEstudiantil: 'Sara Gómez', programa: 'Ingeniería de Telecomunicaciones', periodoAcademico: 20231, fechaIncial: '20-12-2023', fechaFinal: '25-01-2024' },
  { idTablaSupervisor: 15, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'activo', identificacion: 1076898730, codigo: 'u20191178356', nombreSupervisorEstudiantil: 'Pedro Sánchez', programa: 'Licenciatura en Educación', periodoAcademico: 20231, fechaIncial: '05-01-2024', fechaFinal: '10-04-2024' },
  { idTablaSupervisor: 16, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'inactivo', identificacion: 1076898731, codigo: 'u20191178357', nombreSupervisorEstudiantil: 'Carla Ramírez', programa: 'Ingeniería Mecánica', periodoAcademico: 20231, fechaIncial: '15-01-2024', fechaFinal: '30-03-2024' },
  { idTablaSupervisor: 17, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'activo', identificacion: 1076898732, codigo: 'u20191178358', nombreSupervisorEstudiantil: 'Andrea Gómez', programa: 'Licenciatura en Literatura', periodoAcademico: 20231, fechaIncial: '01-02-2024', fechaFinal: '15-04-2024' },
  { idTablaSupervisor: 18, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'inactivo', identificacion: 1076898733, codigo: 'u20191178359', nombreSupervisorEstudiantil: 'Roberto Torres', programa: 'Ingeniería Eléctrica', periodoAcademico: 20231, fechaIncial: '10-02-2024', fechaFinal: '30-04-2024' },
  { idTablaSupervisor: 19, isEditing: false, opcionesSupervisor: 'tipo 3', estadoSupervisor: 'activo', identificacion: 1076898734, codigo: 'u20191178360', nombreSupervisorEstudiantil: 'Laura Pérez', programa: 'Licenciatura en Idiomas', periodoAcademico: 20231, fechaIncial: '05-03-2024', fechaFinal: '10-06-2024' },
  { idTablaSupervisor: 20, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'inactivo', identificacion: 1076898735, codigo: 'u20191178361', nombreSupervisorEstudiantil: 'Jorge Ramírez', programa: 'Ingeniería Agrícola', periodoAcademico: 20231, fechaIncial: '15-03-2024', fechaFinal: '30-06-2024' },
  { idTablaSupervisor: 21, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'activo', identificacion: 1076898736, codigo: 'u20191178362', nombreSupervisorEstudiantil: 'María Gutiérrez', programa: 'Licenciatura en Artes Visuales', periodoAcademico: 20231, fechaIncial: '01-04-2024', fechaFinal: '15-07-2024' },
  { idTablaSupervisor: 22, isEditing: false, opcionesSupervisor: 'tipo 3', estadoSupervisor: 'inactivo', identificacion: 1076898737, codigo: 'u20191178363', nombreSupervisorEstudiantil: 'Juan Torres', programa: 'Ingeniería Informática', periodoAcademico: 20231, fechaIncial: '10-04-2024', fechaFinal: '30-07-2024' },
  { idTablaSupervisor: 23, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'activo', identificacion: 1076898738, codigo: 'u20191178364', nombreSupervisorEstudiantil: 'Carolina Gómez', programa: 'Licenciatura en Danza', periodoAcademico: 20231, fechaIncial: '05-05-2024', fechaFinal: '10-08-2024' },
  { idTablaSupervisor: 24, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'inactivo', identificacion: 1076898739, codigo: 'u20191178365', nombreSupervisorEstudiantil: 'Pedro Ramírez', programa: 'Ingeniería de Alimentos', periodoAcademico: 20231, fechaIncial: '15-05-2024', fechaFinal: '30-08-2024' },
  { idTablaSupervisor: 25, isEditing: false, opcionesSupervisor: 'tipo 3', estadoSupervisor: 'activo', identificacion: 1076898740, codigo: 'u20191178366', nombreSupervisorEstudiantil: 'Laura Mendoza', programa: 'Licenciatura en Arquitectura', periodoAcademico: 20231, fechaIncial: '01-06-2024', fechaFinal: '15-09-2024' },
  { idTablaSupervisor: 26, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'inactivo', identificacion: 1076898741, codigo: 'u20191178367', nombreSupervisorEstudiantil: 'Javier Sánchez', programa: 'Ingeniería Biomédica', periodoAcademico: 20231, fechaIncial: '10-06-2024', fechaFinal: '30-09-2024' },
  { idTablaSupervisor: 27, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'activo', identificacion: 1076898742, codigo: 'u20191178368', nombreSupervisorEstudiantil: 'María Ramírez', programa: 'Licenciatura en Economía', periodoAcademico: 20231, fechaIncial: '05-07-2024', fechaFinal: '10-10-2024' },
  { idTablaSupervisor: 28, isEditing: false, opcionesSupervisor: 'tipo 3', estadoSupervisor: 'inactivo', identificacion: 1076898743, codigo: 'u20191178369', nombreSupervisorEstudiantil: 'Carlos Torres', programa: 'Ingeniería Civil', periodoAcademico: 20231, fechaIncial: '15-07-2024', fechaFinal: '30-10-2024' },
  { idTablaSupervisor: 29, isEditing: false, opcionesSupervisor: 'tipo 1', estadoSupervisor: 'activo', identificacion: 1076898744, codigo: 'u20191178370', nombreSupervisorEstudiantil: 'Sofía Gómez', programa: 'Licenciatura en Psicopedagogía', periodoAcademico: 20231, fechaIncial: '01-08-2024', fechaFinal: '15-11-2024' },
  { idTablaSupervisor: 30, isEditing: false, opcionesSupervisor: 'tipo 2', estadoSupervisor: 'inactivo', identificacion: 1076898745, codigo: 'u20191178371', nombreSupervisorEstudiantil: 'Diego Ramírez', programa: 'Ingeniería de Minas', periodoAcademico: 20231, fechaIncial: '10-08-2024', fechaFinal: '30-11-2024' },
  { idTablaSupervisor: 31, isEditing: false, opcionesSupervisor: 'tipo 3', estadoSupervisor: 'activo', identificacion: 1076898746, codigo: 'u20191178372', nombreSupervisorEstudiantil: 'Laura Sánchez', programa: 'Licenciatura en Comunicación Social', periodoAcademico: 20231, fechaIncial: '05-09-2024', fechaFinal: '10-12-2024' },
];


@Component({
  selector: 'app-subsidiados',
  templateUrl: './subsidiados.component.html',
  styleUrls: ['./subsidiados.component.css']
})
export class SubsidiadosComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'opcionesSupervisor',
    'estadoSupervisor',
    'identificacion',
    'codigo',
    'nombreSupervisorEstudiantil',
    'programa',
    'periodoAcademico',
    'fechaIncial',
    'fechaFinal',
    'actions'
  ];

  anios: number[] = [];
  periodos: string[] = ["primer periodo", "segundo periodo"];

  dataSource = new MatTableDataSource<TablaSupervisor>(ELEMENT_DATA);
  copiaElement!: any;


  searchData = '';

  constructor(private dialog: MatDialog) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatInput) filterInput!: MatInput;

  ngOnInit(): void {
    this.inicializarAnios();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Method to handle the "Editar" button click
  editarGuardar(element: any) {
    // Crear una copia inmutable del objeto sin hacer inmutable las propiedades internas
    this.copiaElement = { ...element };
    element.isEditing = !element.isEditing;

    const datosModal: any = element;


    const dialogRef = this.dialog.open(DialogNuevoSubsidiado, {
      data: datosModal,
    });

    dialogRef.afterClosed().subscribe(result => {
      element.isEditing = !element.isEditing;
    });

  }


  // Method to handle the "Eliminar" button click
  inhabilitarCancelar(element: any) {
    // Implement your logic here to handle the disable action
    if (element.isEditing) {
      element.isEditing = false;
      Object.assign(element, this.copiaElement);
      this.copiaElement = null;
    } else {
    }
  }

  inicializarAnios(): void {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();

    for (let i = year - 10; i <= year; i++) {
      this.anios.push(i);
    }
  }
}
