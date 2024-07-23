import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNuevoSupervisorComponent } from './modal-nuevo-supervisor.component';

describe('ModalNuevoSupervisorComponent', () => {
  let component: ModalNuevoSupervisorComponent;
  let fixture: ComponentFixture<ModalNuevoSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNuevoSupervisorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNuevoSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
