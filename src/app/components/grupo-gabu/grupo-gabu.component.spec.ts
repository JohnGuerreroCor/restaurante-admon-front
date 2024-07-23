import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoGabuComponent } from './grupo-gabu.component';

describe('GrupoGabuComponent', () => {
  let component: GrupoGabuComponent;
  let fixture: ComponentFixture<GrupoGabuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrupoGabuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoGabuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
