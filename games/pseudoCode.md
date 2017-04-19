Variables:
p1
p2
scoreP1
scoreP2
winner
currentTurn
turns = 16;

Events:

initGame() - set variables p1, p2, scoreP1, scoreP2 to 0;

resetBoard() - apply picture scores to each cell randomly

    // consider putting in a server
    var gridValues = [{
        picture: "blah.png",
        score: 50 // data attribute
    },{
        picture: "ga.png",
        score: 100
    },{
        .... up to 16 values
    }
    ];

   var gridArray = [];

   for (var i = 0; i < 4; i++){
       for (var j = 0; j < 4; j++){
           var item = Math.Random () // randomly select grid
           item = {
               picture: "";
               score: 50
           };
           gridArray [i][j];
           // insert img to DOM
           // data attr picture value
       }
   }

gameStarts() 
    //disable board for both players
    while (turns != 0) {
        
        p1 starts
        //enable for p1, disable for p2
            choosesCell (if cell is used , show err)
                unblur Picture
                show picture.score
                increment scoreP1 += picture.score
                mark cell as  used // data attr, class="used"
                turns--
                //disable for p1, enable p2
        
        switch players

        p2 starts
        //enable for p2
            choosesCell 
                unblur Picture
                show picture.score
                increment scoreP1 += picture.score
                mark cell as used
                turns--
                //disable for p2, enable p1
    }

declareWinner()
    if (scoreP1 > scoreP2){
        p1 wins
    } else if (scoreP1 < scoreP2){
        p2 wins
    } else{
        it's a tie!
    }