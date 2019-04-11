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
  this.score = 0;
  this.turnScore=[];
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
    this.roundScore=0;
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
  $(".game-display").hide();
  $(".buttons1").hide();
  $(".buttons2").hide();

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

    $(".game-display").fadeIn("slow");
    $(".buttons1").fadeIn("slow");

    $("#form-names").hide();
  });

  //Player1 roll and hold
  $("#roll1").click(function(){
    var rollDice=player1.rollDie();
    var updater = player1.roundUpdater(rollDice);
    
    $(".player1-roll-scores").text(" " + updater);
    $(".player1-turn-score").text(" " + player1.continue());
    $(".player1-total-score").text(" " + player1.score);

    if (updater === "You Hit 1"){

      $('.enableOnInput').prop('disabled', true);



      $(".buttons1").hide();
      $(".buttons2").show();
    }
    
    var winner=player1.scoreCheck();
  });

  
  $("#hold1").click(function () {
    player1.stop();
    player1.newTurn();
    $(".player1-roll-scores").text(" " + player1.turnScore);
    $(".player1-turn-score").text(0);
    $(".player1-total-score").text(" " + player1.score);

    var winner = player1.scoreCheck();

    if (winner === "You Won"){
      alert("Congratulations "+player1.name+ "!");
      player1.newGame();
      player2.newGame();
      $(".player1-turn-score").text(" " + player1.roundScore);
      $(".player1-total-score").text(" " + player1.score);
      $(".player1-turn-score").text(" " + player1.roundScore);
      $(".player2-total-score").text(" " + player1.score);
      $(".player2-roll-scores").text("");
      $(".player2-roll-scores").text("");
    }
     else {
      $(".buttons1").hide();
      $(".buttons2").show();
    }
  });

  //Player2 roll and hold
  $("#roll2").click(function () {
    var rollDice = player2.rollDie();
    var updater = player2.roundUpdater(rollDice);

    $(".player2-roll-scores").text(" " + updater);
    $(".player2-turn-score").text(" " + player2.continue());
    $(".player2-total-score").text(" " + player2.score);

    if (updater === "You Hit 1") {
      $(".buttons2").hide();
      $(".buttons1").show();
    }

    var winner = player2.scoreCheck();
  });
  $("#hold2").click(function () {
    player2.stop();
    player2.newTurn();
    $(".player2-roll-scores").text(" " + player2.turnScore);
    $(".player2-turn-score").text(0);
    $(".player2-total-score").text(" " + player2.score);

    var winner = player2.scoreCheck();

    if (winner === "You Won") {
      alert("Congratulations " + player2.name + "!");
      player1.newGame();
      player2.newGame();
      $(".player1-turn-score").text(" " + player1.roundScore);
      $(".player1-total-score").text(" " + player1.score);
      $(".player1-turn-score").text(" " + player1.roundScore);
      $(".player2-total-score").text(" " + player1.score);
      $(".player2-roll-scores").text("");
      $(".player2-roll-scores").text("");
    }
    else {
      $(".buttons2").hide();
      $(".buttons1").show();
    }
  });

});