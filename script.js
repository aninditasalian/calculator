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
let decimal = document.querySelector("#decimal");

const buttonContainer = document.querySelector(".buttonContainer");

buttonContainer.addEventListener("click", (e) => {
    if (!isNaN(e.target.className) || OPERATORS.includes(e.target.className)){
        display.textContent += `${e.target.className}`;
    }

    if (OPERATORS.includes(e.target.className)) {
        let expression;
        let operator;
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


    if (e.target.id == "decimal") {
        display.textContent += `${e.target.className}`;
        decimal.disabled = true;
    }

    if (e.target.className == "clear") {
        display.textContent = "";
        decimal.disabled = false;
    } 

    if (e.target.className == "delete") {
        display.textContent = display.textContent.slice(0, -1);
        expression = display.textContent;
        let indexOfOp;
        let num;
        for (let char of expression) {
            if (OPERATORS.includes(char)) {
                indexOfOp = expression.indexOf(char);
                num = expression.slice(indexOfOp + 1);
            } else {
                num = display.textContent;
            }
            if (!num.includes(".")) {
                decimal.disabled = false;
            }
        }
    }
    
    if (e.target.className == "equal") {
        let expression = display.textContent;
        returnResult(expression);
        if (!display.textContent.includes(".")) {
            decimal.disabled = false;
        }
    }

})

function returnResult(expression) {

    let operator;
    let indexOfOp;

    for (let char of expression) {
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

document.addEventListener("keydown", (e) => {
    let expression = display.textContent;
    if (e.key == "=" || e.key == "Enter") {
        returnResult(expression);
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