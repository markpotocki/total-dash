import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StockSearchResultsComponent} from './stock-search-results.component';

describe('StockSearchResultsComponent', () => {
  let component: StockSearchResultsComponent;
  let fixture: ComponentFixture<StockSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockSearchResultsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
