import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TablaContratos } from 'src/app/models/tabla-contratos';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInput } from '@angular/material/input';
import { DataTransferContratoService } from 'src/app/services/data-transfer-contrato.service';
import { Contrato } from 'src/app/models/contrato';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent implements AfterViewInit, OnInit {

  listadoContratos: Contrato[] = [];

  dataSource = new MatTableDataSource<Contrato>([]);

  displayedColumns: string[] = [
    'tipoContrato',
    'dependencia',
    'fechaInicial',
    'fechaFinal',
    'pagoEstudianteDesayuno',
    'pagoEstudianteAlmuerzo',
    'pagoEstudianteCena',
    'subsidioDesayuno',
    'subsidioAlmuerzo',
    'subsidioCena',
    'cantidadDesayunos',
    'cantidadAlmuerzos',
    'cantidadCenas',
    'valorContrato',
    'estado',
    'actions'
  ];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatInput) filterInput!: MatInput;

  searchData = '';
  copiaElement!: any;
  receivedData!: Contrato;

  contrato: Contrato = {
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
  };

  constructor(
    private dataService: DataTransferContratoService,
    private router: Router,
    private peticionesService: PeticionesService
  ) {
  }

  ngAfterViewInit() {

  }

  ngOnInit() {

    this.actualizarTabla();

    this.dataService.getData().subscribe(data => {

      this.receivedData = data;

      this.actualizarTabla();

    });
  }

  actualizarTabla() {
    this.peticionesService.obtenerContratos().subscribe((data) => {
      this.listadoContratos = data;
      this.dataSource = new MatTableDataSource<Contrato>(data);
      this.paginator.firstPage();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filter = this.searchData.trim().toLowerCase();

    })
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Method to handle the "Editar" button click
  editarGuardar(element: any) {
    element.isEditing = true;
    this.sendData(element);
    this.router.navigate(['/crearContrato']);
  }


  // Method to handle the "Eliminar" button click
  inhabilitarCancelar(element: any) {
    // Implement your logic here to handle the disable action
    if (element.isEditing) {
      element.isEditing = false;
      Object.assign(element, this.copiaElement);
      this.copiaElement = null;
    } else {

      if (confirm("Esta seguro de que desea borrar el registro?")) {
        element.estado = 0;
        this.peticionesService.actualizarContrato(element).subscribe((data) => {
          this.actualizarTabla();
        });
      }
    }
  }

  formatDateRange(dateRangeString: string, dateRegex: RegExp) {

    // Extraer las fechas del string usando la expresión regular
    const matches = dateRangeString.match(dateRegex);

    if (matches && matches.length >= 1) {

      // Parsear las fechas
      const startDate = new Date(matches[0]);

      // Formatear las fechas en el formato deseado (mes/dia/año)
      const formattedStartDate = `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`;

      // Retornar el resultado
      return `${formattedStartDate}`;
    } else {
      return "Formato de fecha inválido";
    }
  }


  // Función para transformar los datos de la tabla
  transformarDatosTabla(element_data: TablaContratos[]) {
    const regex = /(\w{3} \w{3} \d{2} \d{4})/g; // Expresión regular para extraer las fechas en el formato deseado

    element_data.forEach(e => {
      // Formatear las fechas en 'fechaInicial' y 'fechaFinal'
      e.fechaInicial = this.formatDateRange(e.fechaInicial, regex);
      e.fechaFinal = this.formatDateRange(e.fechaFinal, regex);
    });
  }

  sendData(row: any) {
    this.dataService.setData(row);
  }

}
