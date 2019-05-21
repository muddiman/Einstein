/*
=========================================================================
|                           EINSTEIN                                    |
|                       BY: .muddicode                                  |
|                       Version: 0.9.0 - Release Candidate 1            |
=========================================================================
*/

/*  FLAGS   */
const DEBUG_ON=true;
const TIMER_ON=true;

/*  constants   */
const canvasHeight=500;
const canvasWidth=800;
const EASY=15;
const HARD=10;
const GENIUS=5;
const TIME=EASY;              //  15 second timer
/* const winSndFX = new Sound("correct.wav");
const loseSndFX = new Sound("wwrong.wav"); */

/*  GLOBALS */
var timer;
var SOUND_ON=true;

/*  classes */
/*  sound module    */
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    };
    this.stop = function(){
      this.sound.pause();
    };
  }

/*  objects */
var Game = {
    answer:     0,
    score:      0,
    hiScore:    0,
    Sound:      {},
    init:       function () {
                    this.answer = 0;
                    this.score = 0;
                },
};
/*  pre-load game assets    */
function preload() {
    Game.Sound.win = new sound("correct.wav");
    Game.Sound.lose = new sound("wrong.wav");
    Game.Sound.timer = new sound("pulse.wav");
    Game.Sound.timer.sound.volume = 0.1;
}

function toggleSnd() {
    if (SOUND_ON) {
        SOUND_ON = false;
        document.getElementById("sound_button").innerHTML = `SOUND`;
    } else {
        SOUND_ON = true;
        document.getElementById("sound_button").innerHTML = `MUTE`;
    }
}

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
    if (SOUND_ON) {
        Game.Sound.lose.play();
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
        if (SOUND_ON) {
            /*  play correct.wav    */
            Game.Sound.win.play();
        }
        ctx.fillText("Correct!", canvasWidth/2, 350);
        Game.score += 10;
        if (Game.score > Game.hiScore) {
            Game.hiScore = Game.score;
            document.getElementById("hiscore").setAttribute("class", "scores blink");
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
        if (SOUND_ON) {
            /*  play wrong.wav    */
        }
        wrongAnswer();
    } 
}

/*  Main Program    */
function runGame() {
    Game.init();
    document.getElementById("hiscore").setAttribute("class", "scores");
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
     if (SOUND_ON){
         Game.Sound.timer.play();
     }
     ctx.fillText(time, canvasWidth - 100, 85);
}


/*
*   TODO:   1.  remove the functioning clickability from disabled buttons
*/