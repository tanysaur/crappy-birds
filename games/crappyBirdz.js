var p1;
var p2;
var scoreP1 = 0;
var scoreP2 = 0;

var winner;
var chosenCells = [];
var turns = 16;
var x = 0, y = 0;

//===== Leap motion ======


$(document).ready(function () {


    var frameLen = 0;
    var highlightedTile;
    function updateHighlight(a, b) {
        console.log(a, b)
        $('.grid div').removeClass('highlight');
        $('.grid #d' + a + "_" + b).addClass('highlight');
        highlightedTile = $('#d' + a + "_" + b);

    }
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
                    highlightedTile.click();
                    console.log(highlightedTile)
                    break;
                // case "screenTap":
                //     console.log("Screen Tap Gesture");
                //     break;
                case "swipe":
                    console.log("Swipe Gesture");
                    var swipedAt = new Date().getTime();
                    console.log(prev)
                    console.log(swipedAt);
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
   
    $('.grid div').on('click',  function () {
        $('#' + this.id + ' .one').hide()
        $('#' + this.id + ' .two').show()
      console.log(this.id);
    }); 
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

}//initGame

function selectTile() {
    var itemsArray = [
       {
            picture: "../public/images/bird_2.jpeg",
            score: 500
        }, {
            picture: "../public/images/bird.png",
            score: -200
        }, {
            picture: "../public/images/car-poop.jpeg",
            score: -100
        }, {
            picture: "../public/images/bird.png",
            score: 700
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
                .append('<img class="two" style="display:none" src="' + item.picture + '"/>')
                .data('score', item.score);
                
        }
    }
}//resetBoard

function gameStarts() {
    while (turns != 0) {
        //p1 starts
        //player chooses cell, if cell is used, show error ======= leapmotion: tap

        // $("#d" + x + "_" + y).click( function(){
        //     console.log("i clicked d_" + x + y);
        //     var pusheen = chosenCells.push($("#d" + x + "_" + y));
        //     console.log(pusheen);
        // });
       // $("#d" + x + "_" + y).addClass("birdOff");
        //show picture_score

        scoreP1 += picture_score;

        //mark cell as used using its data attr, class="used", we can also use backend to store the score & or picture

        //decrement turns
        turns--;

        //p2 or computer picks random cell
        //computer chooses unused cell, 
         var randomChoice = Math.floor((Math.random() * 16) + 1);
        //unblur picture of chosen cell
        //$("#d" + x + "_" + y).addClass("birdOff");

        scoreP2 += picture_score;

        //marks cell as used using its data attr, class="used";

        //decrement turns
        turns--;
    }
    declareWinner();

}//gameStarts


$('#d' + x + '_' + y).on('click', function(){
    console.log('this');
});

function declareWinner() {
    if (scoreP1 > scoreP2) {
        console.log("Player1 wins!");
        $("#game-status").text("Player 1 wins the game!");
    } else if (scoreP1 < scoreP2) {
        console.log("Player 2 wins!");
        $("#game-status").text("Player 2 wins the game!");
    } else if (scoreP1 === scoreP2){
        console.log("It's a tie!");
        $("#game-status").text("It's a tie!'");
    } else{
        console.log("OH CRAP!");
    }
}//declare winner