import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TokenComponent } from './components/token/token.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HorarioServicioComponent } from './components/horario-servicio/horario-servicio.component';
import { ModalNuevoHorarioServicioComponent } from './components/modal-nuevo-horario-servicio/modal-nuevo-horario-servicio.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { FormCrearContratoComponent } from './components/form-crear-contrato/form-crear-contrato.component';
import { CrearMenuComponent } from './components/crear-menu/crear-menu.component';
import { AsignarMenuComponent } from './components/asignar-menu/asignar-menu.component';
import { CargueInformacionComponent } from './components/cargue-informacion/cargue-informacion.component';
import { GrupoGabuComponent } from './components/grupo-gabu/grupo-gabu.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ReporteComponent } from './components/reporte/reporte.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'login', component: LoginComponent },
  { path: 'token', component: TokenComponent },
  { path: 'acceso-denegado', component: NotfoundComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  {
    path: 'horarioServicio',
    component: HorarioServicioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'modal',
    component: ModalNuevoHorarioServicioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'calendario',
    component: CalendarioComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'contratos',
    component: ContratosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'crearContrato',
    component: FormCrearContratoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'crearMenu',
    component: CrearMenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'asignarMenu',
    component: AsignarMenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cargueInformacion',
    component: CargueInformacionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'grupoGabu',
    component: GrupoGabuComponent,
    canActivate: [AuthGuard],
  },
  { path: 'reporte', component: ReporteComponent, canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'acceso-denegado' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
