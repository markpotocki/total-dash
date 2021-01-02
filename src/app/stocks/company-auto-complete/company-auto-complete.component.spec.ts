import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CompanyAutoCompleteComponent} from './company-auto-complete.component';

describe('CompanyAutoCompleteComponent', () => {
  let component: CompanyAutoCompleteComponent;
  let fixture: ComponentFixture<CompanyAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyAutoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
