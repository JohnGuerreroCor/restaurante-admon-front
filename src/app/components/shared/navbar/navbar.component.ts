import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NavbarHiddenService } from 'src/app/services/navbar-hidden.service';
import { FotoService } from 'src/app/services/foto.service';
import { FotoAntigua } from '../../../models/foto-antigua';
import swal from 'sweetalert2';
import { SedeService } from 'src/app/services/sede.service';
import { Sede } from 'src/app/models/sede';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public perCodigo: any = this.auth.user.personaCodigo;
  public perCodigoAntigua: any = '' + this.auth.user.personaCodigo;
  public nombre: any = this.auth.user.personaNombre;
  public apellido: any = this.auth.user.personaApellido;
  public uaa: any = this.auth.user.uaaNombre;
  public roles: any[] = this.auth.user.roles;
  public horaInicioSesion: any = this.auth.user.horaInicioSesion;
  public horaFinSesion: any = this.auth.user.horaInicioSesion;
  public rol: any = this.roles.toString();
  url: any = environment.URL_BACKEND;
  panelOpenState = false;
  foto: FotoAntigua = {
    url: '',
  };
  selected!: Sede;
  sedes!: Sede[];
  sedeSeleccionada!: Sede;
  anio = new Date();

  isHandset$: Observable<any> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private router: Router,
    public navbarHiddenService: NavbarHiddenService,
    public fotoService: FotoService,
    private sedeService: SedeService,
    private sedesService: SedeService
  ) {
    this.fotoService.mirarFoto('' + this.perCodigo).subscribe((data) => {
      var gg = new Blob([data], { type: 'application/json' });
      if (gg.size !== 4) {
        var blob = new Blob([data], { type: 'image/png' });
        const foto = blob;
        const reader = new FileReader();
        reader.onload = () => {
          this.foto.url = reader.result as string;
        };
        reader.readAsDataURL(foto);
      } else {
        this.fotoService
          .mirarFotoAntigua('' + this.perCodigo)
          .subscribe((data) => {
            this.foto = data;
          });
      }
    });
  }

  receiveMessage($event: any) {
    this.rol = $event;
  }

  logout(): void {
    this.auth.logout();
    const Toast = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'success',
      title: 'Sesión cerrada correctamente.',
    });
    this.router.navigate(['/login']);
  }

  ngOnInit() {

    this.sedesService.getSeleccion().subscribe((seleccion) => {

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

          this.sedeService.getData().subscribe(data => {
            this.sedes = data;
          });

        },
        (error) => {
          console.error('Error initializing sedes:', error);
        }
      );
    });


  }

  toggle() {
    this.navbarHiddenService.toggleSideBar();
  }

  getSedeSelected(sede: Sede) {
    this.selected = sede;
    this.sedeService.setSeleccion(sede);
  }
}
