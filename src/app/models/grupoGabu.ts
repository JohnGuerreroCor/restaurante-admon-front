import { DiaBeneficio } from "./diaBeneficio";
import { Persona } from "./persona";
import { Sede } from "./sede";
import { TipoGabu } from "./tipoGabu";

export class GrupoGabu {
    codigo!: number;
    tipoGabu!: TipoGabu;
    persona!: Persona;
    codigoEstudiante!: number;
   // usuario!: Persona;
    //dependencia!: Sede;
    vigencia!: string;
    //diaBeneficio!: diaBeneficio;
    estado!: number;
}