
function getAnswer() {
    return 35;
}

function squareIt(x) {
    square = x * x;
    return square;
}

function getUsersGuess() {
    var users_guess = document.getElementById("users_guess_html").value;
    return users_guess;
}

function isCorrect(answer, guess) {
    if (answer == guess) {
        return true;
    } else {
        return false;
    }
}

function answer() {
    var answer = getAnswer();
    if (isCorrect(answer, getUsersGuess())) {
        ctx.fillText("1111", 30, 350);
    } else {
        ctx.fillText("0000", 30, 350);
    } 
}
// The game loop ESC = Quit()

// The main program

function main() {
    var c = document.getElementById("gameCanvas");
    var ctx = c.getContext("2d");
    ctx.font = "bold 300px Arial";
    ctx.fillText("1225", 30, 350);
    // var x = document.forms["myForm"]["number"].value;
        
    

}