import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundooNotesComponent } from './FundooNotes.component';

describe('FundooNotesComponent', () => {
  let component: FundooNotesComponent;
  let fixture: ComponentFixture<FundooNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundooNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundooNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
