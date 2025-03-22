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
const levelResultScreen = document.querySelector('#levelResultScreen');
const textQuestion = document.querySelector('#textQuestion');
const textExplanation = document.querySelector('#textExplanation');
const textLevelResult = document.querySelector('#textLevelResult');
const paragrafLevelResult = document.querySelector('#paragrafLevelResult');
const finalResultScreen = document.querySelector('#finalResultScreen');

async function fetchQuestions() {
  try {
    const response = await fetch('./questions.json');
    questions = await response.json();
    return questions;
  } catch (error) {
    console.log('Error', error);
  }
}

async function displayDifficulty() {
  const quizDifficulty = await fetchQuestions();
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

function showQuestion() {
  resetState();
  const currentLevel = questions.difficulty[currentLevelIndex];
  const levelQuestions = Object.values(currentLevel)[0];
  if (currentQuestionIndex < levelQuestions.length) {
    const questionCurrent = levelQuestions[currentQuestionIndex];
    textQuestion.innerText = questionCurrent.question;

    questionCurrent.answers.forEach((answer) => {
      let button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      btnAnswer.appendChild(button);
      button.addEventListener('click', selectAnswer);
    });
  } else {
    setTimeout(endLevel, 2000);
  }
}

function resetState() {
  btnNext.style.display = 'none';
  btnNextLevel.style.display = 'none';
  btnRestart.style.display = 'none';
  btnAnswer.innerHTML = '';
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === 'true';
  Array.from(btnAnswer.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.classList.add('corect');
    } else if (button === selectedButton && !isCorrect) {
      button.classList.add('wrong');
    }
    button.disabled = true;
  });
  if (isCorrect) {
    score++;
    levelScores[currentLevelIndex]++;
  }
  const currentLevel = questions.difficulty[currentLevelIndex];
  const levelQuestions = Object.values(currentLevel)[0];
  const questionCurrent = levelQuestions[currentQuestionIndex];

  const explanation = questionCurrent.explanation;
  textExplanation.innerHTML = explanation;
  btnNext.style.display = 'block';
}

btnNext.addEventListener('click', nextQuestion);
function nextQuestion() {
  currentQuestionIndex++;
  textExplanation.innerHTML = '';
  showQuestion();
}

function endLevel() {
  startScreen.style.display = 'none';
  quizScreen.style.display = 'none';
  levelResultScreen.style.display = 'block';
  textLevelResult.innerHTML = `Level ${getLavelName(
    currentLevelIndex
  )} was finalised!`;
  paragrafLevelResult.innerHTML = `Yuor score for this level: ${
    levelScores[currentLevelIndex]
  } / ${getLevelQuestions(currentLevelIndex).length}`;
  if (currentLevelIndex < 2) {
    btnNextLevel.style.display = 'inline-block';
    btnRestart.style.display = 'inline-block';
  } else {
    setTimeout(showFinalResults, 3000);
  }
}

btnNextLevel.addEventListener('click', nextLevel);
function nextLevel() {
  currentLevelIndex++;
  currentQuestionIndex = 0;
  levelResultScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  showQuestion();
}

function showFinalResults() {
  quizScreen.style.display = 'none';
  finalResultScreen.style.display = 'block';
  btnRestart.style.display = 'block';
  finalResultScreen.innerHTML = `
    <h2>Congratulation ! You has finished all levels:</h2>
    <p>Your score: ${score} / ${getTotalQuestions()}</p>
    <p>Your level score:</p>
    <ul>
      <li>Easy: ${levelScores[0]} / ${getLevelQuestions(0).length}</li>
      <li>Medium: ${levelScores[1]} / ${getLevelQuestions(1).length}</li>
      <li>Difficult: ${levelScores[2]} / ${getLevelQuestions(2).length}</li>
    </ul>
  `;
}

function getlevelScores() {}

btnRestart.addEventListener('click', restartQuiz);
function restartQuiz() {
  finalResultScreen.style.display = 'none';
  levelResultScreen.style.display = 'none';
  startScreen.style.display = 'block';
}

function getLavelName(levelIndex) {
  switch (levelIndex) {
    case 0:
      return 'Easy';
    case 1:
      return 'Medium';
    case 2:
      return 'Difficult';
    default:
      return '';
  }
}

function getLevelQuestions(levelIndex) {
  return Object.values(questions.difficulty[levelIndex])[0];
}

function getTotalQuestions() {
  return (
    getLevelQuestions(0).length +
    getLevelQuestions(1).length +
    getLevelQuestions(2).length
  );
}
