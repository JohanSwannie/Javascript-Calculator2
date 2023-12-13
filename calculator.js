class Calculator {
  constructor(PREVOPER, CURROPER) {
    this.PREVOPER = PREVOPER;
    this.CURROPER = CURROPER;
    this.clearCalculator();
  }

  clearCalculator() {
    this.prevOper = "";
    this.currOper = "";
    this.operation = undefined;
  }

  deleteInput() {
    this.currOper = this.currOper.toString().slice(0, -1);
  }

  operator(operation) {
    if (this.currOper === "") {
      return;
    }
    if (this.prevOper !== "") {
      this.calculation();
    }
    this.prevOper = this.currOper;
    this.currOper = "";
    this.operation = operation;
  }

  numberAdd(number) {
    if (number === "." && this.currOper.includes(".")) {
      return;
    }
    this.currOper = this.currOper.toString() + number.toString();
  }

  convertedNumber(number) {
    const strN = number.toString();
    const intN = parseFloat(strN.split(".")[0]);
    const decN = strN.split(".")[1];
    let intD;
    if (isNaN(intN)) {
      intD = "";
    } else {
      intD = intN.toLocaleString("en", { maximumFractionDigits: 0 });
    }
    if (decN != null) {
      return `${intD}.${decN}`;
    } else {
      return intD;
    }
  }

  displayChange() {
    this.CURROPER.innerText = this.convertedNumber(this.currOper);
    if (this.operation != null) {
      this.PREVOPER.innerText = `${this.convertedNumber(this.prevOper)} ${
        this.operation
      }`;
    } else {
      this.PREVOPER.innerText = "";
    }
  }

  calculation() {
    let calcResult;
    let prevDisplay = parseFloat(this.prevOper);
    let currDisplay = parseFloat(this.currOper);
    if (isNaN(prevDisplay) || isNaN(currDisplay)) {
      return;
    }
    switch (this.operation) {
      case "+":
        calcResult = prevDisplay + currDisplay;
        break;
      case "-":
        calcResult = prevDisplay - currDisplay;
        break;
      case "*":
        calcResult = prevDisplay * currDisplay;
        break;
      case "/":
        calcResult = prevDisplay / currDisplay;
        break;
      default:
        return;
    }
    this.prevOper = "";
    this.currOper = calcResult;
    this.operation = undefined;
  }
}

const OPERATION = document.querySelectorAll("[operation]");
const NUMBERS = document.querySelectorAll("[number]");
const CLEAR = document.querySelector("[clear]");
const DELETE = document.querySelector("[delete]");
const EQUAL = document.querySelector("[equal]");
const PREVOPER = document.querySelector("[pOper]");
const CURROPER = document.querySelector("[cOper]");

const CALCULATOR = new Calculator(PREVOPER, CURROPER);

NUMBERS.forEach((button) => {
  button.addEventListener("click", () => {
    CALCULATOR.numberAdd(button.innerText);
    CALCULATOR.displayChange();
  });
});

OPERATION.forEach((button) => {
  button.addEventListener("click", () => {
    CALCULATOR.operator(button.innerText);
    CALCULATOR.displayChange();
  });
});

EQUAL.addEventListener("click", () => {
  CALCULATOR.calculation();
  CALCULATOR.displayChange();
});

CLEAR.addEventListener("click", () => {
  CALCULATOR.clearCalculator();
  CALCULATOR.displayChange();
});

DELETE.addEventListener("click", () => {
  CALCULATOR.deleteInput();
  CALCULATOR.displayChange();
});

function playSound1() {
  document.getElementById("myaudio1").play();
}

function playSound2() {
  document.getElementById("myaudio2").play();
}

function playSound3() {
  document.getElementById("myaudio3").play();
}
