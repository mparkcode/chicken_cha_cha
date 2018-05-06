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
var displayCards = document.querySelectorAll(".displayCards");


Player1 = {
  active: true,
  lives: 2,
  position: 0,
  target: 1,
  // target: function(){
  //   if(this.position === 20 && document.getElementById('square-21').classList.contains("occupied") && document.getElementById('square-22').classList.contains("occupied") && document.getElementById('square-23').classList.contains("occupied")){
  //     return 0;
  //   } else if(this.position === 21 && document.getElementById('square-22').classList.contains("occupied") && document.getElementById('square-23').classList.contains("occupied") && document.getElementById('square-0').classList.contains("occupied")){
  //     return 1;
  //   } else if(this.position === 22 && document.getElementById('square-23').classList.contains("occupied") && document.getElementById('square-0').classList.contains("occupied") && document.getElementById('square-1').classList.contains("occupied")){
  //     return 2;
  //   } else if(this.position === 23 && document.getElementById('square-0').classList.contains("occupied") && document.getElementById('square-1').classList.contains("occupied") && document.getElementById('square-2').classList.contains("occupied")){
  //     return 3;
  //   } else if(document.getElementById('square-'+(this.position+1)).classList.contains("occupied") && document.getElementById('square-'+(this.position+2)).classList.contains("occupied") && document.getElementById('square-'+(this.position+3)).classList.contains("occupied")){
  //     return this.position + 4;
  //   } else if(this.position === 21 && document.getElementById('square-22').classList.contains("occupied") && document.getElementById('square-23').classList.contains("occupied")){
  //     return 0;
  //   } else if(this.position === 22 && document.getElementById('square-23').classList.contains("occupied") && document.getElementById('square-0').classList.contains("occupied")){
  //     return 1;
  //   } else if(this.position === 23 && document.getElementById('square-0').classList.contains("occupied") && document.getElementById('square-1').classList.contains("occupied")){
  //     return 2;
  //   } else if(document.getElementById('square-'+(this.position+1)).classList.contains("occupied") && document.getElementById('square-'+(this.position+2)).classList.contains("occupied")){
  //     return this.position + 3;
  //   } else if(this.position === 22 && document.getElementById('square-'+(this.position+1)).classList.contains("occupied")){
  //     return 0;
  //   } else if(this.position === 23 && document.getElementById('square-0').classList.contains("occupied")){
  //     return 1;
  //   } else if(document.getElementById('square-'+(this.position+1)).classList.contains("occupied")){
  //     return this.position + 2;
  //   } else if(this.position === 23){
  //     return 0;
  //   } else {
  //     return this.position + 1;
  //   }
  // },
  currentPosition: function(){
    return document.getElementById('square-' + this.position);
  },
  targetPosition: function(){
    return document.getElementById('square-' + this.target);
  },
};


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
currentPlayer.targetPosition().classList.add('player1-target');

currentPlayer.currentPosition().classList.add('occupied');
currentPlayer.currentPosition().classList.add('current-player');
// nonCurrentPlayer.currentPosition().classList.add('occupied');


for (var i = 0; i < hiddenPics.length; i++){
  if(hiddenPics[i].classList.contains('cover')){
    hiddenPics[i].addEventListener('click', function(){
      let piece = this;
      setTimeout(function(){
        piece.classList.add('cover');
        piece.firstChild.classList.add('hidden');
      },1000);
    })
  }
}

for (var i = 0; i < hiddenPics.length; i++) {
  if(hiddenPics[i].classList.contains('cover')){
    hiddenPics[i].addEventListener('click', function(){
      this.classList.remove('cover');
      this.firstChild.classList.remove('hidden');
      
      if(this.firstChild.src === currentPlayer.targetPosition().firstChild.src){

        //Removes the player color & current-player class on current game piece
        if(currentPlayer === Player1){
          currentPlayer.currentPosition().classList.remove('player1-active');
          currentPlayer.currentPosition().classList.remove('current-player');
          currentPlayer.targetPosition().classList.remove('player1-target');
        } else if(currentPlayer === Player2){
          currentPlayer.currentPosition().classList.remove('player2-active');
          currentPlayer.targetPosition().classList.remove('player2-target');
        }

        //reduces nonCurrentPlayer lives by 1 if jumped over
        if(currentPlayer.target === 0 && currentPlayer.position === 22){
          nonCurrentPlayer.lives -=1;
        } else if (currentPlayer.target === 1 && currentPlayer.position === 23){
          nonCurrentPlayer.lives -=1;
        } else if (currentPlayer.target === currentPlayer.position + 2){
          nonCurrentPlayer.lives -=1;
        }

        //changes the current position for next move
        currentPlayer.position = currentPlayer.target;
        
        //adds the player color & current-player class to the current position
        if(currentPlayer === Player1){
          currentPlayer.currentPosition().classList.add('player1-active');
          currentPlayer.currentPosition().classList.add('current-player');
        } else if(currentPlayer === Player2){
          currentPlayer.currentPosition().classList.add('player2-active');
          currentPlayer.targetPosition().classList.add('player2-target');
        }
        
        //changes the target position
          if(currentPlayer.position === 20 && document.getElementById("square-21").classList.contains("non-current-player") && document.getElementById("square-22").classList.contains("non-current-player") && document.getElementById("square-23").classList.contains("non-current-player")){
            currentPlayer.target = 0;
          } else if(currentPlayer.position === 21 && document.getElementById("square-22").classList.contains("non-current-player") && document.getElementById("square-23").classList.contains("non-current-player") && document.getElementById("square-0").classList.contains("non-current-player")){
            currentPlayer.target = 1;
          } else if(currentPlayer.position === 21 && document.getElementById("square-22").classList.contains("non-current-player") && document.getElementById("square-23").classList.contains("non-current-player")){
            currentPlayer.target = 0;
          } else if(currentPlayer.position === 22 && document.getElementById("square-23").classList.contains("non-current-player") && document.getElementById("square-0").classList.contains("non-current-player") && document.getElementById("square-1").classList.contains("non-current-player")){
            currentPlayer.target = 2;
          } else if(currentPlayer.position === 22 && document.getElementById("square-23").classList.contains("non-current-player") && document.getElementById("square-0").classList.contains("non-current-player")){
            currentPlayer.target = 1;
          } else if(currentPlayer.position === 22 && document.getElementById("square-23").classList.contains("non-current-player")){
            currentPlayer.target = 0;
          } else if(currentPlayer.position === 23 && document.getElementById("square-0").classList.contains("non-current-player") && document.getElementById("square-1").classList.contains("non-current-player") && document.getElementById("square-2").classList.contains("non-current-player")){
            currentPlayer.target = 3;
          } else if(currentPlayer.position === 23 && document.getElementById("square-0").classList.contains("non-current-player") && document.getElementById("square-1").classList.contains("non-current-player")){
            currentPlayer.target = 2;
          } else if(currentPlayer.position === 23 && document.getElementById("square-0").classList.contains("non-current-player")){
            currentPlayer.target = 1;
          } else if(!(currentPlayer.position === 23) && document.getElementById("square-" + (currentPlayer.position + 1)).classList.contains("non-current-player") && document.getElementById("square-" + (currentPlayer.position + 2)).classList.contains("non-current-player") && document.getElementById("square-" + (currentPlayer.position + 3)).classList.contains("non-current-player")){
            currentPlayer.target += 4;
          } else if (!(currentPlayer.position === 23) && document.getElementById("square-" + (currentPlayer.position + 1)).classList.contains("non-current-player") && document.getElementById("square-" + (currentPlayer.position + 2)).classList.contains("non-current-player")){
            currentPlayer.target += 3;
          } else if (!(currentPlayer.position === 23) && document.getElementById("square-" + (currentPlayer.position + 1)).classList.contains("non-current-player")){
            currentPlayer.target += 2;
          } else if(currentPlayer.position === 23){
            currentPlayer.target = 0;
          } else {
            currentPlayer.target += 1;
          }
        
        
        console.log(currentPlayer.targetPosition());
        
        
        //adds colors to the target
        if(currentPlayer === Player1){
          currentPlayer.targetPosition().classList.add('player1-target');
        } else if(currentPlayer === Player2){
          currentPlayer.currentPosition().classList.add('player2-active');
          currentPlayer.targetPosition().classList.add('player2-target');
        }
          
          
         
        
        // handles the occupied class
        for(var i = 0; i<displayCards.length; i++){
          if(displayCards[i].classList.contains("player1-active") || displayCards[i].classList.contains("player1") || displayCards[i].classList.contains("player2-active") || displayCards[i].classList.contains("player2")){
            displayCards[i].classList.add("occupied");
          } else {
            displayCards[i].classList.remove("occupied");
          }
        }


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
  })
}
}




// var positionPlusOne;
//         var positionPlusTwo;
//         var positionPlusThree;
        
//         if(currentPlayer.position === 23){
//           positionPlusOne = document.getElementById("square-0");
//         } else{
//           positionPlusOne = document.getElementById("square-" + (currentPlayer.position + 1));
//         }
        
//         if(currentPlayer.position === 22){
//           positionPlusTwo = document.getElementById("square-0");
//         } else if(currentPlayer.position === 23){
//           positionPlusTwo = document.getElementById("square-1");
//         } else {
//           positionPlusTwo = document.getElementById("square-" + (currentPlayer.position + 2));
//         }
        
//         if(currentPlayer.position === 21){
//           positionPlusThree = document.getElementById("square-0");
//         } else if(currentPlayer.position === 22){
//           positionPlusThree = document.getElementById("square-1");
//         } else if(currentPlayer.position === 23){
//           positionPlusThree = document.getElementById("square-2");
//         } else {
//           positionPlusThree = document.getElementById("square-" + (currentPlayer.position + 3));
//         }
        
        
        
//         if(!(positionPlusOne.classList.contains("occupied")) && !(positionPlusTwo.classList.contains("occupied")) && !(positionPlusThree.classList.contains("occupied"))){
//             currentPlayer.target =  currentPlayer.position + 1;
//           } else if(currentPlayer.position === 20 && positionPlusOne.classList.contains("occupied") && positionPlusTwo.classList.contains("occupied") && positionPlusThree.classList.contains("occupied")){
//             currentPlayer.target = 0;
//           } else if(currentPlayer.position === 21 && positionPlusOne.classList.contains("occupied") && positionPlusTwo.classList.contains("occupied") && positionPlusThree.classList.contains("occupied")){
//             currentPlayer.target = 1;
//           } else if(currentPlayer.position === 22 && positionPlusOne.classList.contains("occupied") && positionPlusTwo.classList.contains("occupied") && positionPlusThree.classList.contains("occupied")){
//             currentPlayer.target = 2;
//           } else if(currentPlayer.position === 23 && positionPlusOne.classList.contains("occupied") && positionPlusTwo.classList.contains("occupied") && positionPlusThree.classList.contains("occupied")){
//             currentPlayer.target = 3;
//           } else if(positionPlusOne.classList.contains("occupied") && positionPlusTwo.classList.contains("occupied") && positionPlusThree.classList.contains("occupied")){
//             currentPlayer.target = currentPlayer.position + 4;
//           } else if(currentPlayer.position === 21 && positionPlusOne.classList.contains("occupied") && positionPlusThree.classList.contains("occupied") && !(positionPlusThree.classList.contains("occupied"))){
//             currentPlayer.target = 0;
//           } else if(currentPlayer.position === 22 && positionPlusOne.classList.contains("occupied") && positionPlusThree.classList.contains("occupied") && !(positionPlusThree.classList.contains("occupied"))){
//             currentPlayer.target = 1;
//           } else if(currentPlayer.position === 23 && positionPlusOne.classList.contains("occupied") && positionPlusThree.classList.contains("occupied") && !(positionPlusThree.classList.contains("occupied"))){
//             currentPlayer.target = 2;
//           } else if(positionPlusOne.classList.contains("occupied") && positionPlusTwo.classList.contains("occupied") && !(positionPlusThree.classList.contains("occupied"))){
//             currentPlayer.target = currentPlayer.position + 3;
//           } else if(currentPlayer.position === 22 && positionPlusOne.classList.contains("occupied") && !(positionPlusTwo.classList.contains("occupied"))  && !(positionPlusThree.classList.contains("occupied"))){
//             currentPlayer.target = 0;
//           } else if(currentPlayer.position === 23 && positionPlusOne.classList.contains("occupied") && !(positionPlusTwo.classList.contains("occupied"))  && !(positionPlusThree.classList.contains("occupied"))){
//             currentPlayer.target = 1;
//           } else if(positionPlusOne.classList.contains("occupied") && !(positionPlusTwo.classList.contains("occupied")) && !(positionPlusThree.classList.contains("occupied"))){
//             currentPlayer.target = currentPlayer.position + 2;
//           } else if(currentPlayer.position === 23 && !(positionPlusOne.classList.contains("occupied")) && !(positionPlusTwo.classList.contains("occupied")) && !(positionPlusThree.classList.contains("occupied"))){
//             currentPlayer.target =  0;
//           } 
          
//           console.log(currentPlayer.targetPosition());