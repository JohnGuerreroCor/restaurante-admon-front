import { Component, Inject, NgModule } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TablaHorarioServicio } from 'src/app/models/tabla-horario-servicio';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { TipoServicio } from 'src/app/models/tipoServicio';
import { HorarioServicio } from 'src/app/models/horarioServicio';
import { DiasHorarioServicio } from 'src/app/models/diasHorarioServicio';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-modal-nuevo-horario-servicio',
  templateUrl: './modal-nuevo-horario-servicio.component.html',
  styleUrls: ['./modal-nuevo-horario-servicio.component.css']
})
export class ModalNuevoHorarioServicioComponent {

  horarioServicio!: HorarioServicio;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCrearHorarioServicio, {
      data: null,
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}

@Component({
  selector: 'dialog-crear-horario-servicio',
  templateUrl: 'dialog-crear-horario-servicio.html',
  styleUrls: ['dialog-crear-horario-servicio.css']
})
export class DialogCrearHorarioServicio {

  time = { hour: 13, minute: 30 };
  meridian = true;

  tiposServicio!: TipoServicio[];

  servicioForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogCrearHorarioServicio>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private peticionesService: PeticionesService,
  ) {

    //console.log(data);


    this.peticionesService.obtenerTipoServicio().subscribe((data: TipoServicio[]) => {

      this.tiposServicio = data;

      const tipoServicioControl = this.servicioForm.get('tipoServicio');

      if (tipoServicioControl) {
        tipoServicioControl.setValue(this.tiposServicio[this.data.tipoServicio.codigo - 1]);
        tipoServicioControl.disable(); // Deshabilita el control para que no se pueda cambiar el tipo de servicio
      }


    });

    if (data == null) {
      this.servicioForm = this._formBuilder.group({
        tipoServicio: ['Default', Validators.required],
        cantidadComidas: [1, Validators.required],
        cantidadVentas: [1, Validators.required],
        cantidadTiquetes: [1, Validators.required],
        diasSemana: this._formBuilder.group({
          lunes: [false],
          martes: [false],
          miercoles: [false],
          jueves: [false],
          viernes: [false],
          sabado: [false],
          domingo: [false],
        }),
        inicioVentaTicket: new FormControl(new Date()),
        finVentaTicket: new FormControl(new Date()),
        inicioHoraServicio: new FormControl(new Date()),
        finHoraServicio: new FormControl(new Date()),
      });
    } else {

      const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
      const booleanValues = [];

      for (const dia of diasSemana) {
        booleanValues.push(false);
      }

      for (const dias of data.diasSemana) {
        const nombreDia = dias.dia.nombre.toLowerCase();
        const indice = diasSemana.indexOf(nombreDia);

        if (indice !== -1) {
          booleanValues[indice] = true;
        }
      }

      const inicioVentaTicket = new Date(2023, 11, 21);

      inicioVentaTicket.setHours(parseInt(data.inicioVentaTicket.split(":")[0], 10));
      inicioVentaTicket.setMinutes(parseInt(data.inicioVentaTicket.split(":")[1], 10));

      const finVentaTicket = new Date(2023, 11, 21);

      finVentaTicket.setHours(parseInt(data.finVentaTicket.split(":")[0], 10));
      finVentaTicket.setMinutes(parseInt(data.finVentaTicket.split(":")[1], 10));

      const inicioHoraServicio = new Date(2023, 11, 21);

      inicioHoraServicio.setHours(parseInt(data.inicioHoraServicio.split(":")[0], 10));
      inicioHoraServicio.setMinutes(parseInt(data.inicioHoraServicio.split(":")[1], 10));

      const finHoraServicio = new Date(2023, 11, 21);

      finHoraServicio.setHours(parseInt(data.finHoraServicio.split(":")[0], 10));
      finHoraServicio.setMinutes(parseInt(data.finHoraServicio.split(":")[1], 10));


      // Verifica que data no sea nulo o indefinido antes de acceder a sus propiedades
      if (data.tipoServicio && data.diasSemana && data.inicioVentaTicket && data.finVentaTicket && data.inicioHoraServicio && data.finHoraServicio) {
        this.servicioForm = this._formBuilder.group({
          tipoServicio: new FormControl(),//data.tipoServicio, Validators.required
          cantidadComidas: new FormControl(data.cantidadComidas, Validators.required),
          cantidadVentas: new FormControl(data.cantidadVentas, Validators.required),
          cantidadTiquetes: new FormControl(data.cantidadTiquetes, Validators.required),
          diasSemana: this._formBuilder.group(
            {
              lunes: [booleanValues[0]],
              martes: [booleanValues[1]],
              miercoles: [booleanValues[2]],
              jueves: [booleanValues[3]],
              viernes: [booleanValues[4]],
              sabado: [booleanValues[5]],
              domingo: [booleanValues[6]],
            }
          ),
          horaIncioVenta: new FormControl(inicioVentaTicket),
          horaFinVenta: new FormControl(finVentaTicket),
          horaInicioAtencion: new FormControl(inicioHoraServicio),
          horaFinAtencion: new FormControl(finHoraServicio),
        });
      } else {
        console.error("Data no contiene todas las propiedades necesarias.");
      }
    }



  }

  onNoClick(result?: any): void {
    this.dialogRef.close(result);
  }

  // Obtener el control de los días de la semana como un formulario de matriz
  get diasSemana() {
    return this.servicioForm.get('diasSemana') as FormGroup;
  }

  guardarRegistro() {
    //implementar la lógica para guardar el registro
    let horarioServicio = { ...this.servicioForm.value };

    delete horarioServicio.diasSemana;

    const horarioEnviar: HorarioServicio = horarioServicio;

    horarioEnviar.codigo = this.data.codigo;
    horarioEnviar.estado = this.data.estado;
    horarioEnviar.fechaEstado = this.data.fechaEstado;
    horarioEnviar.observacionEstado = this.data.observacionEstado;
    horarioEnviar.uaa = this.data.uaa;
    horarioEnviar.horaInicioAtencion = new Date(horarioEnviar.horaInicioAtencion).toLocaleTimeString("en-US", { timeStyle: "medium", hour12: false });
    horarioEnviar.horaFinAtencion = new Date(horarioEnviar.horaFinAtencion).toLocaleTimeString("en-US", { timeStyle: "medium", hour12: false });
    horarioEnviar.horaFinVenta = new Date(horarioEnviar.horaFinVenta).toLocaleTimeString("en-US", { timeStyle: "medium", hour12: false });
    horarioEnviar.horaIncioVenta = new Date(horarioEnviar.horaIncioVenta).toLocaleTimeString("en-US", { timeStyle: "medium", hour12: false });


    /* this.peticionesService.actualizarHorarioServicio(horarioEnviar).subscribe((data: number) => {

      const diasSeleccionados = Object.keys(this.servicioForm.value.diasSemana).filter(dia => this.servicioForm.value.diasSemana[dia]);;
      const diasNoSeleccionados = Object.keys(this.servicioForm.value.diasSemana).filter(dia => !this.servicioForm.value.diasSemana[dia]);;

      let diassFiltrados1: DiasHorarioServicio[] = [];
      let diassFiltrados2: DiasHorarioServicio[] = [];

      if (this.data.tipoServicio.codigo == 1) {
        const tipo1 = this.data.diasHorarioServicio.slice(0, 7);

        diassFiltrados1 = tipo1.filter((item: DiasHorarioServicio) => {
          const nombreDia = item.dia.nombre.toLowerCase().trim();
          return diasSeleccionados.includes(nombreDia);
        });

        diassFiltrados2 = tipo1.filter((item: DiasHorarioServicio) => {
          const nombreDia = item.dia.nombre.toLowerCase().trim();
          return diasNoSeleccionados.includes(nombreDia);
        });

      }

      if (this.data.tipoServicio.codigo == 2) {
        const tipo2 = this.data.diasHorarioServicio.slice(7, 14);

        diassFiltrados1 = tipo2.filter((item: DiasHorarioServicio) => {
          const nombreDia = item.dia.nombre.toLowerCase().trim();
          return diasSeleccionados.includes(nombreDia);
        });

        diassFiltrados2 = tipo2.filter((item: DiasHorarioServicio) => {
          const nombreDia = item.dia.nombre.toLowerCase().trim();
          return diasNoSeleccionados.includes(nombreDia);
        });
      }

      if (this.data.tipoServicio.codigo == 3) {
        const tipo3 = this.data.diasHorarioServicio.slice(14, 21);

        diassFiltrados1 = tipo3.filter((item: DiasHorarioServicio) => {
          const nombreDia = item.dia.nombre.toLowerCase().trim();
          return diasSeleccionados.includes(nombreDia);
        });

        diassFiltrados2 = tipo3.filter((item: DiasHorarioServicio) => {
          const nombreDia = item.dia.nombre.toLowerCase().trim();
          return diasNoSeleccionados.includes(nombreDia);
        });
      }

      const observables1 = diassFiltrados1.map((dia: DiasHorarioServicio) => {
        dia.estado = 1;
        return this.peticionesService.actualizarDiasHorarioServicio(dia);
      });

      const observables2 = diassFiltrados2.map((dia: DiasHorarioServicio) => {
        dia.estado = 0;
        return this.peticionesService.actualizarDiasHorarioServicio(dia);
      });

      // Combina los observables en un solo observable usando forkJoin
      forkJoin([...observables1, ...observables2]).subscribe((results: number[]) => {
        // Este bloque se ejecutará una vez que todas las suscripciones se completen
        console.log('Todas las actualizaciones completadas:', results);
        const sendData = this.servicioForm.value;
        this.servicioForm.reset();
        this.onNoClick(sendData);
      });
    }); */

    console.log("horario a enviar");
    
    console.log(horarioEnviar);
    

    this.peticionesService.actualizarHorarioServicio(horarioEnviar).subscribe((data: number) => {
      const diasSeleccionados = Object.keys(this.servicioForm.value.diasSemana).filter(dia => this.servicioForm.value.diasSemana[dia]);
      const diasNoSeleccionados = Object.keys(this.servicioForm.value.diasSemana).filter(dia => !this.servicioForm.value.diasSemana[dia]);

      const tipoIndex = this.data.tipoServicio.codigo - 1;
      const tipoDias = this.data.diasHorarioServicio.slice(tipoIndex * 7, (tipoIndex + 1) * 7);

      const diassFiltrados1 = tipoDias.filter((item: DiasHorarioServicio) => diasSeleccionados.includes(item.dia.nombre.toLowerCase().trim()));
      const diassFiltrados2 = tipoDias.filter((item: DiasHorarioServicio) => diasNoSeleccionados.includes(item.dia.nombre.toLowerCase().trim()));

      const observables1 = diassFiltrados1.map((dia: DiasHorarioServicio) => this.peticionesService.actualizarDiasHorarioServicio({ ...dia, estado: 1 }));
      const observables2 = diassFiltrados2.map((dia: DiasHorarioServicio) => this.peticionesService.actualizarDiasHorarioServicio({ ...dia, estado: 0 }));

      forkJoin([...observables1, ...observables2]).subscribe((results: number[]) => {
        const sendData = this.servicioForm.value;
        this.servicioForm.reset();
        this.onNoClick(sendData);
      });
    });


  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }
}
