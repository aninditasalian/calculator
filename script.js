const OPERATORS = ["+", "-", "*", "/"];


function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1*num2;
}

function divide(num1, num2) {
    return num1/num2;
}

function operate(num1, operator, num2) {
    switch(operator) {
        case "+":
            return add(num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        default: return "invalid operator"
    }
}

let display = document.querySelector(".display");
display.textContent = "";

let clear = document.querySelector(".clear");
let equal = document.querySelector(".equal");
let deleteButton = document.querySelector(".delete");


const buttonContainer = document.querySelector(".buttonContainer");

buttonContainer.addEventListener("click", (e) => {
    if (Number(e.target.className) || (e.target.className == "0") || (OPERATORS.includes(e.target.className))){
        display.textContent += `${e.target.className}`;
    }
    if (e.target.className == "clear") {
        display.textContent = "";
    } 
    if (e.target.className == "delete") {
        display.textContent = display.textContent.slice(0, -1);
    }
})


function returnResult() {
    let expression = display.textContent;
    
    let operator;
    let indexOfOp;

    for (char of expression) {
        if (OPERATORS.includes(char)) {
            operator = char;
            indexOfOp = expression.indexOf(char);
        }
    }

    num1 = Number(expression.slice(0, indexOfOp));
    num2 = Number(expression.slice(indexOfOp + 1));

    let result = operate(num1, operator, num2);
    display.textContent = result;
}


equal.addEventListener("click", returnResult)