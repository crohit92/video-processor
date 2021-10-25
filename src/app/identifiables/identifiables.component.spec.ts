import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifiablesComponent } from './identifiables.component';

describe('IdentifiablesComponent', () => {
  let component: IdentifiablesComponent;
  let fixture: ComponentFixture<IdentifiablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentifiablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentifiablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
