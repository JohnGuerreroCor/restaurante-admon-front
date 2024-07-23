import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCrearMenuComponent } from './modal-crear-menu.component';

describe('ModalCrearMenuComponent', () => {
  let component: ModalCrearMenuComponent;
  let fixture: ComponentFixture<ModalCrearMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCrearMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCrearMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
