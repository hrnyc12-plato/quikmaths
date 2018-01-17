// returns a random number
// can check for parity or if used for lead digit (not 0)
// allowZero allows for returning zero
const randomizer = (notAllowed = 0, parity, leadDigit, allowZero = false) => {
  result = 0;
  while (result === notAllowed || !allowZero) {
    result = Math.floor(Math.random() * 10);
    if (parity && result % 2 !== notAllowed % 2) {
      result = notAllowed;
    }
    if (leadDigit && result === 0) {
      result = notAllowed;
    }
    if (result !== notAllowed) {
      allowZero = true;
    }
  }
  return result;
};

// temp functions object
const operations = {
  '+' : (x, y) => {return x + y},
  '-' : (x, y) => {return x - y},
  '*' : (x, y) => {return x * y},
  '/' : (x, y) => {return x / y}
};

// default max digit is 4
const numGenerator = (max = 5, min = 0) => {
  let digits = Math.ceil(Math.random() * (max - min) + min);
  let numString = ''
  for (let i = digits; i > 0; i--) {
    numString += randomizer().toString()
  }
  let toggleSign = Math.floor(Math.random() * 2)
  if (toggleSign === 0) {
    return Number(numString) * -1
  }
  return Number(numString)
};

const changeFirstDigit = (answer) => {
  let answerArray = answer.toString().split('');
  if (Number(answer) < 0) {
    answerArray[1] = randomizer(Number(answerArray[1]), false, true).toString();
  } else {
    answerArray[0] = randomizer(Number(answerArray[0]), false, true).toString();
  }
  return Number(answerArray.join(''))
};

const changeLastDigit = (answer) => {
  let answerArray = answer.toString().split('');
  let last = answerArray.length - 1;
  answerArray[last] = randomizer(Number(answerArray[last]), true).toString();
  return Number(answerArray.join(''))
};

const addTenth = (num) => {
  return Number(num) + randomizer(0, false, true) / 10
}

const moveDecimalPlace = (num) => {
  let decimalDirection = Math.floor(Math.random() * 2)
  if (decimalDirection === 0) {
    return num * .1;
  }
  return num * 10;
}

const incorrectAnswerGen = (operator, answer) => {
  if (operator === '/') {
    return [
      answer * -1,
      addTenth(answer),
      moveDecimalPlace(answer)
    ];
  } else {
    return [
      answer * -1,
      changeFirstDigit(answer),
      changeLastDigit(answer)
    ]
  }
};

const roundDigits = (answerArray) => {
  return answerArray.map((answer)=> {
    return Number(answer.toFixed(3));
  })
}



const questionGen = (operator, max, min) => {
  // generate numbers
  let num1 = numGenerator(max, min);
  let num2 = numGenerator(max, min);
  return answerGen([operator, num1, num2]);
};

const randomOperator = function() {
  const operators = ['*','+', '/','-'];
  const random = Math.floor(Math.random()*4);
  return operators[random];
};

const answerGen = (question) => {
  // use matching function from operations
  // question format [operator, num1, num2]
  let operation = operations[question[0]]
  let answer = Number(operation(question[1], question[2]))
  let answers = incorrectAnswerGen(question[0], answer)
  answers.push(answer);
  answers = roundDigits(answers);
  return {'question': question, 'choices': answers, 'correctAnswer': Number(answer.toFixed(3))};
};

const questionGenLevel3 = () => {
  const operator1 = randomOperator();
  const operator2 = randomOperator();
  const operator3 = randomOperator();

  const num1 = numGenerator(1, 0);
  const num2 = numGenerator(2, 0);
  const num3 = numGenerator(3, 1);
  const num4 = numGenerator(3, 0);

  const operation1 = operations[operator1];
  const operation2 = operations[operator2];
  const answer1 = Number(operation1(num1, num2));
  const answer2 = Number(operation2(answer1, num3).toFixed(3));
  const questionString = `[(${num1} ${operator1} ${num2}) ${operator2} ${num3}] ${operator3} ${num4}`;
  
  const questionObject = answerGen([operator3, answer2, num4]);
  questionObject.question = questionString;
  return questionObject;
};

module.exports.questionGen = questionGen;
module.exports.questionGenLevel3 = questionGenLevel3;











