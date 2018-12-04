import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { Browser } from 'protractor';
import { BrowserModule,By} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de:DebugElement;
  let el:HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents().then(() => {
      fixture=TestBed.createComponent(LoginComponent);
      component=fixture.componentInstance;
      de=fixture.debugElement.query(By.css('form'));
      el=de.nativeElement;

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('form should be invalid',async(() => {
    expect(component.model.email.toEqual('@asd.dzf.asd'));
    expect(component.model.pass.toEqual('JSXj'));

  }))

  it('valid Form'), async(() => {
    expect(component.model.email.toEqual('simransande.a@gmail.com'));
    expect(component.model.pass.toEqual('121210'));
   
    });
    it('should login', async(()=>{
      component.login()
    }))
    it('should call the login method', async(()=>{
      fixture.detectChanges();
      spyOn(component,'login')
      el=fixture.debugElement.query(By.css('button')).nativeElement;
      el.click();
      expect(component.login).toHaveBeenCalledTimes(1);
    }))
  
});
