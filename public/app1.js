class Calculator {
    constructor(previousValue,currentValue ) {
      this.previousValueElement = previousValue;
      this.currentValueElement = currentValue;
      this.currentVal = '';
      this.previousVal = '';
      this.operation = undefined;
      this.temp='';
     
    }

    updateNumber(number)
    {
        if (number === "." && this.currentVal.includes(".")) return // so only one decimal can be placed
        this.currentVal = this.currentVal.toString() + number.toString();
   
    }

    compute()
    {
        let result;
        const firstNum = parseFloat(this.previousVal);
        const secondNum = parseFloat(this.currentVal);
        if(isNaN(firstNum) || isNaN(secondNum) ) return // if any one of number is empty then return
        switch(this.operation){
         case '+':
             result = firstNum + secondNum;
             break
         case '-':
            result = firstNum - secondNum;
            break
         case 'x':
            result = firstNum * secondNum;
            break
        case '/':
            result = firstNum / secondNum;
            break
        default:
            return
        

        }
        //this.temp = this.currentVal;
       
        this.currentVal = result;
        this.operation = undefined;
        this.previousVal = '';
    }

    updateOperation(operator)
    {
        if(this.previousVal !== "") /// if someone clicks (12 + 1 ) or  (12 + 1 + )  so both will be 13
        {
            this.compute()
        }
        this.operation = operator;
        this.previousVal = this.currentVal;
        this.currentVal = "";

        
    }


    updateDisplay()
    {
       this.currentValueElement.innerText = this.currentVal;
      
       if(this.operation != null)
       {
        // this.previousValueElement.innerText = (`${this.previousVal} ${this.operation} ${this.temp}`);
        this.previousValueElement.innerText = (`${this.previousVal} ${this.operation}`);
       } 
     
       
    }

    delete()
    {
        this.previousVal = "";
        this.currentVal = "";
        this.operation = undefined;
    }
    
  }

var previousValueElement = document.getElementById('previousvalue');
var currentValueElement = document.getElementById('currentvalue');
var  digits = document.getElementById("digits");
var operations = document.getElementById("operations");
var remove = document.getElementById("delete");
var deleteButton = remove.querySelector("button");



  
  const myCalculator = new Calculator(previousValueElement,currentValueElement);
  for (const digit of digits.querySelectorAll("button"))
  {
    digit.addEventListener("click",() => 
    {
        myCalculator.updateNumber(digit.value);
        myCalculator.updateDisplay()
    });
  
  }


  for (const operation of operations.querySelectorAll("button"))
  {
   operation.addEventListener("click",() => 
    {
        myCalculator.updateOperation(operation.innerText);
        myCalculator.updateDisplay();
    });
  }

  var answer = document.getElementById("equals");
  answer.addEventListener("click",()=>
  {
      myCalculator.compute();
      myCalculator.updateDisplay();
  })

  deleteButton.addEventListener("click",()=>
  {
      myCalculator.delete();
      myCalculator.updateDisplay();
  });
