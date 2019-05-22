/*
=========================================================================
|                           EINSTEIN                                    |
|                       BY: .muddicode                                  |
|                       Version: 1.0.0                                  |
=========================================================================
*/

/*  FLAGS   */
const TIMER_ON=true;

/*  constants   */
const canvasHeight=500;
const canvasWidth=800;
const EASY=15;
const HARD=10;
const GENIUS=5;
const TIME=EASY;              //  15 second timer

/*  GLOBALS */
var timer;
var count = 0;
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
        if (Game.Settings.SOUND) {
            this.sound.play();
        }
    };
    this.stop = function(){
      this.sound.pause();
    };
  }

/*  objects */
var Game = {
    Settings:   {},
    answer:     0,
    score:      0,
    hiScore:    100,
    time:       TIME,
    Sound:      {},
    init:       function () {
                    this.answer = 0;
                    this.score = 0;
                    this.time = TIME;
                },
};

/*  pre-load game assets    */
function preload() {
    Game.Sound.win = new sound("correct.wav");
    Game.Sound.lose = new sound("wrong.wav");
    Game.Sound.timer = new sound("pulse.wav");
    Game.Sound.timer.sound.volume = 0.1;
}

/*  initialize game settings    */
Game.Settings = {
    SOUND:  true,
    TIMER:  true,
    DEBUG:  false,
    INIT:   function () {
        this.SOUND = true;
        this.TIMER = true;
        this.DEBUG = true;
    },
};

function toggleSnd() {
    if (Game.Settings.SOUND) {
        Game.Settings.SOUND = false;
        document.getElementById("sound_button").innerHTML = `SOUND`;
    } else {
        Game.Settings.SOUND = true;
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
    if (Game.Settings.DEBUG) {
        console.log(`The correct answer is: ${Game.answer}`);
    }
    Game.Sound.lose.play();
    let c = document.getElementById("gameCanvas");
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 110, canvasWidth, canvasHeight);
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "bold 200px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Wrong!", canvasWidth/2, 350);
    Game.init();
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
            Game.Sound.win.play();
        ctx.textAlign = "center";
        ctx.fillText("Correct!", canvasWidth/2, 350);
        Game.score += 10;
        if (Game.score > Game.hiScore) {
            Game.hiScore = Game.score;
        } 
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
    document.getElementById("start_button").innerHTML = `RESTART`;
    newQuestion();   
}

function newQuestion() {
    if (Game.Settings.TIMER) {
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
        Game.Sound.timer.play();
        Game.time = time;
        if (time < 1) {
            clearInterval(timer);
            wrongAnswer();
        }
         time--;
     }, 1000);
 }

/* function displayTime(time) {
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
} */

function banner() {
    let c = document.getElementById("gameCanvas");
    let ctx = c.getContext("2d");
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.fillRect(0, 0, canvasWidth, 100);
    ctx.fillStyle = "rgb(255,255, 255)"; 
    ctx.font = "bold 40px Dot Matrix";
    if (Game.hiScore === Game.score) {
        writeOnBanner("HI-SCORE", 40, 40, Game.hiScore, 80, 80, "left", true);     
    } else {
        writeOnBanner("HI-SCORE", 40, 40, Game.hiScore, 80, 80, "left", false);
    }
    if (Game.time < 6) {
        writeOnBanner("TIME", canvasWidth/2, 40, Game.time, canvasWidth/2, 80, "center", true);
    } else {
        writeOnBanner("TIME", canvasWidth/2, 40, Game.time, canvasWidth/2, 80, "center", false);
    }
    writeOnBanner("SCORE", canvasWidth - 40, 40, Game.score, canvasWidth - 40, 80, "right", false);
}

function writeOnBanner(objName, x, y, objValue, xComp, yComp, objAlign, blink) {
    let c = document.getElementById("gameCanvas");
    let ctx = c.getContext("2d");
    ctx.fillStyle = "rgb(255,255, 255)"; 
    ctx.font = "bold 40px Dot Matrix";
    ctx.textAlign = objAlign;
    ctx.fillText(objName, x, y);
    if (blink) {
        count = (count + 1) % 3;
        if (count === 0) {
            if (ctx.fillStyle === "rgb(255, 0, 0)") {
                ctx.fillStyle = "rgb(255, 255, 255)";
            } else {
                ctx.fillStyle = "rgb(255, 0, 0)"; 
            }
        }
    }
    ctx.fillText(objValue, xComp, yComp);
}

var animate = setInterval(() => {               
    let c = document.getElementById("gameCanvas");
    let ctx = c.getContext("2d");
    ctx.clearRect(0, 0, canvasWidth, 100);    
    banner();
}, 100);


/*
*               KNOWN BUGS 
*  TODO:   1.  remove the functioning clickability from disabled buttons
*/