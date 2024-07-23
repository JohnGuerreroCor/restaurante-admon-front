import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Contrato } from 'src/app/models/contrato';
import { TipoContrato } from 'src/app/models/tipo-contrato';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataTransferContratoService } from 'src/app/services/data-transfer-contrato.service';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { SedeService } from 'src/app/services/sede.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Sede } from 'src/app/models/sede';
import { PiboteAdicion } from 'src/app/models/piboteAdicion';

@Component({
  selector: 'app-form-crear-contrato',
  templateUrl: './form-crear-contrato.component.html',
  styleUrls: ['./form-crear-contrato.component.css']
})
export class FormCrearContratoComponent implements OnInit {

  receivedData!: Contrato;

  contractTypes: TipoContrato[] = [];

  contratoForm!: FormGroup;

  subscriptions: Subscription[] = [];

  valorEstimadoRaciones: number[] = [0, 0, 0];

  sedeSeleccionada!: Sede;

  isContratoAdicion: boolean = false;

  @ViewChild('botonCalculadora') botonCalculadora!: ElementRef;

  constructor(
    private _formBuilder: FormBuilder,
    private dataService: DataTransferContratoService,
    private peticionesService: PeticionesService,
    private sedeService: SedeService,
    private router: Router
  ) {

    this.crearFormulario();

  }

  crearFormulario(): void {
    this.contratoForm = this._formBuilder.group({
      tipoContrato: new FormControl(0),
      fechaInicial: new FormControl(new Date()),
      fechaFinal: new FormControl(new Date()),
      valorTotalContrato: new FormControl(0),
      valorUnitarioDesayuno: new FormControl(0),
      valorUnitarioAlmuerzo: new FormControl(0),
      valorUnitarioCena: new FormControl(0),
      valorPagadoDesayuno: new FormControl(0),
      valorPagadoAlmuerzo: new FormControl(0),
      valorPagadoCena: new FormControl(0),
      cantidadTotalDesayunos: new FormControl(0),
      cantidadTotalAlmuerzos: new FormControl(0),
      cantidadTotalCenas: new FormControl(0),
      dependencia: new FormControl(0),
      estado: new FormControl(0),
    });
  }

  ngOnDestroy() {
    // Desuscribirse para evitar posibles fugas de memoria
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit() {

    this.sedeService.getSeleccion().subscribe((seleccion) => {

      this.sedeService.inicializarSedes().subscribe(
        (res: Sede[]) => {

          if (res.length > 0 && Object.keys(seleccion).length === 0) {
            this.sedeService.setData(res);
            this.sedeService.setSeleccion(res[0]);
            this.sedeSeleccionada = res[0];
          } else {
            if (this.sedeSeleccionada != undefined) {
              this.sedeSeleccionada = seleccion;
            } else {
              this.sedeSeleccionada = seleccion;
            }
          }
        },
        (error) => {
          console.error('Error initializing sedes:', error);
        }
      );
    });

    Object.keys(this.contratoForm.controls).forEach(controlName => {
      const control = this.contratoForm.get(controlName);
      if (control) {
        const subscription = control.valueChanges.subscribe(value => {
          //console.log(`Campo ${controlName} cambiado: ${value}`);

          if (controlName == 'cantidadTotalDesayunos') {
            this.valorEstimadoRaciones[0] = value * (this.contratoForm.get('valorUnitarioDesayuno')?.value);
          }

          if (controlName == 'cantidadTotalAlmuerzos') {
            this.valorEstimadoRaciones[1] = value * (this.contratoForm.get('valorUnitarioAlmuerzo')?.value);
          }

          if (controlName == 'cantidadTotalCenas') {
            this.valorEstimadoRaciones[2] = value * (this.contratoForm.get('valorUnitarioCena')?.value);
          }
        });
        this.subscriptions.push(subscription);
      }
    });

    this.dataService.getData().subscribe(data => {
      this.receivedData = data;
    }
    );

    this.peticionesService.obtenerTiposContrato().subscribe((res: TipoContrato[]) => {
      console.log("Tipos de contrato");
      console.log(res);
      this.contractTypes = res;

      if (this.receivedData && this.receivedData.isEditing === true) {

        console.log(this.receivedData.tipoContrato.codigo);
        console.log(res[1].codigo);


        if (this.receivedData.tipoContrato.codigo == res[1].codigo) {
          this.isContratoAdicion = true;
          console.log("estas editando un contrato de adicion");
        }

        this.contratoForm.get('tipoContrato')?.setValue(res[1].codigo);

        let fechaInicial = new Date(this.receivedData.fechaInicial); // Obtén la fecha actual
        fechaInicial.setDate(fechaInicial.getDate() + 1); // Suma un día a la fecha actual
        console.log(fechaInicial.toDateString()); // Imprime la nueva fecha con un día agregado

        this.contratoForm.get('fechaInicial')?.setValue(fechaInicial);

        let fechaFinal = new Date(this.receivedData.fechaFinal); // Obtén la fecha actual
        fechaFinal.setDate(fechaFinal.getDate() + 1); // Suma un día a la fecha actual
        console.log(fechaFinal.toString()); // Imprime la nueva fecha con un día agregado

        this.contratoForm.get('fechaFinal')?.setValue(fechaFinal);
        this.contratoForm.get('valorTotalContrato')?.setValue(this.receivedData.valorContrato);
        this.contratoForm.get('valorUnitarioDesayuno')?.setValue(this.receivedData.subsidioDesayuno);
        this.contratoForm.get('valorUnitarioAlmuerzo')?.setValue(this.receivedData.subsidioAlmuerzo);
        this.contratoForm.get('valorUnitarioCena')?.setValue(this.receivedData.subsidioCena);
        this.contratoForm.get('valorPagadoDesayuno')?.setValue(this.receivedData.pagoEstudianteDesayuno);
        this.contratoForm.get('valorPagadoAlmuerzo')?.setValue(this.receivedData.pagoEstudianteAlmuerzo);
        this.contratoForm.get('valorPagadoCena')?.setValue(this.receivedData.pagoEstudianteCena);
        this.contratoForm.get('cantidadTotalDesayunos')?.setValue(this.receivedData.cantidadDesayunos);
        this.contratoForm.get('cantidadTotalAlmuerzos')?.setValue(this.receivedData.cantidadAlmuerzos);
        this.contratoForm.get('cantidadTotalCenas')?.setValue(this.receivedData.cantidadCenas);

        this.contratoForm.get('tipoContrato')?.disable();
        this.contratoForm.get('valorTotalContrato')?.disable();
        this.contratoForm.get('valorUnitarioDesayuno')?.disable();
        this.contratoForm.get('valorUnitarioAlmuerzo')?.disable();
        this.contratoForm.get('valorUnitarioCena')?.disable();
        this.contratoForm.get('valorPagadoDesayuno')?.disable();
        this.contratoForm.get('valorPagadoAlmuerzo')?.disable();
        this.contratoForm.get('valorPagadoCena')?.disable();
        this.contratoForm.get('cantidadTotalDesayunos')?.disable();
        this.contratoForm.get('cantidadTotalAlmuerzos')?.disable();
        this.contratoForm.get('cantidadTotalCenas')?.disable();

      } else {
        this.contratoForm.get('tipoContrato')?.setValue(res[0].codigo);
        this.contratoForm.get('tipoContrato')?.disable();
      }

    });



  }


  calcularEstimaciones(event: Event) {
    event.preventDefault();
    this.valorEstimadoRaciones[0] = this.contratoForm.get('cantidadTotalDesayunos')?.value * this.contratoForm.get('valorUnitarioDesayuno')?.value;
    this.valorEstimadoRaciones[1] = this.contratoForm.get('cantidadTotalAlmuerzos')?.value * this.contratoForm.get('valorUnitarioAlmuerzo')?.value;
    this.valorEstimadoRaciones[2] = this.contratoForm.get('cantidadTotalCenas')?.value * this.contratoForm.get('valorUnitarioCena')?.value;
  }


  uid() {
    return Number(Date.now().toString(36) + Math.random().toString(36).substr(2));
  }


  submitForm() {

    let tipoContratoSelected = {
      codigo: this.contratoForm.get('tipoContrato')?.value,
      nombre: this.contractTypes[this.contratoForm.get('tipoContrato')?.value - 1]?.nombre,
      descripcion: "",
      estado: ""
    }

    let dependenciaSelected = {
      codigo: this.receivedData.dependencia.codigo,
      nombre: "",
      direccion: "",
      telefono: "",
      correo: "",
      pagina: "",
      jefe: "",
      estado: ""
    }

    this.contratoForm.controls['tipoContrato'].setValue(tipoContratoSelected);

    this.contratoForm.controls['dependencia'].setValue(dependenciaSelected);


    console.log(this.contratoForm.get('fechaInicial')?.value);

    let fechaInicial = new Date(this.contratoForm.get('fechaInicial')?.value);
    fechaInicial.setDate(fechaInicial.getDate());
    console.log(fechaInicial);
    this.contratoForm.get('fechaInicial')?.setValue(fechaInicial);

    console.log(this.contratoForm.get('fechaFinal')?.value);


    let fechaFinal = new Date(this.contratoForm.get('fechaFinal')?.value);
    fechaFinal.setDate(fechaFinal.getDate());
    console.log(fechaFinal);
    this.contratoForm.get('fechaFinal')?.setValue(fechaFinal);

    let contratoEnvio: Contrato = {
      codigo: this.receivedData.codigo,
      tipoContrato: this.contratoForm.get('tipoContrato')?.value,
      dependencia: this.contratoForm.get('dependencia')?.value,
      fechaInicial: this.contratoForm.get('fechaInicial')?.value,
      fechaFinal: this.contratoForm.get('fechaFinal')?.value,
      valorContrato: this.contratoForm.get('valorTotalContrato')?.value,
      subsidioDesayuno: this.contratoForm.get('valorUnitarioDesayuno')?.value,
      subsidioAlmuerzo: this.contratoForm.get('valorUnitarioAlmuerzo')?.value,
      subsidioCena: this.contratoForm.get('valorUnitarioCena')?.value,
      pagoEstudianteDesayuno: this.contratoForm.get('valorPagadoDesayuno')?.value,
      pagoEstudianteAlmuerzo: this.contratoForm.get('valorPagadoAlmuerzo')?.value,
      pagoEstudianteCena: this.contratoForm.get('valorPagadoCena')?.value,
      cantidadDesayunos: this.contratoForm.get('cantidadTotalDesayunos')?.value,
      cantidadAlmuerzos: this.contratoForm.get('cantidadTotalAlmuerzos')?.value,
      cantidadCenas: this.contratoForm.get('cantidadTotalCenas')?.value,
      isEditing: false,
      estado: 1
    }


    if (this.receivedData.isEditing == true) {

      /* this.peticionesService.actualizarContrato(contratoEnvio).subscribe((res) => {
        this.receivedData.isEditing = false;
        this.sendData(contratoEnvio);
        this.router.navigate(['/contratos']);
      }); */

      if (this.isContratoAdicion == true) {
        this.peticionesService.actualizarContrato(contratoEnvio).subscribe((res) => {
          this.receivedData.isEditing = false;
          this.isContratoAdicion = false;
          this.router.navigate(['/contratos']);
          return;
        });
      } else {
        this.peticionesService.registrarContrato(contratoEnvio).subscribe((res) => {
          console.log(res);

          if (res == 0) {
            alert("Error al registrar el contrato, porfavor verifique que la informacion ingresada sea correcta");
            this.router.navigate(['/contratos']);
          } else {

            // Inicializar los valores de contrato_general y contrato_adicion
            let contrato_general = this.receivedData.codigo;
            let contrato_adicion = res;

            // Crear el objeto PiboteAdicion con los valores inicializados
            let piboteAdicion = new PiboteAdicion();
            piboteAdicion.codigoGeneral = contrato_general;
            piboteAdicion.codigoAdicion = contrato_adicion;
            piboteAdicion.estado = 1;

            console.log("Pibote adicion");
            console.log(piboteAdicion);

            this.peticionesService.crearPiboteAdicion(piboteAdicion).subscribe((res) => {
              console.log("Pibote adicion creado");
              console.log(res);
            });

            contratoEnvio.codigo = res;
            this.sendData(contratoEnvio);
            this.router.navigate(['/contratos']);
          }
        });
      }

    } else {

      contratoEnvio.dependencia.codigo = this.sedeSeleccionada.codigo;

      this.peticionesService.registrarContrato(contratoEnvio).subscribe((res) => {
        console.log(res);

        if (res == 0) {
          alert("Error al registrar el contrato, porfavor verifique que la informacion ingresada sea correcta");
          this.router.navigate(['/contratos']);
        } else {
          contratoEnvio.codigo = res;
          this.sendData(contratoEnvio);
          this.router.navigate(['/contratos']);
        }
      });


    }

  }

  sendData(contratoEnviado: Contrato) {
    this.dataService.setData(contratoEnviado);
  }

  cancelar() {
    // Aquí puedes redirigir al usuario a otra página o realizar cualquier acción al cancelar
    if (this.receivedData.isEditing == true) {
      this.receivedData.isEditing = false;
    }

  }
}
