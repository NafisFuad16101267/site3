// DOM Selector
let submitBtn = document.querySelector('#submit-btn');
let userInput = document.querySelector('#enty-form');
let inputForm = document.querySelector('#input-form');
let restartbtn = document.querySelector('#restart-btn');


class Game {
    constructor(correctnumber) {
        this.correctnumber = correctnumber;
    }
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    gamePlan(guessedNumber, chances) {
        if (guessedNumber == correctnumber && chances <= 3) {
            UI.showResult(`${guessedNumber} is the right number.
            <br>YOU WIN!! Congratulations!!`);
            UI.showAlert(true, guessedNumber);
            inputForm.style.visibility = "hidden";
            restartbtn.style.visibility = "visible";
        } else if (guessedNumber < correctnumber && chances < 3) {
            UI.showResult(`${guessedNumber} is smaller than the right number.
            ${3 - chances} left`);
            UI.showAlert(false, guessedNumber);
        } else if (guessedNumber > correctnumber && chances < 3) {
            UI.showResult(`${guessedNumber} is greater than the right number.
            ${3 - chances} chances left`);
            UI.showAlert(false, guessedNumber);
        } else if (chances == 3) {
            UI.showResult(`Game over. ${correctnumber} was the correct number`);
            UI.showAlert(false, guessedNumber);
        }
    }
}

//UI Class
class UI {
    static showResult(message) {
        let div = document.querySelector('#output');
        div.innerHTML = `<h5>${message}</h5>`;
    }
    static showAlert(res, target) {
        let put = document.querySelector('#input');
        let div = document.createElement('div');
        let colour = res ? `success` : `error`;
        div.setAttribute('class', `alert ${colour}`);
        let show = res ? 'rigth' : 'Not right';
        div.innerText = `Given ${target} is ${show} number`;
        put.appendChild(div);

        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// Event Listener
submitBtn.addEventListener('click', guess);
restartbtn.addEventListener('click', restart);
document.addEventListener('DOMContentLoaded', initate);

// Global Variable
let correctnumber;
let chances;

function initate() {
    let low = 1;
    let high = 10;
    restartbtn.style.visibility = "hidden";
    correctnumber = Game.getRandomInt(low, high);
    //console.log(correctnumber);
    chances = 0;
}

function restart() {
    initate();
    inputForm.style.visibility = "visible";
    UI.showResult('');
}


function guess(e) {
    e.preventDefault();
    //console.log(correctnumber);
    let newGame = new Game(correctnumber);
    let guessedNumber = parseInt(userInput.value);
    newGame.gamePlan(guessedNumber, chances + 1);
    chances++;
    if (chances == 3) {
        UI.showResult(`${guessedNumber} is the right number.
            <br>YOU LOSE!! :(`);
        inputForm.style.visibility = "hidden";
        restartbtn.style.visibility = "visible";
    }
    inputForm.reset();
}
