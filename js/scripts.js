//business logic
//create Player constructor
function Player(name, roundScore, score){
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

Player.prototype.continue=function(){
  this.roundScore = _.reduce(this.turnScore, function (memo, num) { return memo + num; }, 0);
  return this.roundScore;
};

Player.prototype.stop=function(){
  this.score += this.roundScore;
  return this.score;  
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
  var player1;
  var player2;

  $("#form-names").submit(function(event){
    event.preventDefault();

    var player1Name = $("#player1-name").val();
    var player2Name = $("#player2-name").val();

    player1 = new Player(player1Name,0,0);
    player2 = new Player(player2Name,0,0);

    $(".name1").text(player1Name);
    $(".name2").text(player2Name);

    $("#form-names").hide();
  });

  //Player1 roll and hold
  $("#roll1").click(function(){
    var rollDice=player1.rollDie();
    
    $(".player1-roll-scores").text(" " + player1.roundUpdater(rollDice));
    $(".player1-turn-score").text(" " + player1.continue());
    $(".player1-total-score").text(" " + player1.score);

    // if (rollDice === "You Hit 1"){
    //   $(".buttons1").fadeOut("slow");
    //   $(".buttons2").fadeIn("slow");
    // }
    
    var winner=player1.scoreCheck();
  });

  
  $("#hold1").click(function () {
    player1.stop();
    // $(".player1-roll-scores").text(0);
    // $(".player1-turn-score").text(0);
    $(".player1-total-score").text(" " + player1.score);

    var winner = player1.scoreCheck();

    if (winner === "You Won"){
      alert("congratulations "+player1.name);
      player1.newGame();
      player2.newGame();
      $(".player1-turn-score").text(" " + player1.roundScore);
      $(".player1-total-score").text(" " + player1.score);
      $(".player2-turn-score").text(" " + player1.roundScore);
      $(".player2-total-score").text(" " + player1.score);
    }
  });

  //Player2 roll and hold
  $("#roll2").click(function () {

  });
  $("#hold2").click(function () {

  });

});