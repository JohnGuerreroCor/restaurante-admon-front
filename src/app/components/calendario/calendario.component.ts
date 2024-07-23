import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
})
export class CalendarioComponent implements OnInit {
  anios: number[] = [];
  mesesDelAnio: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  diasPorMes: number[][] = [];
  diasFestivosPorMes: number[][] = [];
  selectedYear!: number;

  diasDeLaSemana: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  ngOnInit(): void {
    this.inicializarAnios();
    this.selectedYear = new Date().getFullYear();
    this.inicializarCalendario(this.selectedYear);
  }

  inicializarAnios(): void {
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();

    for (let i = year - 10; i <= year; i++) {
      this.anios.push(i);
    }
  }

  inicializarCalendario(year: number): void {
    this.diasPorMes = [];
    this.diasFestivosPorMes = [];

    for (let month = 0; month < 12; month++) {
      this.diasPorMes.push(this.generarDiasDelMes(year, month));
      this.diasFestivosPorMes.push([]);
    }
  }

  generarDiasDelMes(year: number, month: number): number[] {
    const diasDelMes: number[] = [];
    const ultimoDiaDelMes = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= ultimoDiaDelMes; i++) {
      diasDelMes.push(i);
    }

    return diasDelMes;
  }

  marcarDiaFestivo(mes: number, dia: number): void {
    if (this.diasFestivosPorMes[mes].includes(dia)) {
      this.diasFestivosPorMes[mes] = this.diasFestivosPorMes[mes].filter(
        (d) => d !== dia
      );
    } else {
      this.diasFestivosPorMes[mes].push(dia);
    }
  }

  esDiaFestivo(mes: number, dia: number): boolean {
    return this.diasFestivosPorMes[mes].includes(dia);
  }

  cambiarAnio(year: number): void {
    this.selectedYear = year;
    this.inicializarCalendario(year);
  }

  mostrarFestivos() {
    console.log(this.diasFestivosPorMes);
  }
}
