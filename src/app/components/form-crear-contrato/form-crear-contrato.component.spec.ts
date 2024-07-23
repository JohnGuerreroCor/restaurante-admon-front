import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCrearContratoComponent } from './form-crear-contrato.component';

describe('FormCrearContratoComponent', () => {
  let component: FormCrearContratoComponent;
  let fixture: ComponentFixture<FormCrearContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCrearContratoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCrearContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
