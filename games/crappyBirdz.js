var p1;
var p2;
var scoreP1 = 0;
var scoreP2 = 0;

var winner;
var p1ChosenCells = [];
var turns = 16;
var x = 0, y = 0;
var picture_score = 10;

var p1ChosenCell;
var p2ChosenCell;

var keyTapped;
var highlightedTile;

var options = [];
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
                    // console.log("my highlighted tile is : " + highlightedTile)
                    $("#game-status").text("Awesome!");
                    keyTapped = true;
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
    //resetBoard();

    $('.grid div').on('click', function () {
        $('#' + this.id + ' .one').hide()
        $('#' + this.id + ' .two').show()

        p1ChosenCell = this.id;

        var r1 = p1ChosenCell.charAt(1);
        var c1 = p1ChosenCell.charAt(3);

        updateHighlight(r1, c1);


         // this doesn't work yet
       // var valScore = document.getElementById('.two').getAttribute('score');
        
        //show picture score value to the page
        // $("#picture_score").html(valScore) // how do i take the VALUE from the img tag i.e. value=300 and update my html ???


        keyTapped = true;
        console.log("p1ChosenCell: " + p1ChosenCell);
        // console.log("score:" + valScore)
    });


    // $('.grid img').on('click', function () {
    //     // var secondImg = $(".two img").last();
    //     // console.log(secondImg);
    //     var second = $(this).last('img').find('.two');
    //     console.log(second);
    // });

}); // docReady


// Game play
$(document).keyup(function (event) { // keypress? what is the leapmotion equivalent?

    //Player presses spacebar to start the game
    if (event.keyCode == 32) {
        console.log("Game starts!");
        initGame();
        resetBoard();
        gameStarts();
    }

});



//initializes game stats  
function initGame() {
    p1 = 0;
    p2 = 0;
    var p1ChosenCells = [];
    var turns = 16;
    var x = 0, y = 0;
    var keyTapped = false;

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

    // 4x4 2-dimensional array
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            var item = selectTile();

            //insert img to DOM, data-attr: picture value
            $('#d' + row + '_' + col)
                .append('<img class="two" data-score="' + item.score + ' "style="display:none" src="' + item.picture + '"/>')
                //.css('<img ')
            //.data('score', item.score);

        }
    }
}//resetBoard

function computersTurn() {

    //updated
    $("#game-status").text("The computer is thinking...");

    p2ChosenCell = options[Math.floor((Math.random() * options.length))]; // #dx_y
    console.log("p2: " + p2ChosenCell);

    var r2 = p2ChosenCell.charAt(2);
    var c2 = p2ChosenCell.charAt(4);

    console.log(p2ChosenCell);;

    updateHighlight(r2, c2);

    $(p2ChosenCell).click();

    options.pop(p2ChosenCell);

    // if (p2ChosenCell != )
    scoreP2 += picture_score;
    $("#p2-score").html(scoreP2);
    //decrement turns
    turns--;
    keyTapped = true;
}

function gameStarts() {
    options = ["#d0_0", "#d0_1", "#d1_2", "#d0_3",
        "#d1_0", "#d1_1", "#d1_2", "#d1_3",
        "#d2_0", "#d2_1", "#d2_2", "#d2_3",
        "#d3_0", "#d3_1", "#d3_2", "#d3_3"];

    // while (turns != 0) {
    //p1 starts
    //player chooses cell by tapping


    //toggles the pic that was clicked

    if (keyTapped == true) {
        console.log("this is p1: " + p1ChosenCell);

        options.pop(p1ChosenCell);

        console.log("da");
        console.log(options.length + "_" + options);

        //show picture_score

        scoreP1 += picture_score;
        $("#p1-score").html(scoreP1);

        //mark cell as used using its data attr, class="used", we can also use backend to store the score & or picture
        //chosen

        //decrement turns
        turns--;


        // player 2's turn, with a 5 sec delay
        var p2Turn = setInterval(
            computersTurn(), 5000);

    }

   
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