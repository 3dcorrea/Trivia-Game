$(document).ready(function () {
  $("#start-button").on("click", gameState.startTimer);
});
var gameState = {
  timeRemaining: 120,

  startTimer: function () {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },
  countdown: function () {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },
  stopTimer: function () {
    clearInterval();
    trivia.checkAnswers();
  },
  showEndPage: function (numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers (Winner Winner Chicken Dinner!!!): " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers (Wrongo!!!): " + numIncorrect);
    $("#unanswered").text("Skipped questions (You aint slick, you jive turkey!!!): " + numUnanswered);
  }
}

var trivia = {
  displayQuestions: function () {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');

    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];
      var answer4 = questionBank[i].answers[3];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer4 + '</label></div>');
    }
    var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  checkAnswers: function () {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio' + i + ']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

var questionBank = [{
    question: "Who is the strongest?",
    answers: ["Cosmic Armor Superman with a Super Mario \"Star\" powerup", "Thanos with Infinity Gauntlet and a \"Reverse\" Uno card", "Mastered Ultra Instinct Gogeta with Rinnegan and a 1st Edition Charizard", "Pizza the Hut at full pepperoni capacity"],
    correct: "Shaggy at 1% power after a rough night of drinking"
  },
  {
    question: "What is the greatest website ever created?",
    answers: ["Google.com", "W3schools.com", "Placecage.com", "getbootstrap.com"],
    correct: "Placecage.com"
  },
  {
    question: "Where has Waldo REALLY been all these years?",
    answers: ["At the last Roy Rogers in existence", "In rehab for \"substance abuse\"", "At Starbucks condescendingly sipping an $18 fair trade pour-over, continuously pushing to master out of spite", "Looking for Carmen Sandiego"],
    correct: "Looking for Carmen Sandiego"
  },
  {
    question: "In 1978, Superman teamed up with what well-known persona to defeat an alien invasion?",
    answers: ["Charles Manson", "A resurrected Benito Mussolini", "Muhammad Ali", "Ted Bundy"],
    correct: "Muhammad Ali"
  },
  {
    question: "Rounded to the nearest ten thousand square miles, what is the area of Idaho?",
    answers: ["82,751 square miles", "20 square miles", "520,000 square miles", "9001 square miles"],
    correct: "82,751 square miles"
  },
  {
    question: "In China, animals are forbidden to use human language. This belief led to the ban of a book of which famous writer, in the country?",
    answers: ["E.L. James, \"50 Shades of Grey\"", "Miguel de Cervantes, \"Don Quixote\"", "Lewis Carroll, \"Alice's Adventures in Wonderland\"", "Vātsyāyana, \"Kama Sutra\""],
    correct: "Lewis Carroll, \"Alice's Adventures in Wonderland\""
  },
  {
    question: "Why does my wife do that weird thing with her cheek?",
    answers: ["Don't know, don't care", "She's having a stroke", "She's severely dehydrated", "I understand that this is a freebee question, so I'll pick this one"],
    correct: "I understand that this is a freebee question, so I'll pick this one"
  }
]