import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioServicioComponent } from './horario-servicio.component';

describe('HorarioServicioComponent', () => {
  let component: HorarioServicioComponent;
  let fixture: ComponentFixture<HorarioServicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorarioServicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorarioServicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
