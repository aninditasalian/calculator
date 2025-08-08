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

document.addEventListener("keydown", (e) => {

    if (Number(e.key) || (e.key == "0") || (OPERATORS.includes(e.key))){
        display.textContent += `${e.key}`;
    }
    if (e.key == "c" || e.key == "C") {
        display.textContent = "";
    }
    if (e.key == "Backspace") {
        display.textContent = display.textContent.slice(0, -1);
    } 
})


function returnResult(expression) {

    let operator;
    let indexOfOp;

    for (char of expression) {
        if (OPERATORS.includes(char)) {
            operator = char;
            indexOfOp = expression.indexOf(char);
            num1 = Number(expression.slice(0, indexOfOp));
            num2 = Number(expression.slice(indexOfOp + 1));
            let result = operate(num1, operator, num2);
            display.textContent = result;
        }
    }
}


equal.addEventListener("click", (e) => {
    let expression = display.textContent;
    returnResult(expression)
});

document.addEventListener("keydown", (e) => {
    let expression = display.textContent;
    if (e.key == "=" || e.key == "Enter") {
        returnResult(expression);
    }
})


let firstExpression = false;

buttonContainer.addEventListener("click", (e) => {
    let expression;
    let operator;
    if (OPERATORS.includes(e.target.className)) {
        expression = display.textContent;
        operator = expression.slice(-1)
        expression = expression.slice(0,-1);
        for (let i = 0; i < expression.length; i++) {
            if (OPERATORS.includes(expression[i])) {
                returnResult(expression);
                display.textContent += operator;
            }
        }
    }
}) 

document.addEventListener("keydown", (e) => {
    let expression;
    let operator;
    if (OPERATORS.includes(e.key)) {
        expression = display.textContent;
        operator = expression.slice(-1)
        expression = expression.slice(0,-1);
        for (let i = 0; i < expression.length; i++) {
            if (OPERATORS.includes(expression[i])) {
                returnResult(expression);
                display.textContent += operator;
            }
        }
    }
}) 