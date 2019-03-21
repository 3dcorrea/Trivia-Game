var quizContainer = document.$('quiz');
var resultsContainer = document.$('results');
var submitButton = document.$('submit');

function buildQuiz() {
    var output = [];
}

myQuestions.forEach((curentQuestion, questionNumber) => {

    // we'll want to store the list of answer choices
    var answers = [];

    // and for each available answer...
    for (letter in currentQuestion.answers) {

        // ...add an HTML radio button
        answers.push(
            `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
    }
})
output.push(
    `<div class="question"> ${currentQuestion.question} </div>
    <div class="answers"> ${answers.join('')} </div>`
);
quizContainer.innerHTML = output.join('');

function showResults() {
// gather answer containers from our quiz
const answerContainers = quizContainer.querySelectorAll('.answers');

// keep track of user's answers
let numCorrect = 0;

// for each question...
myQuestions.forEach( (currentQuestion, questionNumber) => {

  // find selected answer
  const answerContainer = answerContainers[questionNumber];
  const selector = 'input[name=question'+questionNumber+']:checked';
  const userAnswer = (answerContainer.querySelector(selector) || {}).value;

  // if answer is correct
  if(userAnswer===currentQuestion.correctAnswer){
    // add to the number of correct answers
    numCorrect++;

    // color the answers green
    answerContainers[questionNumber].style.color = 'lightgreen';
  }
  // if answer is wrong or blank
  else{
    // color the answers red
    answerContainers[questionNumber].style.color = 'red';
  }
});

// show number of correct answers out of total
resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
}


// display quiz right away
buildQuiz();

// on submit, show results
submitButton.$('click', showResults);

var myQuestions = [{
        question: "Who is the strongest?",
        answers: {
            a: "Cosmic Armor Superman",
            b: "Shaggy at 1% power",
            c: "Thanos with Infinity Gauntlet and a \"Reverse\" Uno card",
            d: "Mastered Ultra Instinct Goku"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the greatest website ever created?",
        answers: {
            a: "Google.com",
            b: "W3schools.com",
            c: "Placecage.com",
            d: "getbootstrap.com"
        },
        correctAnswer: "c"
    },
    {
        question: "Where has Waldo REALLY been all these years?",
        answers: {
            a: "At the last Roy Rogers in existence",
            b: "In rehab",
            c: "At Starbucks, condescendingly drinking an $18 fair trade pour-over",
            d: "Looking for Carmen Sandiego"
        },
        correctAnswer: "d"
    },
    {
        question: "In 1978, Superman teamed up with what popular persona to defeat an alien invasion?",
        answers: {
            a: "Johnny Cash",
            b: "John Travolta",
            c: "Muhammad Ali",
            d: "David Berkowitz"
        },
        correctAnswer: "c"
    }
];