//----------------------------Handles music & sound effects, set to play automatically on page load
var backgroundMusic;
var muteBtn;
var no;
var rooster;
var muteFxBtn;

function playMusic() {
    backgroundMusic = new Audio();
    backgroundMusic.src = "audio/bensound-ukulele.mp3";
    backgroundMusic.pause();
    muteBtn = document.getElementById('mute-music');
    muteBtn.addEventListener('click', mute);
    
    function mute() {
        if (backgroundMusic.paused == true) {
            backgroundMusic.play();
            backgroundMusic.loop = true;
            muteBtn.innerHTML = "stop music";
        }
        else {
            backgroundMusic.pause();
            muteBtn.innerHTML = "play music";
        }
    }
}

function playFx() {
    no = new Audio();
    no.src = "audio/no.mp3";
    rooster = new Audio();
    rooster.src = "audio/Rooster-noise.mp3";
    muteFxBtn = document.getElementById('mute-fx');
    muteFxBtn.addEventListener('click', muteFx);

    function muteFx() {
        if (no.muted && rooster.muted) {
            no.muted = false;
            rooster.muted = false;
            muteFxBtn.innerHTML = "mute fx";
        }
        else {
            no.muted = true;
            rooster.muted = true;
            muteFxBtn.innerHTML = "play fx";
        }
    }
}


window.addEventListener('load', playMusic);
window.addEventListener('load', playFx);


//---------------------opens modal to choose number of players on page load
window.onload = openModal;

//---------------------Function to open modal
function openModal() {
    modal.style.display = 'block';
}

//---------------------variables to receive values for game
var numPlayers;
var gameType;
var difficulty;


//---------------------Get the modal element
var modal = document.getElementById('simpleModal');

//---------------------Get the single player game type modal
var singlePlayerModalGameType = document.getElementById('singlePlayerModalGameType');

//---------------------Get the single player difficulty modal
var singlePlayerModalDifficulty = document.getElementById('singlePlayerModalDifficulty');

//---------------------Get player name modal
var getPlayerNameModal = document.getElementById('getPlayerNameModal');

//---------------------Get the single player option
var singlePlayer = document.getElementById('option1');

//---------------------Get Multiplayer options
var twoPlayer = document.getElementById('option2');
var threePlayer = document.getElementById('option3');
var fourPlayer = document.getElementById('option4');

//---------------------Get game type options for single player game
var timeOption = document.getElementById('time');
var clickOption = document.getElementById('click');

//---------------------Get the difficulty option for single player game
var easyOption = document.getElementById('easy');
var mediumOption = document.getElementById('medium');
var difficultOption = document.getElementById('difficult');

//---------------------Listen for single player option
singlePlayer.addEventListener('click', openSinglePlayerModalGameType);

//---------------------Listen for gametype choice
timeOption.addEventListener('click', function() { setGameType("time") });
clickOption.addEventListener('click', function() { setGameType("click") });

//---------------------Listen for difficulty choice
easyOption.addEventListener('click', function() { setDifficulty("easy") });
mediumOption.addEventListener('click', function() { setDifficulty("medium") });
difficultOption.addEventListener('click', function() { setDifficulty("difficult") });

//---------------------Listen for multi player option
twoPlayer.addEventListener('click', function() { openMultiPlayerModal(2) });
threePlayer.addEventListener('click', function() { openMultiPlayerModal(3) });
fourPlayer.addEventListener('click', function() { openMultiPlayerModal(4) });

//---------------------Function to open single player modal
function openSinglePlayerModalGameType() {
    modal.style.display = 'none';
    numPlayers = 1;
    singlePlayerModalGameType.style.display = 'block';
}

//---------------------Function to get game type for single player
function setGameType(type) {
    singlePlayerModalGameType.style.display = 'none';
    gameType = type;
    singlePlayerModalDifficulty.style.display = 'block';
}

//---------------------Function to set difficulty for single player
function setDifficulty(difficultyLevel) {
    singlePlayerModalGameType.style.display = 'none';
    difficulty = difficultyLevel;
    if (difficulty != undefined) {
        singlePlayerModalDifficulty.style.display = 'none';
    }
}

//---------------------Function to set player numbers for multiplayer
function openMultiPlayerModal(num) {
    modal.style.display = 'none';
    numPlayers = num;
    gameType = "";
    difficulty = "";
    // getPlayerNameModal.style.display="block";
}

//---------------------Game piece images
var images = [
    "images/fried_egg.png",
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
    "images/snail.png"
];

var images2 = [
    "images/fried_egg.png",
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
    "images/snail.png"
];


//---------------------Randomizes images around the game board
var hiddenPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
var shuffledImages2 = shuffle(images2);
var randomPosition = shuffle(hiddenPosition);

for (var i = 0; i < images.length; i++) {
    document.getElementById('img-' + i).src = shuffledImages[i];
    document.getElementById('img-' + (i + 12)).src = shuffledImages2[i];
}

for (var i = 0; i < randomPosition.length; i++) {
    document.getElementById('hidden-img-' + randomPosition[i]).src = images2[i];
}


for (var i = 0; i < 12; i++) {
    document.getElementById('hidden-img-' + i).classList.add('hidden1');
    document.getElementById('hidden-img-' + i).parentElement.classList.add('cover');
}

var hiddenPics = document.querySelectorAll('.hiddenCards');


//-------------------------------------------Player object constructor and creating players

function Player(active, lives, position, target) {
    this.active = active;
    this.lives = lives;
    this.position = position;
    this.target = target;
    this.currentPosition = function() {
        return document.getElementById('square-' + this.position);
    };
    this.targetPosition = function() {
        return document.getElementById('square-' + this.target);
    };
}

var Player1 = new Player(false, 1, 0, 1);
var Player2 = new Player(false, 1, 12, 13);
var Player3 = new Player(false, 1, 16, 17);
var Player4 = new Player(false, 1, 18, 19);




//------------------------Asks for how many players and creates starting positions and array of non current players

function checkNumPlayers() {
    if (numPlayers == undefined) {
        window.setTimeout(checkNumPlayers, 100);
    }
    else {
        function checkGameType() {
            if (gameType == undefined) {
                window.setTimeout(checkGameType, 100);
            }
            else {
                function checkDifficulty() {
                    if (difficulty == undefined) {
                        window.setTimeout(checkGameType, 100);
                    }
                    else {

                        var nonCurrentPlayers = [Player1];

                        if (numPlayers === 2) {
                            Player1.active = true;
                            Player2.active = true;
                            nonCurrentPlayers.push(Player2);
                        }
                        else if (numPlayers === 3) {
                            Player1.active = true;
                            Player2.active = true;
                            Player3.active = true;
                            Player2.position = 8;
                            Player2.target = 9;
                            nonCurrentPlayers.push(Player2, Player3);
                        }
                        else if (numPlayers === 4) {
                            Player1.active = true;
                            Player2.active = true;
                            Player3.active = true;
                            Player4.active = true;
                            Player2.position = 6;
                            Player2.target = 7;
                            Player3.position = 12;
                            Player3.target = 13;
                            nonCurrentPlayers.push(Player2, Player3, Player4);
                        }

                        //------------------------Sets player details for active players

                        function setPlayerDetails(player, num) {
                            if (player.active) {
                                player.currentPosition().classList.add("player" + num);
                                var playerName = prompt("Player " + num + ", enter your name!");
                                if (playerName == "") {
                                    document.getElementById("player" + num + "-name").textContent = "Player " + num;
                                    player.name = document.getElementById("player" + num + "-name").textContent;
                                }
                                else {
                                    document.getElementById("player" + num + "-name").textContent = playerName;
                                    player.name = playerName;
                                }
                                document.getElementById("p" + num + "lives").textContent = player.lives;
                            }
                            else {
                                document.getElementById("p" + num + "-life-count").style.display = "none";
                            }
                        }

                        setPlayerDetails(Player1, 1);
                        setPlayerDetails(Player2, 2);
                        setPlayerDetails(Player3, 3);
                        setPlayerDetails(Player4, 4);

                        //-------------------------------------------------Functions for use in the game

                        //Adds active classes to a player if they become currentPlayer
                        function addActiveClasses(num) {
                            currentPlayer.currentPosition().classList.remove('player' + num);
                            currentPlayer.currentPosition().classList.add('player' + num + '-active');
                            currentPlayer.targetPosition().classList.add('player' + num + '-target');
                        }

                        //Removes the player color & current-player class on current game piece
                        function removeClasses(num) {
                            currentPlayer.currentPosition().classList.remove('player' + num + '-active');
                            currentPlayer.currentPosition().classList.remove('current-player');
                            currentPlayer.targetPosition().classList.remove('player' + num + '-target');
                        }

                        // changes the target position
                        function checkPosition(num) {
                            var result = currentPlayer.position + num;
                            if (result > 23) {
                                result = (currentPlayer.position + num) % 23 - 1;
                            }
                            return result;
                        }

                        function endOfArray(num) {
                            if (currentPlayer.position + num == 23) {
                                return 23;
                            }
                            else if (currentPlayer.position + num == 24) {
                                return 0;
                            }
                            else if (currentPlayer.position + num > 24) {
                                return (currentPlayer.position + num) % 23 - 1;
                            }
                            else {
                                return (currentPlayer.position + num);
                            }
                        }

                        function getTarget() {
                            if (document.getElementById("square-" + checkPosition(1)).classList.contains("non-current-player") && document.getElementById("square-" + checkPosition(2)).classList.contains("non-current-player") && document.getElementById("square-" + checkPosition(3)).classList.contains("non-current-player")) {
                                currentPlayer.target = endOfArray(4);
                            }
                            else if (document.getElementById("square-" + checkPosition(1)).classList.contains("non-current-player") && document.getElementById("square-" + checkPosition(2)).classList.contains("non-current-player")) {
                                currentPlayer.target = endOfArray(3);
                            }
                            else if (document.getElementById("square-" + checkPosition(1)).classList.contains("non-current-player")) {
                                currentPlayer.target = endOfArray(2);
                            }
                            else {
                                currentPlayer.target = endOfArray(1);
                            }
                        }

                        //take all  players lives if jumped over
                        function livesToTake() {
                            var a;
                            var b;
                            var endOfArray = [20, 21, 22, 23, 0, 1, 2, 3];
                            if (endOfArray.indexOf(currentPlayer.position) != -1 && endOfArray.indexOf(currentPlayer.target) != -1) {
                                var a = endOfArray.indexOf(currentPlayer.position);
                                var b = endOfArray.indexOf(currentPlayer.target);
                            }
                            for (var i in nonCurrentPlayers) {
                                if (endOfArray.indexOf(nonCurrentPlayers[i].position) > a && endOfArray.indexOf(nonCurrentPlayers[i].position) < b) {
                                    currentPlayer.lives += nonCurrentPlayers[i].lives;
                                    nonCurrentPlayers[i].lives = 0;
                                }
                                if (nonCurrentPlayers[i].position > currentPlayer.position && nonCurrentPlayers[i].position < currentPlayer.target) {
                                    currentPlayer.lives += nonCurrentPlayers[i].lives;
                                    nonCurrentPlayers[i].lives = 0;
                                }
                            }
                        }

                        //checks for winner

                        var MultiPlayerWinModal = document.getElementById("multi-player-win-modal");

                        function openMultiPlayerWinModal() {
                            MultiPlayerWinModal.style.display = 'block';
                            var multiplayNotifyWinner = document.getElementById('multiplayNotifyWinner');
                            multiplayNotifyWinner.textContent = "Congratulations " + currentPlayer.name + ", you are the winner!";
                            var newGameOnWinButton = document.getElementById("new-game-on-win-button");
                            newGameOnWinButton.addEventListener('click', function() { location.reload() });
                            return;
                        }

                        function checkWinner() {
                            if (currentPlayer.lives == nonCurrentPlayers.length + 1) {
                                openMultiPlayerWinModal();
                                nonCurrentPlayers.push(currentPlayer);
                                for (var i in nonCurrentPlayers) {
                                    removeClasses(i);
                                }
                                Player1.currentPosition().classList.remove("player1");
                                Player2.currentPosition().classList.remove("player2");
                                Player3.currentPosition().classList.remove("player3");
                                Player4.currentPosition().classList.remove("player4");
                                currentPlayer = "";
                                nonCurrentPlayers = [];
                                document.getElementById("life-count").style.display = "none";
                            }
                        }

                        //adds the player color & current-player class to the current position
                        function addActiveColorAndCurrentClass(player, num) {
                            if (currentPlayer === player) {
                                currentPlayer.currentPosition().classList.add('player' + num + '-active');
                                currentPlayer.currentPosition().classList.add('current-player');
                            }
                        }

                        //Removes active colors and classes and adds non active colors and classes        
                        function removeActiveClasses(player, num) {
                            if (currentPlayer == player) {
                                currentPlayer.currentPosition().classList.remove("player" + num + "-active");
                                currentPlayer.targetPosition().classList.remove("player" + num + "-target");
                                currentPlayer.currentPosition().classList.add("player" + num);
                            }
                        }

                        //------------------------Sets current-player and non-current-player classes for game start

                        var currentPlayer = nonCurrentPlayers.shift();
                        currentPlayer.currentPosition().classList.add('current-player');
                        addActiveClasses(1);

                        for (var i in nonCurrentPlayers) {
                            nonCurrentPlayers[i].currentPosition().classList.add("non-current-player");
                        }



                        //------------------------------------------------------Multi Player game

                        if (numPlayers > 1) {
                            document.getElementById("currentPlayerDisplay").textContent = currentPlayer.name + "'s turn!";
                            document.getElementById("clicks").style.display = "none";
                            document.getElementById("timer").style.display = "none";
                            for (var i = 0; i < hiddenPics.length; i++) {
                                if (hiddenPics[i].classList.contains('cover')) {
                                    hiddenPics[i].addEventListener('click', function() {
                                        let piece = this;
                                        this.classList.remove('cover');
                                        this.firstChild.classList.remove('hidden1');
                                        setTimeout(function() {
                                            piece.classList.add('cover');
                                            piece.firstChild.classList.add('hidden1');
                                        }, 1000);

                                        //-------------------------If player makes correct choice

                                        if (this.firstChild.src === currentPlayer.targetPosition().firstChild.src) {
                                            rooster.play();
                                            //removes active classes from current players current position
                                            if (currentPlayer === Player1) {
                                                removeClasses(1);
                                            }
                                            else if (currentPlayer === Player2) {
                                                removeClasses(2);
                                            }
                                            else if (currentPlayer === Player3) {
                                                removeClasses(3);
                                            }
                                            else if (currentPlayer === Player4) {
                                                removeClasses(4);
                                            }

                                            //takes lives if jumping over another player
                                            livesToTake();

                                            //updates scores on screen
                                            document.getElementById("p1lives").textContent = Player1.lives;
                                            document.getElementById("p2lives").textContent = Player2.lives;
                                            document.getElementById("p3lives").textContent = Player3.lives;
                                            document.getElementById("p4lives").textContent = Player4.lives;

                                            //Checks for a winner
                                            checkWinner();

                                            //changes the current position for next move
                                            currentPlayer.position = currentPlayer.target;

                                            //Adds active colors to the current players new position  
                                            addActiveColorAndCurrentClass(Player1, 1);
                                            addActiveColorAndCurrentClass(Player2, 2);
                                            addActiveColorAndCurrentClass(Player3, 3);
                                            addActiveColorAndCurrentClass(Player4, 4);

                                            //Gets terget for the next move  
                                            getTarget();

                                            //adds colors to the target
                                            if (currentPlayer === Player1) {
                                                currentPlayer.targetPosition().classList.add('player1-target');
                                            }
                                            else if (currentPlayer === Player2) {
                                                currentPlayer.targetPosition().classList.add('player2-target');
                                            }
                                            else if (currentPlayer === Player3) {
                                                currentPlayer.targetPosition().classList.add('player3-target');
                                            }
                                            else if (currentPlayer === Player4) {
                                                currentPlayer.targetPosition().classList.add('player4-target');
                                            }
                                        }
                                        //-------------------------If player makes incorrect choice

                                        else if (this.firstChild.src !== currentPlayer.targetPosition().firstChild.src) {
                                            no.play();
                                            //changes the current player in case of incorrect guess
                                            currentPlayer.currentPosition().classList.remove("current-player");
                                            currentPlayer.currentPosition().classList.add("non-current-player");

                                            //Removes active classes from the current player  
                                            removeActiveClasses(Player1, 1);
                                            removeActiveClasses(Player2, 2);
                                            removeActiveClasses(Player3, 3);
                                            removeActiveClasses(Player4, 4);

                                            //Changes the current player
                                            nonCurrentPlayers.push(currentPlayer);
                                            currentPlayer = nonCurrentPlayers.shift();

                                            // Changes the display on the game info sheet
                                            document.getElementById("currentPlayerDisplay").textContent = currentPlayer.name + "'s turn!";
                                            if (currentPlayer === Player1) {
                                                document.getElementById("currentPlayerDisplay").style.color = 'red';
                                                document.getElementById("currentPlayerDisplay").style.fontFamily = 'Indie Flower', 'cursive';
                                            }
                                            else if (currentPlayer === Player2) {
                                                document.getElementById("currentPlayerDisplay").style.color = 'blue'
                                                document.getElementById("currentPlayerDisplay").style.fontFamily = 'Gloria Hallelujah', 'cursive';
                                            }
                                            else if (currentPlayer === Player3) {
                                                document.getElementById("currentPlayerDisplay").style.color = 'green';
                                                document.getElementById("currentPlayerDisplay").style.fontFamily = 'Permanent Marker', 'cursive';
                                            }
                                            else if (currentPlayer === Player4) {
                                                document.getElementById("currentPlayerDisplay").style.color = 'purple';
                                                document.getElementById("currentPlayerDisplay").style.fontFamily = 'Gaegu', 'cursive';
                                            }

                                            //Gets Target for new current player  
                                            getTarget();

                                            //Adds active colors and classes and removes non active colors and classes
                                            currentPlayer.currentPosition().classList.remove("non-current-player");
                                            currentPlayer.currentPosition().classList.add("current-player");
                                            if (currentPlayer == Player1) {
                                                addActiveClasses(1);
                                            }
                                            else if (currentPlayer == Player2) {
                                                addActiveClasses(2);
                                            }
                                            else if (currentPlayer == Player3) {
                                                addActiveClasses(3);
                                            }
                                            else if (currentPlayer == Player4) {
                                                addActiveClasses(4);
                                            }
                                        }
                                    });
                                }
                            }
                        }

                        //-------------------------------------------------Single Player game
                        if (numPlayers === 1) {
                            
                            //function to notify if the player wins
                            function notifyEndGameSuccess() {
                                var singlePlayerWinModal = document.getElementById("single-player-win-modal");
                                singlePlayerWinModal.style.display = 'block';
                                var singlePlayerNotify = document.getElementById('singleplayNotify');
                                singlePlayerNotify.textContent = "Congratulations! You've beat the game!";
                                document.getElementById("angry-chicken").style.display = "none";
                                var newGameOnWinButtonSingle = document.getElementById("new-game-on-win-button-single");
                                newGameOnWinButtonSingle.addEventListener('click', function() { location.reload() });
                            }

                            //function to notify if the player loses
                            function notifyEndGameFail() {
                                var singlePlayerWinModal = document.getElementById("single-player-win-modal");
                                singlePlayerWinModal.style.display = 'block';
                                document.getElementById("victory-chicken").style.display = "none";
                                var singlePlayerNotify = document.getElementById('singleplayNotify');
                                singlePlayerNotify.textContent = "Too Bad, Better luck next time!";
                                var newGameOnWinButtonSingle = document.getElementById("new-game-on-win-button-single");
                                newGameOnWinButtonSingle.addEventListener('click', function() { location.reload() });
                            }

                            //----------------if player choses a click challenge
                            if (gameType == "click") {
                                document.getElementById("timer").style.display = "none";

                                var clicksLeft;
                                if (difficulty == "easy") {
                                    clicksLeft = 120;
                                }
                                if (difficulty == "medium") {
                                    clicksLeft = 80;
                                }
                                if (difficulty == "difficult") {
                                    clicksLeft = 40;
                                }

                                document.getElementById("click-counter").textContent = clicksLeft;

                                for (var i = 0; i < hiddenPics.length; i++) {
                                    if (hiddenPics[i].classList.contains('cover')) {
                                        hiddenPics[i].addEventListener('click', function() {
                                            let piece = this;
                                            this.classList.remove('cover');
                                            this.firstChild.classList.remove('hidden1');
                                            setTimeout(function() {
                                                piece.classList.add('cover');
                                                piece.firstChild.classList.add('hidden1');
                                            }, 1000);

                                            //---------------if player makes correct guess
                                            if (this.firstChild.src === currentPlayer.targetPosition().firstChild.src) {
                                                rooster.play();
                                                removeClasses(1);
                                                currentPlayer.position = currentPlayer.target;
                                                getTarget();
                                                clicksLeft -= 1;
                                                //---------If player makes it around the board once
                                                if (currentPlayer.position == 0 && currentPlayer.target == 1) {
                                                    notifyEndGameSuccess();
                                                    removeActiveClasses(Player1, 1);
                                                    currentPlayer.currentPosition().classList.remove("player1");
                                                    currentPlayer = "";
                                                }
                                                addActiveColorAndCurrentClass(Player1, 1);
                                                currentPlayer.targetPosition().classList.add('player1-target');
                                            }
                                            //---------------if player makes incorrect guess
                                            else {
                                                no.play();
                                                clicksLeft -= 1;
                                                //---------------if player runs out of clicks
                                                if (clicksLeft == 0) {
                                                    notifyEndGameFail();
                                                    removeActiveClasses(Player1, 1);
                                                    currentPlayer.currentPosition().classList.remove("player1");
                                                    currentPlayer = "";
                                                }
                                            }
                                            document.getElementById("click-counter").textContent = clicksLeft;
                                        });
                                    }
                                }
                            }
                            
                            //----------------if player choses a time challenge
                            if (gameType == "time") {
                                document.getElementById("clicks").style.display = "none";

                                var timeLeft;
                                if (difficulty == "easy") {
                                    timeLeft = 180;
                                }
                                if (difficulty == "medium") {
                                    timeLeft = 120;
                                }
                                if (difficulty == "difficult") {
                                    timeLeft = 60;
                                }

                                document.getElementById("time-counter").textContent = timeLeft;

                                var interval = setInterval(function() {
                                    document.getElementById('time-counter').innerHTML = --timeLeft;
                                    if (timeLeft <= 0) {
                                        clearInterval(interval);
                                        //if player runs out of time
                                        notifyEndGameFail();
                                        removeActiveClasses(Player1, 1);
                                        currentPlayer.currentPosition().classList.remove("player1");
                                        currentPlayer = "";
                                        document.getElementById("timer").style.display = "none";
                                    }
                                }, 1000);

                                for (var i = 0; i < hiddenPics.length; i++) {
                                    if (hiddenPics[i].classList.contains('cover')) {
                                        hiddenPics[i].addEventListener('click', function() {
                                            let piece = this;
                                            this.classList.remove('cover');
                                            this.firstChild.classList.remove('hidden1');
                                            setTimeout(function() {
                                                piece.classList.add('cover');
                                                piece.firstChild.classList.add('hidden1');
                                            }, 1000);
                                            //if player makes incorrect guess
                                            if (this.firstChild.src !== currentPlayer.targetPosition().firstChild.src) {
                                                no.play();
                                            }
                                            //if player makes correct guess
                                            if (this.firstChild.src === currentPlayer.targetPosition().firstChild.src) {
                                                rooster.play();
                                                removeClasses(1);
                                                currentPlayer.position = currentPlayer.target;
                                                getTarget();

                                                //if player gets around the board
                                                if (currentPlayer.position == 0 && currentPlayer.target == 1) {
                                                    clearInterval(interval);
                                                    document.getElementById("timer").style.display = "none";
                                                    notifyEndGameSuccess();
                                                    removeActiveClasses(Player1, 1);
                                                    currentPlayer.currentPosition().classList.remove("player1");
                                                    currentPlayer = "";
                                                }
                                                addActiveColorAndCurrentClass(Player1, 1);
                                                currentPlayer.targetPosition().classList.add('player1-target');
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
                checkDifficulty();
            }
        }
        checkGameType();
    }
}
checkNumPlayers();



//-----------------------handle the new game and how to play buttons

var newGameButton = document.getElementById("new-game-button");
var howToPlayButton = document.getElementById("how-to-play-button");
var howToPlayModal = document.getElementById("how-to-play-modal");

function openHowToPlayModal() {
    howToPlayModal.style.display = 'block';
}

//Get the close button
var closeBtn = document.getElementById('closeBtn');

//Listen for close click
closeBtn.addEventListener('click', closeHowToPlayModal);

// Function to close modal
function closeHowToPlayModal(){
    howToPlayModal.style.display='none';
}

function closeModal(e) {
    if (e.target == howToPlayModal) {
        howToPlayModal.style.display = 'none';
    }
}

newGameButton.addEventListener('click', function() { location.reload() });
howToPlayButton.addEventListener('click', openHowToPlayModal);
window.addEventListener('click', closeModal);





