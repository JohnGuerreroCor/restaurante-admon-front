import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsidiadosComponent } from './subsidiados.component';

describe('SubsidiadosComponent', () => {
  let component: SubsidiadosComponent;
  let fixture: ComponentFixture<SubsidiadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsidiadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubsidiadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
