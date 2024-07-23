import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Sede } from '../models/sede';

@Injectable({
  providedIn: 'root'
})
export class SedeService {

  sedeSeleccionada!: Sede;
  private url: string = `${environment.URL_BACKEND}`;
  private httpHeaders = new HttpHeaders({ 'Content-type': 'application/json' });

  userLogeado: String = this.authservice.user.username;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authservice: AuthService
  ) {
    this.inicializarSedes();
  }

  private sedes = new BehaviorSubject<Sede[]>([]);
  private seleccion = new BehaviorSubject<Sede>(new Sede());

  getData() {
    return this.sedes.asObservable();
  }

  setData(data: Sede[]) {
    this.sedes.next(data);
  }

  getSeleccion() {
    return this.seleccion.asObservable();
  }

  setSeleccion(data: Sede) {
    this.seleccion.next(data);
  }

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

  obtenerSedesRestaurante(idUsuario: String): Observable<Sede[]> {
    return this.http
      .get<any[]>(`${this.url}/uaa/findSedesRestaurante/${idUsuario}`, {
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

  inicializarSedes() {

    return this.obtenerSedesRestaurante("a1075303330").pipe(
      catchError((error) => {
        console.error('Error getting sedes:', error);
        return throwError(error);
      })
    );
  }

}
