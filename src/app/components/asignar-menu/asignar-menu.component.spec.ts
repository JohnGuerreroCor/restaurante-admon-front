import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMenuComponent } from './asignar-menu.component';

describe('AsignarMenuComponent', () => {
  let component: AsignarMenuComponent;
  let fixture: ComponentFixture<AsignarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
