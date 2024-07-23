import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevoSubsidiadoComponent } from './modal-nuevo-subsidiado.component';

describe('ModalNuevoSubsidiadoComponent', () => {
  let component: ModalNuevoSubsidiadoComponent;
  let fixture: ComponentFixture<ModalNuevoSubsidiadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNuevoSubsidiadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNuevoSubsidiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
