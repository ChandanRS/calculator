let opsArray = [];
class Calculator{
    constructor(prevExp,currExp){
        this.prevExp = prevExp;
        this.currExp = currExp;
        this.clear();
    };
    
    clear(){
       this.currentOperand = '';
       this.previousOperand = '';
       this.operation = undefined;
    }

    delete(){
        this.currentOperand  = this.currentOperand.toString().substring(0,this.currentOperand.length-1)
    }

    appendNumber(number){
        if( number == "." && this.currentOperand.toString().includes(".")) return;
        this.currentOperand = this.currentOperand.toString()+ number.toString();
    }

    
    appendOperator(operator){
        

        //if currentOperand is 5+- then return
        if( operator.match(ops) && this.currentOperand[(this.currentOperand.length-1)].match(ops)) return;

        //add operater to currentOperand
        this.currentOperand = this.currentOperand.toString()+ operator.toString();

        //add previousOperand and currentOperand strings
        this.previousOperand = this.previousOperand.toString() +  this.currentOperand.toString() ;

        //Add current operator 
        this.currop = operator;
        this.presentoperator = operator;
        console.log(`previousOperand:${this.previousOperand}`)
        console.log(this.previousOperand.match(ops));
        // if(this.previousOperand.match(ops).length == 1 ){
        //     this.currop = this.previousOperand.match(ops)[0]
        // }
        // else if(this.previousOperand.match(ops).length>=2){
        //     this.currop = this.previousOperand.match(ops)[this.previousOperand.match(ops).length-1];
        // }
       
        console.log(`curr op : ${this.currop}`)
        this.prevop = this.previousOperand.match(ops)[0];
        console.log(   `prev op : ${this.prevop}`)
        // this.currop = this.prevop;
       
        

        if(this.previousOperand &&  this.previousOperand.match(ops).length>1){
            this.prevop = this.previousOperand.match(ops)[0];
            // this.currop = this.prevop;
           
            this.compute()
           
        }
        if(this.previousOperand.match(ops).length < 2){
            this.prevop = this.currop
        }
        this.currentOperand = '';
        
        // this.prevop = this.currop ;
        // this.previousOperand = this.previousOperand.toString() +  this.currop; 
        // if(this.previousOperand.match(ops).length > 1)
        // this.compute()
        // this.currentOperand = '';
    }
    
//Previous operand is executed after one operand. This should be rectified

    compute(){
   
        //  if (this.previousOperand[(this.previousOperand.length-1)].match(ops)) return;
        //   this.previousOperand = this.previousOperand.toString() +  this.currentOperand.toString() ;
          let first  = parseInt(this.previousOperand)
          let second = parseInt(this.currentOperand)
          let result = 0;
          console.log(`cur op: ${this.currop}`)
          switch(this.prevop){
              case '+':
              result = first + second;
              break;
              case '-':
              result = first - second;
              break;
              case 'x':
              result = first * second;
              break;
              case '/':
              result = first / second;
              break;
              default: result = 0;

          }
         console.log(this.previousOperand)
         console.log(first);
         console.log(second);
         console.log(`result:${result}`);

         this.currentOperand = result;
        // if(!this.operator)
         this.previousOperand = result.toString() + this.currop;
        //  console.log(this.previousOperand.match(ops))
         //if(this.previousOperand.match(ops))
        //  console.log(this.previousOperand.match(ops))
    }

    

    updateDisplay(){
        this.currExp.innerText = this.currentOperand ;
        this.prevExp.innerText = this.previousOperand ;
    }

    
}


let numbers = document.querySelectorAll("[data-number]");
let operators = document.querySelectorAll("[data-operator]");
let clearBtn =  document.querySelector("[data-clear]");
let deleteBtn = document.querySelector("[data-delete]");
let equal = document.querySelector("[data-equals]");
let prevExp = document.querySelector("[previous-exp]");
let currExp = document.querySelector("[current-exp]");
let ops = /[-+x/]/g;
// console.log("9-3+3/56x5".match(ops))


const calculator = new Calculator(prevExp,currExp)
numbers.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operators.forEach(operator=>{
    operator.addEventListener('click',()=>{
        calculator.appendOperator(operator.innerText)
        calculator.updateDisplay()
    })
})

clearBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})


deleteBtn.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})

equal.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})