/*
=========================================================================
|                                                                       |
|                           EINSTEIN                                    |
|                       BY: .muddicode                                  |
|                                                                       |
=========================================================================
*/


function getAnswer() {
    // return a random integer between 11 and 99
    return Math.floor(Math.random() * 100);
}

function squareIt(x) {
    square = x * x;
    return square;
}
/* 
function getUsersGuess() {
    return document.getElementById("user_input").value;
}
 */
/* 
function isCorrect(answer, guess) {
    // compare user input with original number
    if (answer == guess) {
        return true;
    } else {
        return false;
    }
}
 */
function answer() {
    // display win or lose
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    var canvasWidth = 800;
    var canvasHeight = 500;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.font = "bold 200px Arial";
    if (getAnswer() == document.getElementById("user_input").value) {
        ctx.fillText("Correct!", 30, 350);
    } else {
        ctx.fillText("Wrong!", 30, 350);
    } 
}
// The game loop ESC = Quit()

// The main program

function question() {
    var canvasWidth = 800;
    var canvasHeight = 500;
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    var the_answer = getAnswer(); 

    ctx.font = "bold 300px Arial";
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillText(squareIt(the_answer), 30, 350);       

}