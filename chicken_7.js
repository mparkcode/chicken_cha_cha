var images = ["images/fried_egg.png",
              "images/baby_parrot.png",
              "images/caterpillar.png",
              "images/cute_flowers.png",
              "images/cute_worm.png",
              "images/easter_bunny.png",
              "images/egg_cup.png",
              "images/egg_nest.png",
              "images/feather.png",
              "images/hedgehog.png",
              "images/newborn_chicken.png",
              "images/snail.png"];

var images2 = ["images/fried_egg.png",
              "images/baby_parrot.png",
              "images/caterpillar.png",
              "images/cute_flowers.png",
              "images/cute_worm.png",
              "images/easter_bunny.png",
              "images/egg_cup.png",
              "images/egg_nest.png",
              "images/feather.png",
              "images/hedgehog.png",
              "images/newborn_chicken.png",
              "images/snail.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",];

var hiddenPosition = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

var shuffledImages = shuffle(images);
var randomPosition = shuffle(hiddenPosition);

for (var i = 0; i < images.length; i++) {
  document.getElementById('img-'+i).src = shuffledImages[i];
  document.getElementById('img-'+(i+12)).src = shuffledImages[i];
}

for (var i = 0; i < randomPosition.length; i++) {
  document.getElementById('hidden-img-'+randomPosition[i]).src = images2[i];
}


for (var i = 0; i < 24; i++) {
  if(document.getElementById('hidden-img-'+i).src !== "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png"){
    document.getElementById('hidden-img-'+i).classList.add('hidden');
    document.getElementById('hidden-img-'+i).parentElement.classList.add('cover');
  }
}

var hiddenPics = document.querySelectorAll('.hiddenCards');
var displayCards = document.querySelectorAll(".displayCards");

//Player object constructor and creating players
function Player(active, lives, position, target){
  this.active = active;
  this.lives = lives;
  this.position = position;
  this.target = target;
  this.currentPosition = function(){
    return document.getElementById('square-' + this.position);
  };
  this.targetPosition = function(){
    return document.getElementById('square-' + this.target);
  };
}

var Player1 = new Player(true, 1, 0, 1);
var Player2 = new Player(false, 1, 12, 13);
var Player3 = new Player(false, 1, 15, 16);
var Player4 = new Player(false, 1, 17, 18);


//Asks for how many players and creates starting positions and array of non current players
var playerNumPrompt = prompt("Please enter number of players");
var numPlayers = parseInt(playerNumPrompt);
var nonCurrentPlayers = [Player1];


if(numPlayers === 2){
  Player2.active = true;
  nonCurrentPlayers.push(Player2);
} else if(numPlayers === 3){
  Player2.active = true;
  Player3.active = true;
  Player2.position = 7;
  Player2.target = 8;
  nonCurrentPlayers.push(Player2, Player3);
} else if(numPlayers === 4){
  Player2.active = true;
  Player3.active = true;
  Player4.active = true;
  Player2.position = 5;
  Player2.target = 6;
  Player3.position = 12;
  Player3.target = 13;
  nonCurrentPlayers.push(Player2, Player3, Player4);
}

var currentPlayer = nonCurrentPlayers.shift();

function addActiveClasses(num){
  currentPlayer.currentPosition().classList.remove('player' + num);
  currentPlayer.currentPosition().classList.add('player'+num+'-active');
  currentPlayer.targetPosition().classList.add('player'+num+'-target');
}

function setPlayerDetails(player, num){
  if(player.active){
    player.currentPosition().classList.add("player"+num);
    var playerName = prompt("Player "+num+", enter your name!");
    if (playerName == ""){
      document.getElementById("player"+num+"-name").textContent = "Player "+num;
    } else {
      document.getElementById("player"+num+"-name").textContent = playerName;
    }
    document.getElementById("p"+num+"lives").textContent = player.lives;
  } else {
    document.getElementById("p"+num+"-life-count").style.display = "none";
  }  
}

setPlayerDetails(Player1,1);
setPlayerDetails(Player2,2);
setPlayerDetails(Player3,3);
setPlayerDetails(Player4,4);
currentPlayer.currentPosition().classList.add('current-player');
addActiveClasses(1);

for(var i in nonCurrentPlayers){
  nonCurrentPlayers[i].currentPosition().classList.add("non-current-player");
}


// changes the target position
        function checkPosition(num){
          var result = currentPlayer.position + num;
          if(result>23){
            result = (currentPlayer.position+num)%23-1;
          }
          return result;
        }
        function endOfArray(num){
          if(currentPlayer.position+num == 23){
            return 23;
          } else if(currentPlayer.position+num == 24){
            return 0;
          } else if(currentPlayer.position+num > 24){
            return (currentPlayer.position+num)%23-1;
          } else {
            return (currentPlayer.position+num);
          }
        }
        function getTarget(){
          if(document.getElementById("square-" + checkPosition(1)).classList.contains("non-current-player") && document.getElementById("square-" + checkPosition(2)).classList.contains("non-current-player") && document.getElementById("square-" + checkPosition(3)).classList.contains("non-current-player")){
            currentPlayer.target = endOfArray(4);
          } else if (document.getElementById("square-" + checkPosition(1)).classList.contains("non-current-player") && document.getElementById("square-" + checkPosition(2)).classList.contains("non-current-player")){
           currentPlayer.target = endOfArray(3);
          } else if (document.getElementById("square-" + checkPosition(1)).classList.contains("non-current-player")){
            currentPlayer.target = endOfArray(2);
          } else {
            currentPlayer.target = endOfArray(1);
          }
        }


for (var i = 0; i < hiddenPics.length; i++) {
  if(hiddenPics[i].classList.contains('cover')){
    hiddenPics[i].addEventListener('click', function(){
      let piece = this;
      this.classList.remove('cover');
      this.firstChild.classList.remove('hidden');
      setTimeout(function(){
        piece.classList.add('cover');
        piece.firstChild.classList.add('hidden');
      },1000);
      
      if(this.firstChild.src === currentPlayer.targetPosition().firstChild.src){

        //Removes the player color & current-player class on current game piece
        function removeClasses(num){
          currentPlayer.currentPosition().classList.remove('player'+num+'-active');
          currentPlayer.currentPosition().classList.remove('current-player');
          currentPlayer.targetPosition().classList.remove('player'+num+'-target');
        }
        
        if(currentPlayer === Player1){
          removeClasses(1);
        } else if(currentPlayer === Player2){
          removeClasses(2);
        } else if(currentPlayer === Player3){
          removeClasses(3);
        } else if(currentPlayer === Player4){
          removeClasses(4);
        }

        //take all  players lives if jumped over
        function livesToTake(){
          var a;
          var b;
          var endOfArray = [20,21,22,23,0,1,2,3];
          if(endOfArray.indexOf(currentPlayer.position) != -1 && endOfArray.indexOf(currentPlayer.target) != -1){
              var a = endOfArray.indexOf(currentPlayer.position);
              var b = endOfArray.indexOf(currentPlayer.target);
            }
          for(var i in nonCurrentPlayers){
            if(endOfArray.indexOf(nonCurrentPlayers[i].position) > a && endOfArray.indexOf(nonCurrentPlayers[i].position) < b){
              currentPlayer.lives += nonCurrentPlayers[i].lives;
              nonCurrentPlayers[i].lives = 0;
            }
            if(nonCurrentPlayers[i].position>currentPlayer.position && nonCurrentPlayers[i].position<currentPlayer.target){
              currentPlayer.lives += nonCurrentPlayers[i].lives;
              nonCurrentPlayers[i].lives = 0;
            }
          }
        }
          
        livesToTake();
        
        document.getElementById("p1lives").textContent = Player1.lives;
        document.getElementById("p2lives").textContent = Player2.lives;
        document.getElementById("p3lives").textContent = Player3.lives;
        document.getElementById("p4lives").textContent = Player4.lives;

        //checks for winner
        if(currentPlayer.lives == nonCurrentPlayers.length+1){
          alert("Winner!");
          nonCurrentPlayers.push(currentPlayer);
          for(var i in nonCurrentPlayers){
            nonCurrentPlayers[i].currentPosition().classList = "";
            nonCurrentPlayers[i].targetPosition().classList = "";
          }
          currentPlayer = "";
          nonCurrentPlayers = [];
          document.getElementById("life-count").style.display = "none";
        }

        //changes the current position for next move
        currentPlayer.position = currentPlayer.target;
        
        //adds the player color & current-player class to the current position
        function addActiveColorAndCurrentClass(player, num){
          if(currentPlayer === player){
            currentPlayer.currentPosition().classList.add('player'+num+'-active');
            currentPlayer.currentPosition().classList.add('current-player');
          }
        }
        addActiveColorAndCurrentClass(Player1,1);
        addActiveColorAndCurrentClass(Player2,2);
        addActiveColorAndCurrentClass(Player3,3);
        addActiveColorAndCurrentClass(Player4,4);
        
        getTarget();

          //adds colors to the target
          if(currentPlayer === Player1){
            currentPlayer.targetPosition().classList.add('player1-target');
          } else if(currentPlayer === Player2){
            currentPlayer.targetPosition().classList.add('player2-target');
          } else if(currentPlayer === Player3){
            currentPlayer.targetPosition().classList.add('player3-target');
          } else if(currentPlayer === Player4){
            currentPlayer.targetPosition().classList.add('player4-target');
          }


       }else if (this.firstChild.src !== currentPlayer.targetPosition().firstChild.src){

        //changes the current player in case of incorrect guess
        
        //Removes active colors and classes and adds non active colors and classes
        currentPlayer.currentPosition().classList.remove("current-player");
        currentPlayer.currentPosition().classList.add("non-current-player");
        function removeActiveClasses(player,num){
          if(currentPlayer == player){
            currentPlayer.currentPosition().classList.remove("player"+num+"-active");
            currentPlayer.targetPosition().classList.remove("player"+num+"-target");
            currentPlayer.currentPosition().classList.add("player"+num);
          }
        }
        removeActiveClasses(Player1,1);
        removeActiveClasses(Player2,2);
        removeActiveClasses(Player3,3);
        removeActiveClasses(Player4,4);
        // if(currentPlayer == Player1){
        //   currentPlayer.currentPosition().classList.remove("player1-active");
        //   currentPlayer.targetPosition().classList.remove("player1-target");
        //   currentPlayer.currentPosition().classList.add("player1");
        // } else if(currentPlayer == Player2){
        //   currentPlayer.currentPosition().classList.remove("player2-active");
        //   currentPlayer.targetPosition().classList.remove("player2-target");
        //   currentPlayer.currentPosition().classList.add("player2");
        // } else if(currentPlayer == Player3){
        //   currentPlayer.currentPosition().classList.remove("player3-active");
        //   currentPlayer.targetPosition().classList.remove("player3-target");
        //   currentPlayer.currentPosition().classList.add("player3");
        // } else if(currentPlayer == Player4){
        //   currentPlayer.currentPosition().classList.remove("player4-active");
        //   currentPlayer.targetPosition().classList.remove("player4-target");
        //   currentPlayer.currentPosition().classList.add("player4");
        // }
        
        //Changes the current player
        nonCurrentPlayers.push(currentPlayer);
        currentPlayer = nonCurrentPlayers.shift();
        
        getTarget();
        // if(currentPlayer.position === 20 && document.getElementById("square-21").classList.contains("non-current-player") && document.getElementById("square-22").classList.contains("non-current-player") && document.getElementById("square-23").classList.contains("non-current-player")){
        //   currentPlayer.target = 0;
        // } else if(currentPlayer.position === 21 && document.getElementById("square-22").classList.contains("non-current-player") && document.getElementById("square-23").classList.contains("non-current-player") && document.getElementById("square-0").classList.contains("non-current-player")){
        //   currentPlayer.target = 1;
        // } else if(currentPlayer.position === 21 && document.getElementById("square-22").classList.contains("non-current-player") && document.getElementById("square-23").classList.contains("non-current-player")){
        //   currentPlayer.target = 0;
        // } else if(currentPlayer.position === 22 && document.getElementById("square-23").classList.contains("non-current-player") && document.getElementById("square-0").classList.contains("non-current-player") && document.getElementById("square-1").classList.contains("non-current-player")){
        //   currentPlayer.target = 2;
        // } else if(currentPlayer.position === 22 && document.getElementById("square-23").classList.contains("non-current-player") && document.getElementById("square-0").classList.contains("non-current-player")){
        //   currentPlayer.target = 1;
        // } else if(currentPlayer.position === 22 && document.getElementById("square-23").classList.contains("non-current-player")){
        //   currentPlayer.target = 0;
        // } else if(currentPlayer.position === 23 && document.getElementById("square-0").classList.contains("non-current-player") && document.getElementById("square-1").classList.contains("non-current-player") && document.getElementById("square-2").classList.contains("non-current-player")){
        //   currentPlayer.target = 3;
        // } else if(currentPlayer.position === 23 && document.getElementById("square-0").classList.contains("non-current-player") && document.getElementById("square-1").classList.contains("non-current-player")){
        //   currentPlayer.target = 2;
        // } else if(currentPlayer.position === 23 && document.getElementById("square-0").classList.contains("non-current-player")){
        //   currentPlayer.target = 1;
        // } else if(!(currentPlayer.position === 23) && document.getElementById("square-" + (currentPlayer.position + 1)).classList.contains("non-current-player") && document.getElementById("square-" + (currentPlayer.position + 2)).classList.contains("non-current-player") && document.getElementById("square-" + (currentPlayer.position + 3)).classList.contains("non-current-player")){
        //   currentPlayer.target = currentPlayer.position + 4;
        // } else if (!(currentPlayer.position === 23) && document.getElementById("square-" + (currentPlayer.position + 1)).classList.contains("non-current-player") && document.getElementById("square-" + (currentPlayer.position + 2)).classList.contains("non-current-player")){
        //   currentPlayer.target = currentPlayer.position + 3;
        // } else if (!(currentPlayer.position === 23) && document.getElementById("square-" + (currentPlayer.position + 1)).classList.contains("non-current-player")){
        //   currentPlayer.target = currentPlayer.position + 2;
        // } else if(currentPlayer.position === 23){
        //   currentPlayer.target = 0;
        // } else {
        //   currentPlayer.target = currentPlayer.position + 1;
        // }
        
        //Adds active colors and classes and removes non active colors and classes
        currentPlayer.currentPosition().classList.remove("non-current-player");
        currentPlayer.currentPosition().classList.add("current-player");
        if(currentPlayer == Player1){
          addActiveClasses(1);
        } else if(currentPlayer == Player2){
          addActiveClasses(2);
        } else if(currentPlayer == Player3){
          addActiveClasses(3);
        } else if(currentPlayer == Player4){
          addActiveClasses(4);
        }
      }
    });
  }
}




