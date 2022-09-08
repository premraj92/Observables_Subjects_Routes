import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesVsPromisesComponent } from './observables-vs-promises.component';

describe('ObservablesVsPromisesComponent', () => {
  let component: ObservablesVsPromisesComponent;
  let fixture: ComponentFixture<ObservablesVsPromisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservablesVsPromisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservablesVsPromisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
