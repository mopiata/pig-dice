//business logic
//create Player constructor
function Player(name,score){
  this.name=name;
  this.score=score;
  this.turnScore=[];
  this.roundScore=roundScore;
};

Player.prototype.newGame=function(){
  this.roundScore=0;
};

Player.prototype.rollDie=function(){
  var diceScore = Math.floor(Math.random() * 6) + 1  ;
  return diceScore;
};

//to pass result of rollDie() function
Player.prototype.roundUpdater=function(score){
  if(score!==1){
    this.turnScore.push(score);
    return this.turnScore.join("-");
  }else{
    this.turnScore=[];
    return "You Hit 1";
  }
};

Player.prototype.stop=function(){
  this.roundScore = _.reduce(this.turnScore, function (memo, num) { return memo + num; }, 0);
  this.score += this.roundScore;  
};

Player.prototype.newTurn=function(){
  this.turnScore = [];
};
Player.prototype.scoreCheck=function(){
  if(this.score>=100){
    return "You Won";
  }
};


$(document).ready(function(){
  $("#form-names").submit(function(event){
    event.preventDefault();

    var player1Name = $("#player1-name").val();
    var player2Name = $("#player2-name").val();

    // alert("Player1: " + player1Name + " Player2: " + player2Name);
  });
});