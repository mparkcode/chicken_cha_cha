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










var position = 0;
var target = position + 1;
var currentPosition = document.getElementById('square-' + position);
var targetPosition = document.getElementById('square-' + target);



for (var i = 0; i < hiddenPics.length; i++) {
  if(hiddenPics[i].classList.contains('cover')){
    hiddenPics[i].addEventListener('click', function(){
      this.classList.remove('cover');
      this.firstChild.classList.remove('hidden');
      if(this.firstChild.src === targetPosition.firstChild.src){
        currentPosition.classList.remove('player1')

        if(target === 23){
          target = 0;
        } else {
          target += 1;
        }
        targetPosition = document.getElementById('square-' + target);

        if(position === 23){
          position = 0
        } else {
          position += 1;
        }
        currentPosition = document.getElementById('square-' + position);
        currentPosition.classList.add('player1');
      }
    })
    hiddenPics[i].addEventListener('mouseout', function(){
      this.classList.add('cover');
      this.firstChild.classList.add('hidden');
    })
  }
}
