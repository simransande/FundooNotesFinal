import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent } from './notes.component';

describe('NotesComponent', () => {
  let component: NotesComponent;
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesComponent ]
    })
    .compileComponents();
  }));
  

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should note', async(()=>{
    expect(component.archive['archive']).toEqual(0);
    expect(component.trash['trash']).toEqual(0)
    expect(component.trash['trash']).toBeTruthy();
    expect(component.archive['archive']).toBeTruthy();
  }));
  it('should not note', async(()=>{
    expect(component.archive['archive']).toEqual(1);
    expect(component.trash['trash']).toEqual(1)
    expect(component.archive['archive']).toBeFalsy();
    expect(component.trash['trash']).toBeFalsy();
  }));
});
