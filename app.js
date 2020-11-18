'use strict';
/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What happens on the first full moon of the month?',
      answers: [
        'Nothing',
        'The freaks come out at night',
        'Werewolves begin the transformation',
        'You check your horoscope',
      ],
      correctAnswer: 'Nothing',
    },
    {
      question: '"What is the total number of dots on a pair of dice?"',
      answers: [42, 36, 39, 49],
      correctAnswer: 42,
    },
    {
      question: 'Which bird has the largest wingspan?',
      answers: ['Eagle', 'Vulture', 'Albatross', 'Pteradactyl'],
      correctAnswer: 'Albatross',
    },
    {
      question:
        'A roar from a lion can be heard from a max distance of how far?',
      answers: ['100 yards', '500 yards', '1 mile', '5 miles'],
      correctAnswer: '5 miles',
    },
    {
      question: 'With what did the ancient romans dye their hair?',
      answers: ['Wine', 'Ash', 'Bird poop', 'Foreign spices'],
      correctAnswer: 'Bird poop',
    },
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
};

function generateMainPage() {
  return `<div class="mainPage">
  <h2>Odd Quiz</h2>
  <p>Strange but factual. Enjoy!</p>
  <button id="startQuiz">Start Quiz</button>
</div> 
`;
}

function generateQuestionPage() {
  let question = store.questions[store.questionNumber];
    
  let answers = question.answers.map((answer, idx) =>{
    console.log(answer,idx);

    if (idx === 0) {
      return `<input type="radio" id="answer${idx}" name="answer" value="${answer}" required>
      <label for="answer${idx}">${answer}</label><br>`;
    } else {
      return `<input type="radio" id="answer${idx}" name="answer" value="${answer}">
        <label for="answer${idx}">${answer}</label><br>`;
    }
  });
  console.log(answers);
  console.log(question);
  return `<div class="maninPage">
  <div class="status"><Span class="currentQuestion">Current Question: ${store.questionNumber + 1}</span></div>
  <span class="score">Current Score: ${store.score}</span>
  </div>

  <form id="question">
   <h2>${question.question}</h2>
    ${answers.join('')}
    <button type="submit">Submit Answer</button>
    </form>
  </div>
`;

}
function generateFinalPage(){
  return `
  <div class="finalPage">
  <h2>Congrats on completing the quiz!</h2>
  <p>Final Score: ${store.score}</p>
  <button id="startOver">Start Over</button>
</div> 
`;
}
/**
 *
 * Technical requirements:
 *
 * Your app should include a render() function, that regenerates the view each time the store is updated.
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 *
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)
function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function (evt) {
    store.quizStarted = true;
    render();
  });
}

function handleAnswerSubmit() {
  $('main').on('submit', '#question', function (event) {
    event.preventDefault();
    let chosenAnswer = $('input[name=\'answer\']:checked').val();
    console.log(chosenAnswer);
    // compare against correct answer
    // show user if they are right or wrong

    // proceed to next question
    store.questionNumber++;
    console.log('question number', store.questionNumber);
    render();
  });
}

function render() {
  let html = '';
  if (store.quizStarted) {
    if(store.questionNumber === store.questions.length){
      html = generateFinalPage();
    } else{  
      html = generateQuestionPage();
    }  
  }else{
    html = generateMainPage();
  }

  $('main').html(html);
}

function main() {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
}
$(main);
