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

let zero = document.querySelector(".zero");
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
let five = document.querySelector(".five");
let six = document.querySelector(".six");
let seven = document.querySelector(".seven");
let eight = document.querySelector(".eight");
let nine = document.querySelector(".nine");

numbersArray = [zero, one, two, three, four, five, six, seven, eight, nine];

let plusButton = document.querySelector("#plus");
let minusButton = document.querySelector("#minus");
let multiplyButton = document.querySelector("#multiply");
let divideButton = document.querySelector("#divide");


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

    if (e.key >= "0" && e.key <= "9") {
        numbersArray[Number(e.key)].click();
    }

    if (e.key == "c" || e.key == "C") {
        clear.click();
    }

    if (e.key == "Backspace") {
        deleteButton.click();
    } 

    if (e.key == ".") {
        decimal.click();
    }

    if (e.key == "=" || e.key == "Enter") {
        equal.click();
    }

    if (OPERATORS.includes(e.key)) {
        switch(e.key) {
            case "+":
                plusButton.click();
                break;
            case "-": 
                minusButton.click();
                break;
            case "*": 
                multiplyButton.click();
                break;
            case "/":
                divideButton.click();
                break;
        }
    }
})

