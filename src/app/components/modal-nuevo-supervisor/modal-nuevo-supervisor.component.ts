import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';


export interface DialogData {
  prueba: string;
}

@Component({
  selector: 'app-modal-nuevo-supervisor',
  templateUrl: './modal-nuevo-supervisor.component.html',
  styleUrls: ['./modal-nuevo-supervisor.component.css']
})
export class ModalNuevoSupervisorComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogNuevoSupervisor, {

    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}

export class Supervisor {
  nombre!: string;
  codigo!: string;
  identificacion!: string;
}

@Component({
  selector: 'dialog-nuevo-supervisor',
  templateUrl: 'dialog-nuevo-supervisor.html',
  styleUrls: ['dialog-nuevo-supervisor.css']
})
export class DialogNuevoSupervisor implements OnInit {

  controlForm!: FormGroup;


  myControl = new FormControl('');
  options: string[] = ['20191176712 - 1076909715 - alejo', '20149241 - 201876723 - juana', '43243242 - 202041242 - mauricio'];
  filteredOptions!: Observable<string[]>;


  constructor(
    public dialogRef: MatDialogRef<DialogNuevoSupervisor>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  guardarRegistro() {
    //implementar la lógica para guardar el registro
    this.myControl.reset();
    this.onNoClick();
  }

  buscarRegistro() {

  }
}

