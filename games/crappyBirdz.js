var p1;
var p2;
var scoreP1 = 0;
var scoreP2 = 0;

var winner;
var currentTurn;
var turns = 16;

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
}); 
    
      
    function initGame(){
        p1 = 0;
        p2 = 0;

    }//initGame

    function resetBoard(){


    }//resetBoard

    function gameStarts(){
        while ( turns != 0){
            //p1 starts
                //player chooses cell, if cell is used, show error
                
                //unblur picture

                //show picture_score

                scoreP1 += picture_score; 

                //mark cell as used using its data attr, class="used"

                turns--;
            
            //p2 or computer picks random cell
                //computer chooses unused cell, 

                //unblur picture of chosen cell

                scoreP2 += picture_score;

                //marks cell as used using its data attr, class="used";

                turns--;
        
        }

    }//gameStarts

    function declareWinner(){
        if (scoreP1 > scoreP2){
            console.log("Player1 wins!");
        } else if (scoreP1 < scoreP2){
            console.log("Player 2 wins!");
        } else {
            console.log("It's a tie!");
    }
}//