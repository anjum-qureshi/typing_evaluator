let Game = function(){
  this.paragraph = '';
  this.time = {min:0,sec:0};
  this.noOfWords = 0;
  this.incorrectLetterCount = 0;
  this.correctLetterCount = 0;
  this.index = 0;
  this.timer = null;
  this.score = 0;
};

Game.prototype.getNumberOfWords = function(min,max){
  return Math.floor(Math.random()*(max-min)+min);
};

Game.prototype.generateParagraph = function(){
  this.noOfWords = this.getNumberOfWords(50,60);
  for(let index = 0;index < this.noOfWords;index++)
    this.paragraph += data[Math.floor(Math.random()*data.length)] + " ";
  return this.paragraph;
};

Game.prototype.isKeyAsCuurentKey = function(pressedkey) {
  return pressedkey == this.paragraph[this.index];
};

Game.prototype.isTaskComplete = function() {
  return this.index == this.paragraph.length;
}

Game.prototype.evaluateKey = function(key){
  let className = "";
  if(this.isKeyAsCuurentKey(key)){
    this.correctLetterCount++;
    this.score += 5;
    className = 'green';
  }else{
    this.score -= 2;
    this.incorrectLetterCount++;
    className = 'red';
  }
  this.index++;

  if(this.isTaskComplete()){
    return this.onComplete();
  }
  return className;
};

Game.prototype.onComplete = function(){
  this.stopTimer();
  return {time:this.time, correctWords:this.correctLetterCount,
    inCorrectWords:this.incorrectLetterCount, score:this.score};
};

Game.prototype.startTimer = function(){
  game.timer = setInterval(function(){
    if(game.time.sec < 60){
      game.time.sec++;
    }
    game.time.min++;
  },1000);
};

Game.prototype.stopTimer = function(){
  clearInterval(game.timer);
};
