import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorComponent } from './collaborator.component';

describe('CollaboratorComponent', () => {
  let component: CollaboratorComponent;
  let fixture: ComponentFixture<CollaboratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should collaborated', async(()=>{
    expect(component.sharedEmail['collaborate']).toEqual('simransande.a@gmail.com')
    expect(component.sharedEmail['collaborate']).toBeTruthy();
  }));
  it('should not collaborated', async(()=>{
    expect(component.sharedEmail['collaborate']).toEqual(0)
    expect(component.sharedEmail['collaborate']).toBeFalsy();
  }));
});
