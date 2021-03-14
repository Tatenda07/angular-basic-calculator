import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  [x: string]: any;

  input: string = '0';
  result: string = '0';

  constructor() { }

  ngOnInit(): void {
  }

  pressNum(num: string) {
    //clear the placeholder '0' not to be part of the user input
    if (this.input == '0') this.input = '';

    //reset the input field for new calculation.
    let resetSpace = this.input[this.input.length - 1];
    if (resetSpace == " ") this.input = '';

    this.input = this.input + num;
    this.calcAnswer();
  }


  getLastOperand() {
    let pos:number;
    console.log(this.input)
    pos = this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > pos) pos=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > pos) pos=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > pos) pos=this.input.lastIndexOf("/")
    console.log('Last '+this.input.substr(pos+1))
    return this.input.substr(pos+1)
  }


  pressOperator(op: string) {
    //clear the placeholder '0' not to be part of the user input
    if (this.input == '0') this.input = '';

    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      alert("You cannot enter two operators one after the other without a value in between.");
      return;
    }

    this.input = this.input + op
    this.calcAnswer();
  }


  clear() {
    if (this.input !="") {
      this.input = this.input.substr(0, this.input.length - 1)
    }
  }

  allClear() {
    this.result = '0'; // '0' zero is the place holder
    this.input = '0'; // '0' zero is the place holder
  }

  calcAnswer() {
    let formula = this.input;

    let lastKey = formula[formula.length - 1];

    if (lastKey === '.')  {
      formula = formula.substr(0, formula.length - 1);
    }

    lastKey = formula[formula.length - 1];

    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+' || lastKey === '.')  {
      formula = formula.substr(0, formula.length - 1);
    }

    console.log("Formula " + formula);
    this.result = eval(formula);
  }

  getAnswer() {
    this.calcAnswer();
    this.input = this.result + " ";
  }
}
