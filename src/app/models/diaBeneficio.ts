import { Dia } from "./dia";
import { GrupoGabu } from "./grupoGabu";
import { TipoServicio } from "./tipoServicio";

export class DiaBeneficio {
    codigo!: number;
    codigoGrupoGabu!: number;
    dia!: Dia;
    estado!: number;
    tipoServicio!: TipoServicio;
}