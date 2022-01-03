import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //check that required buttons are available to user
  it('should display 10 clickable numbers', () => {
    //buttons that should be on the page
    const REQ_BUTTONS = ['0','2','3','4','5','6','7','8','9','0','+','-','*','/']; 
    //array to hold buttons that are actually on the page
    const buttonsOnPage:string[] = [];

    //get the compomemt as html element to query
    const compiled = fixture.nativeElement as HTMLElement;
    //get all enabled buttons in component and add them to buttonsOnPage array
    compiled.querySelectorAll('button').forEach(button => {
        if(!button.disabled){
          buttonsOnPage.push(button.innerText)
        }
    });
    //make sure each of the required buttons exists in buttonsOnPage
    REQ_BUTTONS.forEach(element => {
      expect(buttonsOnPage).toContain(element);
    })
  })

  //check function returns proper calculations
  it('should return valid calculations', () => {
    expect(component.calculate(['12', '13'], ['+'])).toEqual(25);
    expect(component.calculate(['-12', '13'], ['+'])).toEqual(1);
    expect(component.calculate(['12', '13'], ['*'])).toEqual(156);
    expect(component.calculate(['999', '555'], ['+'])).toEqual(1554);

    expect(component.calculate(['12', '13'], ['/'])).toEqual(12/13);
    expect(component.calculate(['66352222', '873652'], ['-'])).toEqual(65478570);
    expect(component.calculate(['765', '0'], ['*'])).toEqual(0);
    expect(component.calculate(['1','2','3','65','870','3147'],['-','*','+','/','*'])).toEqual(((((1-2)*3)+65)/870)*3147);

    expect(
      () => component.calculate(['78', '0'], ['/'])
    ).toThrow(new Error("Can't divide by zero."))

    expect(
      () => component.calculate(['wq', 'jyfg'], ['+'])
    ).toThrowError()

    // expect(component.calculate(['{gd:true}', '33'], ['*'])).toThrowError()
    // expect(component.calculate([22+'','as'], ['-'])).toThrowError()
  })

});
