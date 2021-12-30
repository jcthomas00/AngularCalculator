import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  constructor() { }
  ngOnInit(): void { }

  inputString:string = '';
  modalActive:boolean = false;
  modalMessage:string = '';
  modalTitle:string = '';

  //show or hide modal with provided message
  toggleModal = (title:string='', message:string=''):void => {
    this.modalMessage = title;
    this.modalTitle = message;
    this.modalActive = !this.modalActive;
  }
  //add num or operation to inputString
  addToInput = (e:any) => {
    this.inputString += e.target.value;
  }
  clearInput = () => {
    this.inputString = '';
  }

  //break inputString to an array with numbers, and an array with operations and send to calculate
  //display answer if valid, otherwise show the error
  startCalculation = () => {
    const NumRegex:RegExp = /\D/, OpRegex:RegExp = /\d/;
    try{
      this.inputString = this.calculate(
        this.inputString.split(NumRegex), 
        this.inputString.split(OpRegex).filter(trash => trash !== '')
      )+'';
    }catch(e){
      this.clearInput();
      this.toggleModal('Error', <string>e)
    }
  }

  //takes in 2 string arrays, 1st one with numbers and 2nd with operands and make calculations
  calculate = (numArray:string[], opArray:string[]):number => {
    let calc = +numArray[0];
    for(let i = 0; i < opArray.length; i++){
        switch (opArray[i]){
            case '+':
                calc += +numArray[i+1];
                break;
            case '-':
                calc -= +numArray[i+1];
                break;
            case '*':
                calc *= +numArray[i+1];
                break;
            case '/':
                if(+numArray[i+1] === 0){ 
                  //throw err for zero division
                  throw new Error("Can't divide by zero.");
                }
                calc /= +numArray[i+1];
                break;
        }
    }

    //throw err for invalid operation
    if(isNaN(calc)){ throw new Error("Invalid Operation"); }

    return calc;
  
  }//end of calculate function

}//end of component
