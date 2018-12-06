import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './ForgotPassword.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid',async(() => {
    expect(component.model.email.toEqual('@asd.dzf.asd'));
    expect(component.model.email.toEqual('65265215'));
    expect(component.model.email.toEqual('fxghdxfghdfg'));

  }))

  it('valid Form'), async(() => {
    expect(component.model.email.toEqual('simransande.a@gmail.com'));
  
    });
});
