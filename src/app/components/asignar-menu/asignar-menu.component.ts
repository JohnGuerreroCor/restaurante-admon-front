import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TablaAsignarMenu } from 'src/app/models/tabla-asignar-menu';

const ELEMENT_DATA: TablaAsignarMenu[] = [
  {
    idTablaAsignarMenu: 1,
    opcionesMenu: 'bajo de sal',
    tipoServicio: 'premium',
    diaSemana: 'jueves',
    descripcionMenu: 'verduras salteadas',
    isEditing: false,
  },
];

@Component({
  selector: 'app-asignar-menu',
  templateUrl: './asignar-menu.component.html',
  styleUrls: ['./asignar-menu.component.css'],
})
export class AsignarMenuComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'opcionesMenu',
    'tipoServicio',
    'diaSemana',
    'descripcionMenu',
    'actions',
  ];
  dataSource = new MatTableDataSource<TablaAsignarMenu>(ELEMENT_DATA);
  copiaElement!: any;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatInput) filterInput!: MatInput;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // Method to handle the "Eliminar" button click
  eliminarCancelar(element: any) {
    // Implement your logic here to handle the disable action
    if (element.isEditing) {
      element.isEditing = false;
      Object.assign(element, this.copiaElement);
      this.copiaElement = null;
      console.log('Cancelar:', element);
    } else {
      console.log('Eliminar:', element);
    }
  }

  // Method to handle the "Editar" button click
  editarGuardar(element: any) {
    // Crear una copia inmutable del objeto sin hacer inmutable las propiedades internas
    this.copiaElement = { ...element };
    console.log('Editar:', element);
    element.isEditing = !element.isEditing;
  }

  // esta funcion no se esta usando, contrario, la logica de guardado y edicion ya la controla el metodo editar
  /* guardarCambios(element: any) {
    element.isEditing = false;
    this.copiaElement = null;
    console.log('Editado:', element);
  } */
}
