let currentQuestionIndex = 0;
let difficultyIndex = 0;
let score = 0;
let questions = [];
let quizDifficulty = 'easy';
let difficulty_id;

const btnStart = document.querySelector('#btnStart');
const btnNext = document.querySelector('#btnNext');
const btnAnswer = document.querySelector('#btnAnswer');
const btnRestart = document.querySelector('#btnRestart');
const selectDifficulty = document.querySelector('#selectDifficulty');
const startScreen = document.querySelector('#startScreen');
const quizScreen = document.querySelector('#quizScreen');
const resultScreen = document.querySelector('#resultScreen');

async function getDifficulty() {
  try {
    let response = await fetch('./questions.json');
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function displayDifficulty() {
  quizDifficulty = await getDifficulty();
  quizDifficulty.difficulty.forEach((val) => {
    let valoare = Object.keys(val).toString();
    let option = document.createElement('option');
    option.setAttribute('value', `${valoare}`);
    option.textContent = valoare;
    selectDifficulty.appendChild(option);
  });
}
window.addEventListener('load', displayDifficulty);

function updateDifficultyID() {
  difficulty_id = selectDifficulty.value;
}

btnStart.addEventListener('click', startQuiz);
async function startQuiz() {
  startScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  await fetchQuestions();
  showQuestion();
}

async function fetchQuestions() {
  let url = `./questions.json?questions=${difficulty_id}&mount=10`;
  try {
    let response = await fetch(url);
    questions = await response.json();
    return questions;
  } catch (error) {
    console.log('Error', error);
  }
}

function showQuestion() {
  resetState();
  updateDifficultyID();
  let questionCurrent = questions[currentQuestionIndex];
  document.querySelector('#textQuestion').innerText = questionCurrent.question;

  questionCurrent.answers.forEach((answer) => {
    let button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.corect) {
      button.dataset.corect = answer.corect;
    }
    button.addEventListener('click', selectAnswer);
    btnAnswer.appendChild(button);
  });
}

function resetState() {
  btnNext.style.display = 'none';
  btnRestart.style.display = 'none';
  btnAnswer.innerHTML = '';
}

function selectAnswer(e) {
  let selectedButton = e.target;
  let corect = selectedButton.dataset.corect === 'true';
  if (corect) {
    selectedButton.classList.add('corect');
    score++;
  } else {
    selectedButton.classList.add('wrong');
  }

  Array.from(btnAnswer.children).forEach((button) => {
    if (button.dataset.corect === 'true') {
      button.classList.add('corect');
    }
    button.disabled = true;
  });

  btnNext.style.display = 'block';
}

btnNext.addEventListener('click', nextQuestion);

function nextQuestion() {}

function showResult() {}

btnRestart.addEventListener('click', restartQuiz);
function restartQuiz() {}
