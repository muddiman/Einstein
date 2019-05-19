/*
=========================================================================
|                           EINSTEIN                                    |
|                       BY: .muddicode                                  |
|                       Version: 0.8.0 - beta                           |
=========================================================================
*/

/*  FLAGS   */
const DEBUG_ON=true;
const TIMER_ON=false;

/*  constants   */
const canvasHeight=500;
const canvasWidth=800;
const EASY=15;
const HARD=10;
const GENIUS=5;
const TIME=EASY;              //  15 second timer

/*  GLOBALS */
var timer;

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
    return Math.floor((Math.random() * 90) + 10);           // return a random integer between 10 and 100
}

function squareIt(x) {
    square = x * x;
    return square;
}

/*  incorrect answer subroutine */
function wrongAnswer() {
    if (DEBUG_ON === true) {
        console.log(`The correct answer is: ${Game.answer}`);
    }
    let c = document.getElementById("gameCanvas");
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 110, canvasWidth, canvasHeight);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "bold 200px Arial";
    ctx.fillText("Wrong!", canvasWidth/2, 350);
    Game.init();
    document.getElementById("score").innerHTML = `SCORE: ${Game.score} pts`;
    /*  disable all buttons */
    setTimeout(() => {
        document.getElementById("next").setAttribute("class", "disabled");
        document.getElementById("submit").setAttribute("class", "disabled");
    }, 100);
}

function answer() {
    stopTimer(timer);
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 110, canvasWidth, canvasHeight -110);
    ctx.font = "bold 200px Arial";
    ctx.fillStyle = "rgb(0, 0, 0)";
    if (Game.answer == document.getElementById("user_input").value) {
        /*  correct answer subroutine   */
        ctx.fillText("Correct!", canvasWidth/2, 350);
        Game.score += 10;
        if (Game.score > Game.hiScore) {
            Game.hiScore = Game.score;
        }
        /*  display score   */
        document.getElementById("score").innerHTML = `SCORE: ${Game.score} pts`;
        document.getElementById("hiscore").innerHTML = `HI-SCORE: ${Game.hiScore} pts`;
        /*  submit is disabled & next is enabled    */
        setTimeout(() => {
            document.getElementById("next").removeAttribute("class");
            document.getElementById("submit").setAttribute("class", "disabled");
        }, 100);
    } else {
        wrongAnswer();
    } 
}

/*  Main Program    */
function runGame() {
    Game.init();
    stopTimer(timer);
    document.getElementById("score").innerHTML = `SCORE: ${Game.score} pts`;
    document.getElementById("hiscore").innerHTML = `HI-SCORE: ${Game.hiScore} pts`;
    document.getElementById("start_button").innerHTML = `RESTART`;
    newQuestion();   
}

function newQuestion() {
    if (TIMER_ON) {
        startTimer(TIME);
    }
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d"); 
    Game.answer = getAnswer(); 
    ctx.font = "bold 300px Arial";
    ctx.clearRect(0, 110, canvasWidth, canvasHeight -110);
    let squaredNumber = squareIt(Game.answer);
    ctx.textAlign = "center";
    ctx.fillStyle ="rgb(0, 0, 0)";
    ctx.fillText(squaredNumber, canvasWidth/2, 350);
    setTimeout(() => {
        document.getElementById("submit").removeAttribute("class");
        document.getElementById("next").setAttribute("class", "disabled");
    }, 500);
}

function stopTimer(timer) {
    clearInterval(timer);
}

function startTimer(time) {
        timer = setInterval(() => {
         displayTime(time);
        if (time < 1) {
            clearInterval(timer);
            wrongAnswer();
        }
         time--;
     }, 1000);
 }

function displayTime(time) {
     let c = document.getElementById("gameCanvas");
     let ctx = c.getContext("2d");
     let x = canvasWidth - 200;
     let y = 0;
     ctx.clearRect(x, y, 200, 100);
     ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
     ctx.fillRect(x, y, 200, 100);
     ctx.fillStyle = "rgb(255, 255, 255)";              //  white 
     ctx.font = "bold 100px Dot Matrix";
     ctx.fillText(time, canvasWidth - 100, 85);
}


/*
*   TODO:   1.  remove the functioning clickability from disabled buttons
*/