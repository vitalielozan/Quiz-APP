let currentQuestionIndex = 0;
let difficultyIndex = 0;
let score = 0;
let questions = [];
let quizDifficulty = 'easy';
let difficulty_id;

const btnStart = document.querySelector('#btnStart');
const btnNext = document.querySelector('#btnNext');
const btnNextLevel = document.querySelector('#btnNextLevel');
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

btnStart.addEventListener('click', startQuiz);
async function startQuiz() {
  startScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  await fetchQuestions();
  showQuestion();
}

async function fetchQuestions() {
  difficulty_id = selectDifficulty.value;
  let url = `./questions.json?questions=${difficulty_id}`;
  try {
    let response = await fetch(url);
    questions = await response.json();
    return questions;
  } catch (error) {
    console.log('Error', error);
  }
}
// Preluam Intrebarea ???
function showQuestion() {
  resetState();
  let questionCurrent = questions.difficulty[currentQuestionIndex];
  console.log(questionCurrent);
  document.querySelector('#textQuestion').innerText = questionCurrent;

  questionCurrent.answers.forEach((answer) => {
    let button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.corect) {
      button.dataset.corect = answer.corect;
    }
    btnAnswer.appendChild(button);
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  btnNext.style.display = 'none';
  btnNextLevel.style.display = 'none';
  btnRestart.style.display = 'none';
  btnAnswer.innerHTML = '';
}

function selectAnswer() {}

btnNext.addEventListener('click', nextQuestion);
function nextQuestion() {}

btnNextLevel.addEventListener('click', showLevelResult);
function showLevelResult() {}

function showResult() {}

btnRestart.addEventListener('click', restartQuiz);
function restartQuiz() {}
