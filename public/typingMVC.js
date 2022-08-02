let game = null;
let pointsScored = "";

const getAnElement = function (selector) {
  return document.querySelector(selector);
}

const updateClassName = function (className) {
  getAnElement('.text').className = className;
};

const compareKey = function () {
  let key = event.key;
  let keyEvaluationResult = game.evaluateKey(key);
  if (['green', 'red'].includes(keyEvaluationResult)) {
    return updateClassName(keyEvaluationResult);
  }
  game.stopTimer();
  return onFinished(keyEvaluationResult);
};

const onFinished = function (score) {
  getAnElement('#score').addClass("visible");
  let temp = Object.keys(score);
  let time = score[temp[0]];
  pointsScored = `time : ${time.min}m ${time.sec}s\n`;
  for (let index = 1; index < temp.length; index++) {
    pointsScored += `${temp[index]} : ${score[temp[index]]}\n`;
  }
  updateView('score', pointsScored);
  alert(pointsScored);
  // displayScore(pointsScored);
  return window.location = "playerInfo.htm";
};


const timer = function () {
  if (game.time.sec < 60) {
    return getAnElement('#secs').innerHTML = game.time.sec++ + "s";
  }
  getAnElement('#minute').innerHTML = (++game.time.min) + "m";
  game.time.sec = 0;
};

const startTimer = function () {
  getAnElement('#userInput').onclick = null;
  if (!this.timer) {
    return game.timer = setInterval(timer, 1000);
  }
  return null;
};

const displayChallenge = function (challenge) {
  challenge = challenge.split('').map(function (ele) {
    return '<span class="text">' + ele + '</span>'
  });
  getAnElement('#challenge').innerHTML = challenge.join('');
};

const loadGame = function () {
  game.generateParagraph();
  displayChallenge(game.paragraph);
};

const updateView = function (id, value) {
  getAnElement("#" + id).innerText = value;
};

const addListeners = function () {
  game = new Game();
  getAnElement('#userInput').addEventListener("click", startTimer);
  document.body.addEventListener("keypress", compareKey);
  loadGame();
};

window.onload = addListeners;


const data = ["abandon", "ability", "able", "about", "above", "abroad",
  "absence", "absent", "absolute.", "abstract", "abuse", "abusive", "academic",
  "accept", "acceptable", "acceptance", "access", "accident", "accompany",
  "according to", "account", "accountant", "accurate", "a", "of", "the", "hello",
  "sharply", "disagreeable", "unpleasant.", "or", "harsh", "choose", "not", "to",
  "consume", "is", "an", "American", "multinational", "technology.", "company",
  "that", "specializes", "Internet", "related", "services", "and", "products",
  "These", "include", "online", "advertising", "technologies", "search", "cloud",
  "computing", "software", "and", "hardware.", "Google", "was", "founded", "vocabulary",
  "before", "you", "start", "studying", "vocabulary", "keep", "mind", "that", "will",
  "need", "learn", "lot", "more", "words.", "However,", "studying", "right", "words",
  "proper", "depth", "will", "help", "become.", "fluent", "English", "much", "faster.",
  "but", "has", "received", "significant", "criticism", "involving", "issues", "such",
  "world's", "information", "and", "make", "it", "universally", "accessible", "and",
  "useful", "as", "privacy", "concerns"
];