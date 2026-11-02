const currentOperandText = document.getElementById("current-operand");
const previousOperandText = document.getElementById("previous-operand");
const keypad = document.querySelector(".keypad");

let currentOperand = "0";
let previousOperand = "";
let operator = null;
let shouldResetDisplay = false;

// Updates the numbers shown on the calculator screen.
function updateDisplay() {
  currentOperandText.textContent = currentOperand;
  previousOperandText.textContent = operator
    ? `${previousOperand} ${getOperatorSymbol(operator)}`
    : "";
}

function getOperatorSymbol(value) {
  const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };
  return symbols[value] || value;
}

// Adds a digit to the current number.
function appendNumber(number) {
  if (currentOperand === "Error" || shouldResetDisplay) {
    currentOperand = number;
    shouldResetDisplay = false;
  } else if (currentOperand === "0") {
    currentOperand = number;
  } else if (currentOperand.length < 14) {
    currentOperand += number;
  }
  updateDisplay();
}

// Adds a decimal point, but only one per number.
function addDecimal() {
  if (currentOperand === "Error" || shouldResetDisplay) {
    currentOperand = "0";
    shouldResetDisplay = false;
  }
  if (!currentOperand.includes(".")) {
    currentOperand += ".";
  }
  updateDisplay();
}

// Stores the first number and the selected operation.
function chooseOperator(nextOperator) {
  if (currentOperand === "Error") return;

  if (operator && !shouldResetDisplay) {
    calculate();
  }

  previousOperand = currentOperand;
  operator = nextOperator;
  shouldResetDisplay = true;
  updateDisplay();
}

// Performs the selected calculation.
function calculate() {
  if (!operator || previousOperand === "") return;

  const firstNumber = Number(previousOperand);
  const secondNumber = Number(currentOperand);
  let result;

  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "-":
      result = firstNumber - secondNumber;
      break;
    case "*":
      result = firstNumber * secondNumber;
      break;
    case "/":
      if (secondNumber === 0) {
        currentOperand = "Error";
        previousOperand = "";
        operator = null;
        shouldResetDisplay = true;
        updateDisplay();
        return;
      }
      result = firstNumber / secondNumber;
      break;
    default:
      return;
  }

  if (!Number.isFinite(result)) {
    currentOperand = "Error";
  } else {
    // Limits long decimal answers without changing whole numbers.
    currentOperand = String(Number(result.toPrecision(10)));
  }

  previousOperand = "";
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

function clearCalculator() {
  currentOperand = "0";
  previousOperand = "";
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteDigit() {
  if (currentOperand === "Error" || shouldResetDisplay) {
    currentOperand = "0";
    shouldResetDisplay = false;
  } else {
    currentOperand = currentOperand.length > 1
      ? currentOperand.slice(0, -1)
      : "0";
  }
  updateDisplay();
}

function convertToPercent() {
  if (currentOperand !== "Error") {
    currentOperand = String(Number(currentOperand) / 100);
    updateDisplay();
  }
}

// One click listener handles all calculator buttons.
keypad.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) {
    appendNumber(button.dataset.number);
  } else if (button.dataset.operator) {
    chooseOperator(button.dataset.operator);
  } else {
    switch (button.dataset.action) {
      case "clear":
        clearCalculator();
        break;
      case "delete":
        deleteDigit();
        break;
      case "decimal":
        addDecimal();
        break;
      case "percent":
        convertToPercent();
        break;
      case "equals":
        calculate();
        break;
    }
  }
});

// Allows number keys and basic operation keys to work too.
document.addEventListener("keydown", (event) => {
  if (/^[0-9]$/.test(event.key)) appendNumber(event.key);
  else if (event.key === ".") addDecimal();
  else if (["+", "-", "*", "/"].includes(event.key)) chooseOperator(event.key);
  else if (event.key === "Enter" || event.key === "=") {
    event.preventDefault();
    calculate();
  } else if (event.key === "Backspace") deleteDigit();
  else if (event.key === "Escape") clearCalculator();
  else if (event.key === "%") convertToPercent();
});

updateDisplay();
