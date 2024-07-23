import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevoHorarioServicioComponent } from './modal-nuevo-horario-servicio.component';

describe('ModalNuevoHorarioServicioComponent', () => {
  let component: ModalNuevoHorarioServicioComponent;
  let fixture: ComponentFixture<ModalNuevoHorarioServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNuevoHorarioServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNuevoHorarioServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
