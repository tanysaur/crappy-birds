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
    // var tapper = controller.gesture('screenTap');

      var tolerance = 50;
      var cooloff = 100;

      var x = 1, y = 1;

      var updateHighlight = function() {
        $('.grid div').removeClass('highlight');
        $('.grid #d'+ x +"_" + y).addClass('highlight');
      }

      var slider = _.debounce(function(xDir, yDir) {
        x += xDir;
        x = (x + 4) % 4;
        y += yDir;
        y = (y + 4) % 4;
        console.log("x:" + x);
        console.log("y:" + y);

        console.log('.grid #d'+ x + "_" + y);
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

     
// ====== NEED TO ADD screenTap listener functionality
// https://developer.leapmotion.com/documentation/javascript/api/Leap.ScreenTapGesture.html

// var controller = Leap.loop({enableGestures: true}, function(frame){
//   //... handle frame data
// });

// controller.on("gesture", function(gesture){
//   //... handle gesture object
//  console.log("tap tap tap!");
// });


});//docReady



//====== Game Play ====== 

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

    function selectTile(){
        var itemsArray = [{
            picture: "../public/images/car-poop.jpeg",
            score: 1000
        },{
            picture: "../public/images/bird_2.jpeg",
            score: 500
        },{
            picture: "../public/images/bird.png",
            score: 200    
        }];

        var randomItem = Math.floor((Math.random() * itemsArray.length) +1);

        console.log(itemsArray[randomItem].picture + " " + itemsArray[randomItem].score);

        return itemsArray[randomItem];
    }

    //resets board with random pictures
    function resetBoard(){
       
        // 4x4 2-dimensional array
        for (var row = 0; row < 4; row++){
            for (var col = 0; col < 4; col++){
                var item = selectTile();     

                //insert img to DOM, data-attr: picture value
                $('#d' + row + '_' + col)
                    .data('score', item.score)
                    .css("background-image", item.picture);        
            }
        }
    }//resetBoard

    function gameStarts(){
        while ( turns != 0){
            //p1 starts
                //player chooses cell, if cell is used, show error ======= leapmotion: rock
                
                //unblur picture
                $("#d" + "0_0").addClass("birdOff"); 
                //show picture_score

                scoreP1 += picture_score; 

                //mark cell as used using its data attr, class="used", we can also use backend to store the score & or picture

                //decrement turns
                turns--;
            
            //p2 or computer picks random cell
                //computer chooses unused cell, 

                //unblur picture of chosen cell
                $("#d" + "0_0").addClass("birdOff");

                scoreP2 += picture_score;

                //marks cell as used using its data attr, class="used";

                //decrement turns
                turns--;
        }
        declareWinner();

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
        }
    }//declare winner