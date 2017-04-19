var p1;
var p2;
var scoreP1 = 0;
var scoreP2 = 0;

var winner;
var currentTurn;
var turns = 16;

//===== Leap motion ======

$(document).ready(function() {
      window.controller = new Leap.Controller({enableGestures: true});

      var swiper = controller.gesture('swipe');

      var tolerance = 50;
      var cooloff = 100;

      var x = 1, y = 1;

      var updateHighlight = function() {
        $('.grid div').removeClass('highlight');
        $('.grid #d'+x+"_"+y).addClass('highlight');
      }

      var slider = _.debounce(function(xDir, yDir) {
        x += xDir;
        x = (x + 4) % 4;
        y += yDir;
        y = (y + 4) % 4;
        console.log("x:"+x);
        console.log("y:"+y);

        console.log('.grid #d'+x+"_"+y);
        updateHighlight();
      }, cooloff);

      swiper.update(function(g) {
        if (Math.abs(g.translation()[0]) > tolerance || Math.abs(g.translation()[1]) > tolerance) {
          var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
          var yDir = Math.abs(g.translation()[1]) > tolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
          slider(xDir, yDir);
        }
      });

      controller.connect();
      updateHighlight();
    })


//====== Game Play ======
// 
$(document).ready(function(){
    resetBoard();
}); // docReady


// Game play
$(document).keyup(function(event){ // keypress? what is the leapmotion equivalent?

    //Player presses spacebar to start the game
    if (event.keyCode == 32){
        console.log("Game starts!");
    }

    initGame();
    resetBoard();

}); 
    
    //initializes game stats  
    function initGame(){
        p1 = 0;
        p2 = 0;

    }//initGame

    //resets board with random pictures
    function resetBoard(){
        var gridArray = [];

        // 4x4 2-dimensional array
        for (var row = 0; row < 4; row++){
            for (var col = 0; col < 4; col++){
                var item = Math.random()*16;

                item = {
                    picture: "pic1.jpg",
                    score: 50
                }
                gridArray [row][col];
            }
        }

    }//resetBoard

    function gameStarts(){
        while ( turns != 0){
            //p1 starts
                //player chooses cell, if cell is used, show error
                
                //unblur picture
                $("#" + d0_0).addClass("blurOff"); 
                //show picture_score

                scoreP1 += picture_score; 

                //mark cell as used using its data attr, class="used"

                //decrement turns
                turns--;
            
            //p2 or computer picks random cell
                //computer chooses unused cell, 

                //unblur picture of chosen cell

                scoreP2 += picture_score;

                //marks cell as used using its data attr, class="used";

                //decrement turns
                turns--;
        
        }

    }//gameStarts

    function declareWinner(){
        if (scoreP1 > scoreP2){
            console.log("Player1 wins!");
            $("#game-status").text("Player 1 wins the game!");
        } else if (scoreP1 < scoreP2){
            console.log("Player 2 wins!");
            $("#game-status").text("Player 2 wins the game!");
        } else {
            console.log("It's a tie!");
            $("#game-status").text("It's a tie!'");
           
    }//declare winner