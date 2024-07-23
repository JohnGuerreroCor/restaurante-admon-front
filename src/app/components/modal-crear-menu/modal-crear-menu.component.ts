import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-modal-crear-menu',
  templateUrl: './modal-crear-menu.component.html',
  styleUrls: ['./modal-crear-menu.component.css']
})
export class ModalCrearMenuComponent {

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogCrearMenu, {

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}


@Component({
  selector: 'dialog-crear-menu',
  templateUrl: 'dialog-crear-menu.html',
  styleUrls: ['dialog-crear-menu.css']
})
export class DialogCrearMenu implements OnInit {

  selectedFile!: File | null;
  nameFile: string = 'Cargar imagen';

  constructor(
    public dialogRef: MatDialogRef<DialogCrearMenu>,
    @Inject(MAT_DIALOG_DATA) public data: null,
    private _formBuilder: FormBuilder,
  ) {

  }

  onFileSelected(event: Event): void {
    /* const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    } */
  }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardarRegistro() {


  }

}
