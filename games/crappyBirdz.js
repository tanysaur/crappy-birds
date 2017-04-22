var p1;
var p2;
var scoreP1 = 0;
var scoreP2 = 0;

var winner;
var p1ChosenCells = [];
var turns = 16;
var playerTurns;
var x = 0, y = 0;
var picture_score = 10;

var p1ChosenCell;
var p2ChosenCell;

var keyTapped;
var highlightedTile;


var options = ["#d0_0", "#d0_1", "#d1_2", "#d0_3",
    "#d1_0", "#d1_1", "#d1_2", "#d1_3",
    "#d2_0", "#d2_1", "#d2_2", "#d2_3",
    "#d3_0", "#d3_1", "#d3_2", "#d3_3"];

//===== Leap motion ======


function updateHighlight(a, b) {
    console.log("highlighted: " + a + "_" + b)
    $('.grid div').removeClass('highlight');
    $('.grid #d' + a + "_" + b).addClass('highlight');
    highlightedTile = $('#d' + a + "_" + b);
    console.log("highlighted tile div: " + highlightedTile);
}

$(document).ready(function () {

    var frameLen = 0;

    updateHighlight(0, 0);

    var prev = 0;
    var controller = Leap.loop({ enableGestures: true }, function (frame) {

        //console.log(frame.gestures.length)
        frameLen++;
        //console.log(frameLen)

        for (var i = 0; i < frame.gestures.length; i++) {
            var gesture = frame.gestures[i];
            switch (gesture.type) {
                case "keyTap":
                    console.log("Key Tap Gesture");
                    // updateHighlight();
                    document.getElementById("splat").play();
                    // console.log("my highlighted tile is : " + highlightedTile)
                    keyTapped = true;
                    highlightedTile.click();
                    console.log(keyTapped);
                    //playersTurn();
                    break;
                // case "screenTap":
                //     console.log("Screen Tap Gesture");
                //     break;
                case "swipe":
                    console.log("Swipe Gesture");
                    var swipedAt = new Date().getTime();
                    // console.log(prev)
                    // console.log(swipedAt);
                    if ((swipedAt - prev) > 500) {
                        var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
                        //Classify as right-left or up-down
                        if (isHorizontal) {
                            if (gesture.direction[0] > 0) {
                                swipeDirection = "right";
                                x++;
                            } else {
                                swipeDirection = "left";
                                x--;
                            }
                        } else { //vertical
                            if (gesture.direction[1] > 0) {
                                swipeDirection = "up";
                                y--;
                            } else {
                                swipeDirection = "down";
                                y++;
                            }
                        }
                        if (x < 0)
                            x = 0;
                        if (x > 3)
                            x = 3;

                        if (y < 0)
                            y = 0;
                        if (y > 3)
                            y = 3;

                        //console.log(swipeDirection)

                        updateHighlight(x, y)

                    }
                    if ((swipedAt - prev) > 500)
                        prev = swipedAt;
                    break;
            }
        };
        frameLen = 0;

    });

    resetBoard();

    $('body').on('click', '.card', function (event) {
        console.log('clicked cell');
        $(event.currentTarget).find('.one').addClass('hide');
        $(event.currentTarget).find('.picture').removeClass('hide');

        var picture_score = $(event.currentTarget).find('.picture').attr('value');

        $("#picture_score").html(picture_score);

        var chosenCell = this.id;

        console.log('turns ' + turns);
        console.log('keyTapped ' + keyTapped);

        if (turns >= 0 && keyTapped == true) {
            playersTurn(chosenCell, picture_score);
            $("#game-status").text("You clicked a tile!");
        }
        else if (turns >= 0 && keyTapped == false) {
            // chosenCell = options[Math.floor((Math.random() * options.length))]; // #dx_y
            // options.pop(chosenCell);

             $("#game-status").html("The computer is thinking...");
            computersTurn(chosenCell, picture_score);
        }

    });

}); // docReady


// Game play
$(document).keyup(function (event) { // keypress? what is the leapmotion equivalent?

    //Player presses spacebar to start the game
    if (event.keyCode == 32) {
        console.log("Game starts!");
        initGame();
        resetBoard();
    }

});



//initializes game stats  
function initGame() {
    p1 = 0;
    p2 = 0;
    p1ChosenCells = [];
    turns = 16;
    x = 0, y = 0;
    //var keyTapped = false;

}//initGame

function selectTile() {
    var itemsArray = [
        {
            picture: "../public/images/bird_2.jpeg",
            score: 500
        }, {
            picture: "../public/images/bird1.jpeg",
            score: -200
        }, {
            picture: "../public/images/car-poop.jpeg",
            score: -100
        }, {
            picture: "../public/images/bird2.jpeg",
            score: 700
        }, {
            picture: "../public/images/bird3.jpg",
            score: 1000
        }, {
            picture: "../public/images/brd4.jpeg",
            score: -500
        }];

    var randomItem = Math.floor(Math.random() * itemsArray.length);
    //console.log(itemsArray[0]);
    console.log(randomItem + " " + itemsArray[randomItem].picture + " " + itemsArray[randomItem].score);

    return itemsArray[randomItem];
}

//resets board with random pictures
function resetBoard() {
    var cardsHTML = '';
    // 4x4 2-dimensional array
    for (var row = 0; row < 4; row++) {
        cardsHTML = cardsHTML + '<div class="row">';
        for (var col = 0; col < 4; col++) {
            var item = selectTile();
            cardsHTML = cardsHTML + '<div id="d' + col + '_' + row + '" class="card">';
            cardsHTML = cardsHTML + '<img class="picture hide" value="' + item.score + '" src="' + item.picture + '" />';
            cardsHTML = cardsHTML + '<img class="one cover" src="../public/images/bird.png" />';
            cardsHTML = cardsHTML + '</div>';
        }
        cardsHTML = cardsHTML + '</div>';
    }

    $('.grid').html(cardsHTML);
}//resetBoard


function playersTurn(cell, pic) {
    console.log('player')
    if (turns >= 0 && keyTapped == true) {
        keyTapped = false;

        var r1 = cell.charAt(1);
        var c1 = cell.charAt(3);

        console.log("r1: " + r1 + " c1: " + c1);
        updateHighlight(r1, c1);

        options.pop(cell);

        scoreP1 += parseInt(pic);
        $("#p1-score").html(scoreP1);

        console.log("User | length :" + options.length + options);
        //keyTapped = true;
        console.log("p1ChosenCell: " + cell);

        //run player 1 stuff
        turns--;
        console.log("turns: " + turns);

        // setTimeout(computersTurn(,), 5000);
        // computer.click()

        chosenCell = options[Math.floor((Math.random() * options.length))]; // #dx_y
        options.pop(chosenCell);

        // picture_score = $(event.currentTarget).find('.picture').attr('value');

        // computer(chosenCell, picture_score);
        $(chosenCell).click();
    }
} //

function computersTurn(cell, pic) {
    console.log('computer')
    //updated
    $("#game-status").html("The computer is thinking....");
    setTimeout(function(){


        if (keyTapped != true) {

            keyTapped != true;

            console.log(cell);

            var r2 = cell.charAt(1);
            var c2 = cell.charAt(3);

            console.log('r2:' + r2)
            console.log('c2 ' + c2)

            //updateHighlight(r2, c2);


            scoreP2 += parseInt(pic);
            $("#p2-score").html(scoreP2);

            console.log("Computer chose -> r2: " + r2 + " c2: " + c2);

            turns--;
            //keyTapped = true;

            console.log("User | length :" + options.length + options);

            $("#game-status").html("Please select a tile.");

            // $(p2ChosenCell).click();

        }
    }, 5000);
}


function declareWinner() {
    if (scoreP1 > scoreP2) {
        console.log("Player1 wins!");
        $("#game-status").text("Player 1 wins the game!");
    } else if (scoreP1 < scoreP2) {
        console.log("Player 2 wins!");
        $("#game-status").text("Player 2 wins the game!");
    } else if (scoreP1 === scoreP2) {
        console.log("It's a tie!");
        $("#game-status").text("It's a tie!");
    } else {
        console.log("OH CRAP!");
    }
}//declare winner