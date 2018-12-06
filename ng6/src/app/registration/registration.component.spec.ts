import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => { 
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(1 + 1).toBeTruthy(2);
  });
  it('should create', () => {
    expect(1 + 1).toBeTruthy(2);
  });
  
  it('form should be invalid',async(() => {
    expect(component.model.email.toEqual(''));
    expect(component.model.pass.toEqual(''));
    expect(component.model.uname.toEqual('784'));

    expect(component.model.phone.toEqual('jdsxcshAS'));

    

  }))

  it('valid Form'), async(() => {
    expect(component.model.email.toEqual('bridgeit@gmail.com'));
    expect(component.model.pass.toEqual('123123'));
    expect(component.model.uname.toEqual('bridge'));

    expect(component.model.phone.toEqual('9632587410'));
   
    });
});
