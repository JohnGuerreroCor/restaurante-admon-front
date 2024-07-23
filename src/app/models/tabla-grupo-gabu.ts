import { Dia } from "./dia";
import { Sede } from "./sede";
import { TipoGabu } from "./tipoGabu";

export class TablaGrupoGabu {
    codigo!: number;
    tipoGabu!: number;
    estado!: number;
    identificacion!: number;
    codigoEstudiante!: number;
    nombre!: string;
    programa!: string;
    vigencia!: number;
    diaCodigo!: Dia;
}