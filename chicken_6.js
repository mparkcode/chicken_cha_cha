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
              "images/snail.png"]

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
              "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png",]

var hiddenPosition = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]

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

Player1 = {
  active: true,
  lives: 2,
  position: 0,
  target: function(){
    if(this.position + 1 === Player2.position && this.position + 1 === 23){
      return 0;
    } else if (this.position + 1 === Player2.position){
      return this.position + 2;
    } else if (this.position === 23 && Player2.position === 0){
        return 1;
    } else if (this.position === 23){
        return 0;
    } else {
      return this.position + 1;
    }
  },
  currentPosition: function(){
    return document.getElementById('square-' + this.position);
  },
  targetPosition: function(){
    return document.getElementById('square-' + this.target());
  }
}

Player2 = {
  active: false,
  lives: 2,
  position: 12,
  target: function(){
    if(this.position + 1 === Player1.position && this.position + 1 === 23){
      return 0;
    } else if (this.position + 1 === Player1.position){
      return this.position + 2;
    } else if (this.position === 23 && Player1.position === 0){
        return 1;
    } else if (this.position === 23){
        return 0;
    } else {
      return this.position + 1;
    }
  },
  currentPosition: function(){
    return document.getElementById('square-' + this.position);
  },
  targetPosition: function(){
    return document.getElementById('square-' + this.target());
  }
}

var currentPlayer = Player1;
var nonCurrentPlayer = Player2;

currentPlayer.currentPosition().classList.remove('player1');
currentPlayer.currentPosition().classList.add('player1-active');
currentPlayer.targetPosition().classList.add('player1-target')


for (var i = 0; i < hiddenPics.length; i++) {
  if(hiddenPics[i].classList.contains('cover')){
    hiddenPics[i].addEventListener('click', function(){
      this.classList.remove('cover');
      this.firstChild.classList.remove('hidden');
      if(this.firstChild.src === currentPlayer.targetPosition().firstChild.src){

        //Removes the player color on current game piece
        if(currentPlayer === Player1){
          currentPlayer.currentPosition().classList.remove('player1-active');
          currentPlayer.targetPosition().classList.remove('player1-target');
        } else if(currentPlayer === Player2){
          currentPlayer.currentPosition().classList.remove('player2-active');
          currentPlayer.targetPosition().classList.remove('player2-target');
        }

        //reduces nonCurrentPlayer lives by 1 if jumped over
        if(currentPlayer.target() === 0 && currentPlayer.position === 22){
          nonCurrentPlayer.lives -=1;
        } else if (currentPlayer.target() === 1 && currentPlayer.position === 23){
          nonCurrentPlayer.lives -=1;
        } else if (currentPlayer.target() === currentPlayer.position + 2){
          nonCurrentPlayer.lives -=1;
        }

        

        //changes the current position for next move
        currentPlayer.position = currentPlayer.target();

         //adds the player color to the current position
        if(currentPlayer === Player1){
          currentPlayer.currentPosition().classList.add('player1-active');
          currentPlayer.targetPosition().classList.add('player1-target');
        } else if(currentPlayer === Player2){
          currentPlayer.currentPosition().classList.add('player2-active');
          currentPlayer.targetPosition().classList.add('player2-target');
        }



        // console.log(currentPlayer.currentPosition());
        // console.log(currentPlayer.targetPosition());
        // console.log(currentPlayer.target());
       }else if (this.firstChild.src !== currentPlayer.targetPosition().firstChild.src){

        //changes the current player in case of incorrect guess
        if (currentPlayer === Player1){
          currentPlayer = Player2;
          currentPlayer.currentPosition().classList.remove('player2');
          currentPlayer.currentPosition().classList.add('player2-active');
          currentPlayer.targetPosition().classList.add('player2-target');
          nonCurrentPlayer = Player1;
          nonCurrentPlayer.currentPosition().classList.remove('player1-active');
          nonCurrentPlayer.currentPosition().classList.add('player1');
          nonCurrentPlayer.targetPosition().classList.remove('player1-target');
        } else {
          currentPlayer = Player1;
          currentPlayer.currentPosition().classList.remove('player1');
          currentPlayer.currentPosition().classList.add('player1-active');
          currentPlayer.targetPosition().classList.add('player1-target');
          nonCurrentPlayer = Player2;
          nonCurrentPlayer.currentPosition().classList.remove('player2-active');
          nonCurrentPlayer.currentPosition().classList.add('player2');
          nonCurrentPlayer.targetPosition().classList.remove('player2-target');
        }      
    }
    this.addEventListener('mousemove', function(){
      this.classList.add('cover');
      this.firstChild.classList.add('hidden');
    })
  })
}
}


