var images = ["fried_egg.png",
              "baby_parrot.png",
              "caterpillar.png",
              "cute_flowers.png",
              "cute_worm.png",
              "easter_bunny.png",
              "egg_cup.png",
              "egg_nest.png",
              "feather.png",
              "hedgehog.png",
              "newborn_chicken.png",
              "snail.png"]

var images2 = ["fried_egg.png",
              "baby_parrot.png",
              "caterpillar.png",
              "cute_flowers.png",
              "cute_worm.png",
              "easter_bunny.png",
              "egg_cup.png",
              "egg_nest.png",
              "feather.png",
              "hedgehog.png",
              "newborn_chicken.png",
              "snail.png",
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
    return this.position + 1;
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
    return this.position + 1;
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
// var position = 0;
// var target = position + 1;
// var currentPosition = document.getElementById('square-' + position);
// var targetPosition = document.getElementById('square-' + target);



for (var i = 0; i < hiddenPics.length; i++) {
  if(hiddenPics[i].classList.contains('cover')){
    hiddenPics[i].addEventListener('click', function(){
      this.classList.remove('cover');
      this.firstChild.classList.remove('hidden');
      if(this.firstChild.src === currentPlayer.targetPosition().firstChild.src){

        //Removes the player color on current game piece
        if(currentPlayer === Player1){
          currentPlayer.currentPosition().classList.remove('player1');
        } else if(currentPlayer === Player2){
          currentPlayer.currentPosition().classList.remove('player2');
        }









        //changes the current position for next move
        if(currentPlayer.position !== currentPlayer.target() - 2){
          if(currentPlayer.position === 23){
            currentPlayer.position = 0
          } else {
            currentPlayer.position += 1;
          }
          currentPlayer.currentPosition = function(){
            return document.getElementById('square-' + this.position);
          }
        } else if(currentPlayer.position === 22 && currentPlayer.target() === 0){
          currentPlayer.position = 0;
          currentPlayer.currentPosition = function(){
            return document.getElementById('square-' + this.position);
          }
        } else {
                  if (currentPlayer.position === 23){
                    currentPlayer.position = 1;
                  } else {
                    currentPlayer.position += 2;
                  }
                  currentPlayer.currentPosition = function(){
                    return document.getElementById('square-' + this.position);
                  }
                }








        //adds the player color to the current position
        if(currentPlayer === Player1){
          currentPlayer.currentPosition().classList.add('player1');
        } else if(currentPlayer === Player2){
          currentPlayer.currentPosition().classList.add('player2');
        }

        //if you encounter another player
        // if(currentPlayer.targetPosition() === nonCurrentPlayer.currentPosition()){
        //   currentPlayer.target = function(){
        //     return this.position + 2;
        //   }
        //   currentPlayer.targetPosition = function(){
        //     return document.getElementById('square-' + this.target());
        //   }
        // }
        //
        // if (currentPlayer.position === currentPlayer.target() - 2){
        //   currentPlayer.position += 2;
        // }
        // currentPlayer.currentPosition = function(){
        //   return document.getElementById('square-' + this.position);
        // }
        //changes the target for next move
        // if(currentPlayer.targetPosition() !== nonCurrentPlayer.currentPosition()){
        //   if(currentPlayer.target() === 24){
        //     currentPlayer.target = function(){
        //       return 0;
        //     };
        //   } else {
        //     currentPlayer.target = function(){
        //       return this.position + 1;
        //     };
        //   }
        //
        //   currentPlayer.targetPosition = function(){
        //     return document.getElementById('square-' + this.target());
        //   }
        // } else {
        //   currentPlayer.target = function(){
        //     return this.position + 2;
        //   }
        //
        //   currentPlayer.targetPosition = function(){
        //     return document.getElementById('square-' + this.target());
        //   }
        // }
        if(currentPlayer.targetPosition() !== nonCurrentPlayer.currentPosition()){
          if(currentPlayer.target() === 24){
            currentPlayer.target = function(){
              return 0;
            };
          } else {
            currentPlayer.target = function(){
              return this.position + 1;
            };
          }

          currentPlayer.targetPosition = function(){
            return document.getElementById('square-' + this.target());
          }
        } else {
          if(currentPlayer.position === 22 && nonCurrentPlayer.position === 23){
            currentPlayer.target = function(){
              return 0;
            }
          } else {
            currentPlayer.target = function(){
              return this.position + 2;
          }
        }

          currentPlayer.targetPosition = function(){
            return document.getElementById('square-' + this.target());
          }
        }


        console.log(currentPlayer.currentPosition());
        console.log(currentPlayer.targetPosition());
        console.log(currentPlayer.target());
      } else if (this.firstChild.src !== currentPlayer.targetPosition().firstChild.src){

        //changes the current player in case of incorrect guess
        if (currentPlayer === Player1){
          currentPlayer = Player2;
          nonCurrentPlayer = Player1;
        } else {
          currentPlayer = Player1;
          nonCurrentPlayer = Player2;
        }
        if(currentPlayer.targetPosition() !== nonCurrentPlayer.currentPosition()){
          if(currentPlayer.target() === 24){
            currentPlayer.target = function(){
              return 0;
            };
          } else {
            currentPlayer.target = function(){
              return this.position + 1;
            };
          }

          currentPlayer.targetPosition = function(){
            return document.getElementById('square-' + this.target());
          }
        } else {
          if(currentPlayer.target()===24){
            currentPlayer.target = function(){
              return 0;
            }
          } else {
            currentPlayer.target = function(){
              return this.position + 2;
          }
        }

          currentPlayer.targetPosition = function(){
            return document.getElementById('square-' + this.target());
          }
        }
      }
    })
    hiddenPics[i].addEventListener('mousemove', function(){
      this.classList.add('cover');
      this.firstChild.classList.add('hidden');
    })
  }
}
