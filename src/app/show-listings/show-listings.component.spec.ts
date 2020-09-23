import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListingsComponent } from './show-listings.component';

describe('ShowListingsComponent', () => {
  let component: ShowListingsComponent;
  let fixture: ComponentFixture<ShowListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
