import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Contrato } from '../models/contrato';
import { TipoContrato } from '../models/tipo-contrato';
import { HorarioServicio } from '../models/horarioServicio';
import { TipoServicio } from '../models/tipoServicio';
import { GrupoGabu } from '../models/grupoGabu';
import { DiasHorarioServicio } from '../models/diasHorarioServicio';
import { DiaBeneficio } from '../models/diaBeneficio';
import { TablaGrupoGabu } from '../models/tabla-grupo-gabu';
import { PiboteAdicion } from '../models/piboteAdicion';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  private url: string = `${environment.URL_BACKEND}`;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  userLogeado: String = this.authservice.user.username;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) { }

  private aggAutorizacionHeader(): HttpHeaders {
    let token = this.authservice.Token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e: { status: number }): boolean {
    if (e.status == 401 || e.status == 403) {
      if (this.authservice.isAuthenticated()) {
        this.authservice.logout();
      }
      this.router.navigate(['login']);
      return true;
    }
    return false;
  }

  obtenerContrato(idUsuario: String, idContrato: String): Observable<Contrato[]> {
    return this.http
      .get<Contrato[]>(`${this.url}/contrato/obtener-contrato/${idUsuario}/${idContrato}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerContratos(): Observable<Contrato[]> {
    return this.http
      .get<Contrato[]>(`${this.url}/contrato/obtener-contrato/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  registrarContrato(contrato: Contrato): Observable<number> {
    return this.http.post<number>(
      `${this.url}/contrato/crear-contrato/${this.userLogeado}`,
      contrato,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarContrato(contrato: Contrato): Observable<number> {
    return this.http.put<number>(
      `${this.url}/contrato/actualizar-contrato/${this.userLogeado}`,
      contrato,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  obtenerTiposContrato(): Observable<TipoContrato[]> {
    return this.http
      .get<TipoContrato[]>(`${this.url}/tipoContrato/obtener-tiposContrato/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerTipoServicio(): Observable<TipoServicio[]> {
    return this.http
      .get<TipoServicio[]>(`${this.url}/tipoServicio/obtener-TipoServicio/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerHorariosServicio(): Observable<HorarioServicio[]> {
    return this.http
      .get<HorarioServicio[]>(`${this.url}/horarioServicio/obtener-horarioServicio/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  crearHorarioServicio(horarioServicio: HorarioServicio): Observable<number> {
    return this.http.post<number>(
      `${this.url}/horarioServicio/crear-horarioServicio/${this.userLogeado}`,
      horarioServicio,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarHorarioServicio(horarioServicio: HorarioServicio): Observable<number> {
    return this.http.put<number>(
      `${this.url}/horarioServicio/actualizar-horarioServicio/${this.userLogeado}`,
      horarioServicio,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  obtenerDiasHorarioServicio(): Observable<DiasHorarioServicio[]> {
    return this.http
      .get<[DiasHorarioServicio]>(`${this.url}/diaHorarioServicio/obtener-horarioServicio/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  actualizarDiasHorarioServicio(diasHorarioServicio: DiasHorarioServicio): Observable<number> {
    return this.http.put<number>(
      `${this.url}/diaHorarioServicio/actualizar-horarioServicio/${this.userLogeado}`,
      diasHorarioServicio,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarDiaBeneficio(diaBeneficio: DiaBeneficio): Observable<number> {
    return this.http.put<number>(
      `${this.url}/diaBeneficio/actualizar-diaBeneficio/${this.userLogeado}`,
      diaBeneficio,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  obtenerGrupoGabus(): Observable<TablaGrupoGabu[]> {
    return this.http
      .get<TablaGrupoGabu[]>(`${this.url}/grupoGabu/obtener-grupoGabus/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerGabu(codigo: number): Observable<any[]> {
    let res = this.http
      .get<any[]>(`${this.url}/grupoGabu/obtener-grupoGabu/${this.userLogeado}/${codigo}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );

    return res;

  }

  crearGrupoGabu(horarioServicio: GrupoGabu): Observable<number> {
    return this.http.post<number>(
      `${this.url}/grupoGabu/crear-grupoGabu/${this.userLogeado}`,
      horarioServicio,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarGrupoGabu(grupoGabu: GrupoGabu): Observable<number> {
    return this.http.put<number>(
      `${this.url}/grupoGabu/actualizar-grupoGabu/${this.userLogeado}`,
      grupoGabu,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  obtenerDiasBeneficio(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/diaBeneficio/obtener-diasBeneficio/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerEstudianteByCodigo(codigo: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/estudiante/estudiante-get/${codigo}/${this.userLogeado}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  obtenerEstudianteById(id: number): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.url}/estudiante/buscar-estudiante-identificacion/${id}`, {
        headers: this.aggAutorizacionHeader(),
      })
      .pipe(
        catchError((e) => {
          if (this.isNoAutorizado(e)) {
            return throwError(e);
          }
          return throwError(e);
        })
      );
  }

  crearDiasBeneficio(diasBeneficio: DiaBeneficio[]): Observable<number> {
    return this.http.post<number>(
      `${this.url}/diaBeneficio/crear-diasBeneficio/${this.userLogeado}`,
      diasBeneficio,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  crearPiboteAdicion(piboteAdicion: PiboteAdicion): Observable<number> {
    return this.http.post<number>(
      `${this.url}/piboteAdicion/crear-piboteAdicion/${this.userLogeado}`,
      piboteAdicion,
      { headers: this.aggAutorizacionHeader() }
    );
  }

  actualizarPiboteAdicion(piboteAdicion: PiboteAdicion): Observable<number> {
    return this.http.put<number>(
      `${this.url}/piboteAdicion/actualizar-piboteAdicion/${this.userLogeado}`,
      piboteAdicion,
      { headers: this.aggAutorizacionHeader() }
    );
  }

}
