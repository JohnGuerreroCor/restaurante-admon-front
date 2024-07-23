import { Component, ViewChild, AfterViewInit, OnInit, DoCheck, Input, SimpleChanges } from '@angular/core';
import { TablaHorarioServicio } from 'src/app/models/tabla-horario-servicio';
import { MatDialog } from '@angular/material/dialog';
import { DialogCrearHorarioServicio } from '../modal-nuevo-horario-servicio/modal-nuevo-horario-servicio.component';
import { ModalInhabilitarServicioComponent } from '../modal-inhabilitar-servicio/modal-inhabilitar-servicio.component';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { HorarioServicio } from 'src/app/models/horarioServicio';
import { DiasHorarioServicio } from 'src/app/models/diasHorarioServicio';
import { SedeService } from 'src/app/services/sede.service';
import { Sede } from 'src/app/models/sede';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-horario-servicio',
  templateUrl: './horario-servicio.component.html',
  styleUrls: ['./horario-servicio.component.css'],
})
export class HorarioServicioComponent implements AfterViewInit, OnInit {

  objetoVacio: HorarioServicio = {
    codigo: 0,
    horaIncioVenta: '',
    horaFinVenta: '',
    horaInicioAtencion: '',
    horaFinAtencion: '',
    tipoServicio: { codigo: 0, nombre: '', estado: 0 },
    uaa: { codigo: 0, nombre: '', correo: '', direccion: '', jefe: '', pagina: '', telefono: '' },
    estado: 0,
    observacionEstado: '',
    fechaEstado: '',
    cantidadComidas: 0,
    cantidadVentas: 0,
    cantidadTiquetes: 0
  }

  diasHorarioServicioObjetoVacio: DiasHorarioServicio = {
    codigo: 0,
    horarioServicio: this.objetoVacio,
    dia: { codigo: 0, nombre: '', posicion: 0 },
    estado: 0
  }

  infoTarjetas: HorarioServicio[] = [this.objetoVacio, this.objetoVacio, this.objetoVacio];
  diasHorarioServicio: DiasHorarioServicio[] = [];
  desayunos: DiasHorarioServicio[] = [];
  almuerzos: DiasHorarioServicio[] = [];
  cenas: DiasHorarioServicio[] = [];
  sedeSeleccionada!: Sede;
  isComponenteCargado: boolean = false;

  constructor(private dialog: MatDialog, private peticionesService: PeticionesService, private sedesService: SedeService) {
  }

  getSedeSeleccionada() {
    this.sedesService.getSeleccion().subscribe((seleccion) => {

      this.sedeSeleccionada = seleccion;
      this.actualizarTabla(seleccion);

    });
  }

  ngOnInit(): void {
    this.getSedeSeleccionada();
  }

  ngAfterViewInit() {
    
  }


  actualizarTabla(seleccion: Sede) {

    //reiniciar valores de las tarjetas
    this.infoTarjetas = [this.objetoVacio, this.objetoVacio, this.objetoVacio];
    this.diasHorarioServicio.length = 0;
    this.desayunos.length = 0;
    this.almuerzos.length = 0;
    this.cenas.length = 0;

    this.isComponenteCargado = true;

    this.peticionesService.obtenerDiasHorarioServicio().subscribe((data) => {

      //Filtrar por sede
      this.diasHorarioServicio = data.filter((item) => {
        return item.horarioServicio.uaa.codigo == seleccion.codigo;
      });

      //Formaterar los nombres de los dias correctamente
      this.diasHorarioServicio.filter((item) => {

        if (item.horarioServicio.tipoServicio.codigo == 1 && item.estado == 1) {
          item.dia.nombre.replace(/\s/g, '');
          this.desayunos.push(item);
        } else if (item.horarioServicio.tipoServicio.codigo == 2 && item.estado == 1) {
          item.dia.nombre.replace(/\s/g, '');
          this.almuerzos.push(item);
        } else if (item.horarioServicio.tipoServicio.codigo == 3 && item.estado == 1) {
          item.dia.nombre.replace(/\s/g, '');
          this.cenas.push(item);
        }
      });

      //Obtener los horarios de servicio
      this.peticionesService.obtenerHorariosServicio().subscribe((data) => {
        //Filtrar por sede
        this.infoTarjetas = data.filter((item) => {
          return item.uaa.codigo == seleccion.codigo;
        });
      })

    })


  }

  openDialog(element: any): void {

    const dialogRef = this.dialog.open(DialogCrearHorarioServicio, {
      data: element,
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');

      this.actualizarTabla(this.sedeSeleccionada);
    });
  }

  editarHorarioServicio(horarioServicio: HorarioServicio, dias: DiasHorarioServicio[]) {

    var datosEnviar: any = {}

    dias.forEach(item => item.dia.nombre = item.dia.nombre.toLowerCase().replace(/\s/g, ''));

    datosEnviar.tipoServicio = horarioServicio.tipoServicio;
    datosEnviar.diasSemana = dias;
    datosEnviar.inicioVentaTicket = horarioServicio.horaIncioVenta;
    datosEnviar.finVentaTicket = horarioServicio.horaFinVenta;
    datosEnviar.inicioHoraServicio = horarioServicio.horaInicioAtencion;
    datosEnviar.finHoraServicio = horarioServicio.horaFinAtencion;
    datosEnviar.codigo = horarioServicio.codigo;
    datosEnviar.cantidadComidas = horarioServicio.cantidadComidas;
    datosEnviar.cantidadVentas = horarioServicio.cantidadVentas;
    datosEnviar.cantidadTiquetes = horarioServicio.cantidadTiquetes;
    datosEnviar.estado = horarioServicio.estado;
    datosEnviar.fechaEstado = horarioServicio.fechaEstado;
    datosEnviar.observacionEstado = horarioServicio.observacionEstado;
    datosEnviar.uaa = horarioServicio.uaa;
    datosEnviar.diasHorarioServicio = this.diasHorarioServicio;

    this.openDialog(datosEnviar);

  }

  inhabilitarHabilitarDia(horarioServicio: HorarioServicio) {
    horarioServicio.estado = horarioServicio.estado == 1 ? 0 : 1;
    this.peticionesService.actualizarHorarioServicio(horarioServicio).subscribe((data) => { });
  }

}


