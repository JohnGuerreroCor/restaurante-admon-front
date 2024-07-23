import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInhabilitarServicioComponent } from './modal-inhabilitar-servicio.component';

describe('ModalInhabilitarServicioComponent', () => {
  let component: ModalInhabilitarServicioComponent;
  let fixture: ComponentFixture<ModalInhabilitarServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalInhabilitarServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalInhabilitarServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
