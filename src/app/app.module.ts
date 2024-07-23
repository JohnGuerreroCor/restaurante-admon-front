import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { registerLocaleData } from '@angular/common';
import localeEsCO from '@angular/common/locales/es-CO';
import { DatePipe } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { MaterialModules } from './material.modules';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { TokenComponent } from './components/token/token.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { HorarioServicioComponent } from './components/horario-servicio/horario-servicio.component';
import { ModalNuevoHorarioServicioComponent } from './components/modal-nuevo-horario-servicio/modal-nuevo-horario-servicio.component';
import { DialogCrearHorarioServicio } from './components/modal-nuevo-horario-servicio/modal-nuevo-horario-servicio.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JsonPipe } from '@angular/common';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ContratosComponent } from './components/contratos/contratos.component';
import { FormCrearContratoComponent } from './components/form-crear-contrato/form-crear-contrato.component';
import { SupervisoresComponent } from './components/supervisores/supervisores.component';
import { ModalNuevoSupervisorComponent } from './components/modal-nuevo-supervisor/modal-nuevo-supervisor.component';
import { DialogNuevoSupervisor } from './components/modal-nuevo-supervisor/modal-nuevo-supervisor.component';
import { SubsidiadosComponent } from './components/subsidiados/subsidiados.component';
import { ModalNuevoSubsidiadoComponent } from './components/modal-nuevo-subsidiado/modal-nuevo-subsidiado.component';
import { DialogNuevoSubsidiado } from './components/modal-nuevo-subsidiado/modal-nuevo-subsidiado.component';
import { CrearMenuComponent } from './components/crear-menu/crear-menu.component';
import { ModalCrearMenuComponent } from './components/modal-crear-menu/modal-crear-menu.component';
import { DialogCrearMenu } from './components/modal-crear-menu/modal-crear-menu.component';
import { AsignarMenuComponent } from './components/asignar-menu/asignar-menu.component';
import { CargueInformacionComponent } from './components/cargue-informacion/cargue-informacion.component';
import { ModalInhabilitarServicioComponent } from './components/modal-inhabilitar-servicio/modal-inhabilitar-servicio.component';
import { GrupoGabuComponent } from './components/grupo-gabu/grupo-gabu.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ReporteComponent } from './components/reporte/reporte.component';
registerLocaleData(localeEsCO, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TokenComponent,
    NavbarComponent,
    InicioComponent,
    HorarioServicioComponent,
    ModalNuevoHorarioServicioComponent,
    DialogCrearHorarioServicio,
    CalendarioComponent,
    ContratosComponent,
    FormCrearContratoComponent,
    SupervisoresComponent,
    ModalNuevoSupervisorComponent,
    DialogNuevoSupervisor,
    SubsidiadosComponent,
    ModalNuevoSubsidiadoComponent,
    DialogNuevoSubsidiado,
    CrearMenuComponent,
    ModalCrearMenuComponent,
    DialogCrearMenu,
    AsignarMenuComponent,
    CargueInformacionComponent,
    ModalInhabilitarServicioComponent,
    GrupoGabuComponent,
    NotfoundComponent,
    ReporteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    NgbModule,
    JsonPipe,
    NgbTimepickerModule,
    TimepickerModule.forRoot(),
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: LOCALE_ID, useValue: 'es-CO' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
