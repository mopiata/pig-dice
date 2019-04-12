//business logic
//create Player constructor
function Player(name, roundScore, score){
  this.name=name;
  this.score=score;
  this.turnScore=[];
  this.roundScore=roundScore;
};

Player.prototype.newGame=function(){
  location.reload();
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

//to pass result of rollDie() function
Player.prototype.showDie=function(score){
  if(score===1){
    document.getElementById("diceShow").innerHTML = '<img src="img/one.png" alt="1">';
  } else if (score === 2) {
    document.getElementById("diceShow").innerHTML = '<img src="img/two.png" alt="2">';
  } else if (score === 3) {
    document.getElementById("diceShow").innerHTML = '<img src="img/three.png" alt="3">';
  } else if (score === 4) {
    document.getElementById("diceShow").innerHTML = '<img src="img/four.png" alt="4">';
  } else if (score === 5) {
    document.getElementById("diceShow").innerHTML = '<img src="img/five.png" alt="5">';
  } else {
    document.getElementById("diceShow").innerHTML = '<img src="img/six.png" alt="6">';
  }
}

Player.prototype.continue=function(){
  this.roundScore = _.reduce(this.turnScore, function (memo, num) { return memo + num; }, 0);
  return this.roundScore;
};

Player.prototype.hold=function(){
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
  
  $(".buttons1").hide();
  $(".buttons2").hide();

  var player1;
  var player2;

  $('.new').click(function () {
    location.reload();
  });

  $("#form-names").submit(function(event){
    event.preventDefault();

    var player1Name = $("#player1-name").val();
    var player2Name = $("#player2-name").val();
      
      if(player1Name === ""){
        player1Name="Player 1";
      }
      if (player2Name === "") {
        player2Name = "Player 2";
      }

    player1 = new Player(player1Name,0,0);
    player2 = new Player(player2Name,0,0);

    $(".name1").text(player1Name);
    $(".name2").text(player2Name);

    $(".game-console").fadeIn("slow");
    $(".buttons1").fadeIn("slow");
    $(".name1").addClass("btn-info");
    $("#form-names").hide();
  });

  //Player1 roll and hold
  $("#roll1").click(function(){
    var rollDice=player1.rollDie();
    var updater = player1.roundUpdater(rollDice);
    var showDie1 = player1.showDie(rollDice);
    
    
    $(".player1-roll-scores").text(" " + updater);
    $(".player1-turn-score").text(" " + player1.continue());
    $(".player1-total-score").text(" " + player1.score);

    if (updater === "You Hit 1"){
      $(".buttons1").hide();
      $(".buttons2").show();
      $(".name2").addClass("btn-info");
      $(".name1").removeClass("btn-info");
    }
    
    var winner=player1.scoreCheck();
  });

  
  $("#hold1").click(function () {
    player1.hold();
    player1.newTurn();
    $(".player1-roll-scores").text(" " + player1.turnScore);
    $(".player1-turn-score").text(0);
    $(".player1-total-score").text(" " + player1.score);

    var winner = player1.scoreCheck();

    if (winner === "You Won"){
      alert("Congratulations "+player1.name+ "!");
      location.reload();
    }
     else {
      
      $(".buttons1").hide();
      $(".buttons2").show();
      $(".name2").addClass("btn-info");
      $(".name1").removeClass("btn-info");
    }
  });

  //Player2 roll and hold
  $("#roll2").click(function () {
    var rollDice = player2.rollDie();
    var updater = player2.roundUpdater(rollDice);
    var showDie2 = player2.showDie(rollDice);

    
    $(".player2-roll-scores").text(" " + updater);
    $(".player2-turn-score").text(" " + player2.continue());
    $(".player2-total-score").text(" " + player2.score);

    if (updater === "You Hit 1") {
      $(".buttons2").hide();
      $(".buttons1").show();
      $(".name1").addClass("btn-info");
      $(".name2").removeClass("btn-info");
    }

    var winner = player2.scoreCheck();
  });
  $("#hold2").click(function () {
    player2.hold();
    player2.newTurn();
    $(".player2-roll-scores").text(" " + player2.turnScore);
    $(".player2-turn-score").text(0);
    $(".player2-total-score").text(" " + player2.score);

    var winner = player2.scoreCheck();

    if (winner === "You Won") {
      alert("Congratulations " + player2.name + "!");
      location.reload();
    }
    else {
      $(".buttons2").hide();
      $(".buttons1").show();
      $(".name1").addClass("btn-info");
      $(".name2").removeClass("btn-info");
    }
  });

});