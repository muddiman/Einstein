/*
=========================================================================
|                                                                       |
|                           EINSTEIN                                    |
|                       BY: .muddicode                                  |
|                                                                       |
=========================================================================
*/

/*  FLAGS   */
const DEBUG_ON=true;

/*  constants   */
const canvasHeight=500;
const canvasWidth=800;

/*  objects */
var Game = {
    answer:     0,
    score:      0,
    hiScore:    0,
    init:       function () {
                    this.answer = 0;
                    this.score = 0;
                },
};

function getAnswer() {
    return Math.floor((Math.random() * 90) + 10);           // return a random integer between 11 and 99
}

function squareIt(x) {
    square = x * x;
    return square;
}

function answer() {
    // display win or lose
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    var canvasWidth = 800;
    var canvasHeight = 500;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = "bold 200px Arial";
    if (Game.answer == document.getElementById("user_input").value) {
        ctx.fillText("Correct!", 30, 350);
        Game.score += 10;
        if (Game.score > Game.hiScore) {
            Game.hiScore = Game.score;
        }
        document.getElementById("score").innerHTML = `SCORE: ${Game.score} pts`;
        document.getElementById("hiscore").innerHTML = `HI-SCORE: ${Game.hiScore} pts`;
        /*  submit is disabled & next is enabled    */
        document.getElementById("next").removeAttribute("class");
        document.getElementById("submit").setAttribute("class", "disabled");
    } else {
        if (DEBUG_ON === true) {
            console.log(`The correct answer is: ${Game.answer}`);
        }
        ctx.fillText("Wrong!", 30, 350);
        Game.init();
        document.getElementById("score").innerHTML = `SCORE: ${Game.score} pts`;
        /*  disable all buttons */
        document.getElementById("next").setAttribute("class", "disabled");
        document.getElementById("submit").setAttribute("class", "disabled");
    } 
}
// The game loop ESC = Quit()

// The main program

function runGame() {
    Game.init();
    document.getElementById("score").innerHTML = `SCORE: ${Game.score} pts`;
    document.getElementById("hiscore").innerHTML = `HI-SCORE: ${Game.hiScore} pts`;
    document.getElementById("start_button").innerHTML = `RESTART`;
    newQuestion();
/*     Game.answer = getAnswer(); 

    ctx.font = "bold 300px Arial";
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillText(squareIt(Game.answer), 30, 350);   */     
}

function newQuestion(ctx) {
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d"); 
    Game.answer = getAnswer(); 
    ctx.font = "bold 300px Arial";
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillText(squareIt(Game.answer), 30, 350);
    document.getElementById("submit").removeAttribute("class");
    document.getElementById("next").setAttribute("class", "disabled");
}


/*
*   TODO:   1.  remove the functioning clickability from disabled buttons
*           2.  remove the shadow from the disabled buttons
*
*/