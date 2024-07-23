import { Component } from '@angular/core';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent {
  links = [
    {
      titulo: 'Horario Servicio',
      ruta: '/horarioServicio',
      icono: 'fa-solid fa-clock fa-8x p-4 text-center color-icon color-icon',
      info: 'Este módulo se encarga de establecer los horarios de venta y atención en el restaurante, garantizando una gestión eficiente del tiempo.',
    },
    {
      titulo: 'Calendario',
      ruta: '/calendario',
      icono: 'fa-regular fa-calendar-days fa-8x p-4 text-center color-icon',
      info: 'Actualmente en construcción, este módulo en el futuro será responsable de llevar un registro histórico de las ventas y consumos para un determinado día.',
    },
    {
      titulo: 'Contratos',
      ruta: '/contratos',
      icono: 'fa-solid fa-file-contract fa-8x p-4 text-center color-icon',
      info: 'Módulo dedicado a la parametrización contractual, gestionando contratos vigentes, pasados y futuros.',
    },
    {
      titulo: 'Grupo Gabu',
      ruta: '/grupoGabu',
      icono: 'fa-solid fa-people-group fa-8x p-4 text-center color-icon',
      info: 'Módulo destinado a proporcionar beneficios restaurantiles a poblaciones vulnerables y casos especiales, promoviendo la responsabilidad social.',
    },
    {
      titulo: 'Crear Menú',
      ruta: '/crearMenu',
      icono: 'fa-solid fa-egg fa-8x p-4 text-center color-icon',
      info: 'Módulo que permite la creación de minutas de comida, con una futura integración para optimizar el proceso.',
    },
    {
      titulo: 'Asignar Menú',
      ruta: '/asignarMenu',
      icono: 'fa-solid fa-spoon fa-8x p-4 text-center color-icon',
      info: 'Módulo para la asignación de minutas de comida, previsto para integrarse en el futuro para mejorar la eficiencia del servicio.',
    },
    {
      titulo: 'Sincronización',
      ruta: '/cargueInformacion',
      icono: 'fa-solid fa-truck-ramp-box fa-8x p-4 text-center color-icon',
      info: 'Este módulo facilita la carga de información cuando no hay servicio de internet u ocurre algún inconveniente que impida la conexión al servidor, asegurando la continuidad del servicio.',
    },
    {
      titulo: 'Estadísticas',
      ruta: '/reporte',
      icono: 'fa-solid fa-chart-simple fa-8x p-4 text-center color-icon',
      info: 'Módulo planificado para futuras integraciones que permitirá visualizar las estadísticas relacionadas con el restaurante, brindando información valiosa para la toma de decisiones.',
    },
  ];

  /* sedeSeleccionada!: Sede; */

  constructor(private sedesService: SedeService) {}

  ngOnInit() {
    /* this.sedesService.getSeleccion().subscribe((seleccion) => {

      this.sedesService.inicializarSedes().subscribe(
        (res: Sede[]) => {

          if (res.length > 0 && Object.keys(seleccion).length === 0) {
            this.sedesService.setData(res);
            this.sedesService.setSeleccion(res[0]);
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
    }); */
  }
}
