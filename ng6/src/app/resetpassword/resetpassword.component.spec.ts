import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpasswordComponent } from './resetpassword.component';

describe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetpasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid',async(() => {
    expect(component.model.email.toEqual('@asd.dzf.asd'));
    expect(component.model.email.toEqual('65265215'));
    expect(component.model.pass.toEqual('JSXj'));
    expect(component.model.pass.toEqual('457968445454'));
  }))

  it('valid Form'), async(() => {
    expect(component.model.email.toEqual('simransande.a@gmail.com'));
    expect(component.model.pass.toEqual('15426'));
   
    });
   
});
