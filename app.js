let currentQuestionIndex = 0;
let score = 0;
let questions = [];
let levelScores = [0, 0, 0];
let currentLevelIndex = 0;

const btnStart = document.querySelector('#btnStart');
const btnNext = document.querySelector('#btnNext');
const btnNextLevel = document.querySelector('#btnNextLevel');
const btnAnswer = document.querySelector('#btnAnswer');
const btnRestart = document.querySelector('#btnRestart');
const selectDifficulty = document.querySelector('#selectDifficulty');
const startScreen = document.querySelector('#startScreen');
const quizScreen = document.querySelector('#quizScreen');
const textQuestion = document.querySelector('#textQuestion');
const textExplanation = document.querySelector('#textExplanation');
const resultScreen = document.querySelector('#resultScreen');
const scoreDisplay = document.querySelector('#score');

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
  const quizDifficulty = await getDifficulty();
  quizDifficulty.difficulty.forEach((val, index) => {
    let valoare = Object.keys(val).toString();
    let option = document.createElement('option');
    option.setAttribute('value', `${index}`);
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
  currentLevelIndex = parseInt(selectDifficulty.value);
  currentQuestionIndex = 0;
  score = 0;
  levelScores = [0, 0, 0];

  showQuestion();
}

async function fetchQuestions() {
  try {
    let response = await fetch('./questions.json');
    questions = await response.json();
    return questions;
  } catch (error) {
    console.log('Error', error);
  }
}

function showQuestion() {
  resetState();
  const currentLevel = questions.difficulty[currentLevelIndex];
  const levelQuestions = Object.values(currentLevel)[0];
  console.log(levelQuestions);

  if (currentQuestionIndex < levelQuestions.length) {
    const questionCurrent = levelQuestions[currentQuestionIndex];
    textQuestion.innerText = questionCurrent.question;

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
  } else {
    endLevel();
  }
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

function endLevel() {}
