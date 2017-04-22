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

var keyTapped = false;
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
                    highlightedTile.click();
                    document.getElementById("splat").play();
                    // console.log("my highlighted tile is : " + highlightedTile)
                    $("#game-status").text("You clicked a tile!");
                    keyTapped = true;
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

});//docReady

//====== Game Play ====== 

$(document).ready(function () {
    resetBoard();


    $('body').on('click', '.card', function (event) {
        $(event.currentTarget).find('.one').addClass('hide');
        $(event.currentTarget).find('.picture').removeClass('hide');

        var picture_score = $(event.currentTarget).find('.picture').attr('value');

        $("#picture_score").html(picture_score);
        p1ChosenCell = this.id;



        var r1 = p1ChosenCell.charAt(1);
        var c1 = p1ChosenCell.charAt(3);

        console.log("r1: " + r1 + " c1: " + c1);
        updateHighlight(r1, c1);

        options.pop(p1ChosenCell);

        //keyTapped = true;
        console.log("p1ChosenCell: " + p1ChosenCell);

        scoreP1 += parseInt(picture_score);
        $("#p1-score").html(scoreP1);

        playersTurn();
    });

}); // docReady


// Game play
$(document).keyup(function (event) { // keypress? what is the leapmotion equivalent?

    //Player presses spacebar to start the game
    if (event.keyCode == 32) {
        console.log("Game starts!");
        initGame();
        resetBoard();
        //gameStarts();
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


function playersTurn() {
    if (turns >= 0 && keyTapped == true) {
        //run player 1 stuff
        turns--;
        console.log("turns: " + turns);

        keyTapped = false;

        setTimeout(computersTurn(), 3000);


    } else if (keyTapped == false) {
        $("#game-status").html("Computer's turn");
    } else {
        $("#game-status").html("Game ends");
    }
} //

function computersTurn() {

    //updated
    $("#game-status").text("The computer is thinking...");


    if (keyTapped != true) {
        p2ChosenCell = options[Math.floor((Math.random() * options.length))]; // #dx_y
       // console.log("p2: " + p2ChosenCell);


        var r2 = p2ChosenCell.charAt(2);
        var c2 = p2ChosenCell.charAt(4);

        console.log("Computer chose -> r2: " + r2 + " c2: " + c2);
        updateHighlight(r2, c2);

        $(p2ChosenCell).click();

        options.pop(p2ChosenCell);

        // if (p2ChosenCell != )
        scoreP2 += picture_score;
        $("#p2-score").html(scoreP2);
        //decrement turns
        turns--;
        // return keyTapped = true;
        //setTimeout(playersTurn(), 5000);
    }

}




function gameStarts() {
    // options = ["#d0_0", "#d0_1", "#d1_2", "#d0_3",
    //     "#d1_0", "#d1_1", "#d1_2", "#d1_3",
    //     "#d2_0", "#d2_1", "#d2_2", "#d2_3",
    //     "#d3_0", "#d3_1", "#d3_2", "#d3_3"];

    // while (turns != 0) {
    //p1 starts
    //player chooses cell by tapping


    //toggles the pic that was clicked

    // if (keyTapped == true) {
    //     console.log("this is p1: " + p1ChosenCell);

    //     options.pop(p1ChosenCell);

    //     console.log("da");
    //     console.log(options.length + "_" + options);

    //     //show picture_score

    //     scoreP1 += picture_score;
    //     $("#p1-score").html(scoreP1);

    //     //mark cell as used using its data attr, class="used", we can also use backend to store the score & or picture
    //     //chosen

    //     //decrement turns
    //     turns--;


    //     // player 2's turn, with a 5 sec delay
    //     var p2Turn = setInterval(
    //         computersTurn(), 5000);

    // }


    // }
    //declareWinner();

}//gameStarts


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