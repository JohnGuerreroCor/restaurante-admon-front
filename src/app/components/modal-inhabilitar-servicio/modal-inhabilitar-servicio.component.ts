import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-modal-inhabilitar-servicio',
  templateUrl: './modal-inhabilitar-servicio.component.html',
  styleUrls: ['./modal-inhabilitar-servicio.component.css']
})
export class ModalInhabilitarServicioComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalInhabilitarServicioComponent>
  ) { }

  cerrarModal() {
    this.dialogRef.close('boton atras oprimido');
  }

  inhabilitar() {
    this.dialogRef.close('boton inhabilitar oprimido');
  }

}
