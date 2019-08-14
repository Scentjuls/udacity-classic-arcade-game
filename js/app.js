let livesGotten = document.querySelector('.lives-left > span');
let lives = 5;
let points = 0;
let pointsGotten = document.querySelector('.scores > span');
let modal = document.querySelector('#modal');
let closeModal = document.querySelector('.modal-close-btn');
let gameWon = document.querySelector('.game-won');
let playAgain = document.querySelector('.modal-replay-btn');
let hideModal = document.querySelector('.modal-close-btns');

pointsGotten.innerHTML = points;
modal.style.display = 'none';
gameWon.style.display = 'none';

// Event listeners
closeModal.addEventListener('click', closeModals);
playAgain.addEventListener('click', restartGame);
hideModal.addEventListener('click', hideModalView);
// Enemies our player must avoid
class Enemy  {
    constructor(x_axis, y_axis, movement) {

    this.x_axis = x_axis;
    this.y_axis = y_axis;
    this.movement = movement;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'img/enemy-bug.png';
    }


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // console.log('x', this.x_axis)
    // console.log('mov', this.movement)
    // console.log('dt', this.dt)
    livesGotten.innerText = lives;
    this.x_axis += this.movement * dt;

    if (this.x_axis >= 505) {
        this.x_axis = -80;
    }
   
    if (player.x_axis < this.x_axis + 60 &&
        player.x_axis + 37 > this.x_axis &&
        player.y_axis < this.y_axis + 25 &&
        40 + player.y_axis > this.y_axis) {
        player.x_axis= 200;
        player.y_axis = 400;
        lives--;
        livesGotten.innerText = lives;
        if (lives === 0) {
            //show a modal
            showModal();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x_axis, this.y_axis);
};

// Now write your own player class
class Player {
    constructor(x_axis, y_axis, movement){
        this.x_axis = x_axis;
        this.y_axis = y_axis;
        this.movement = movement;
        this.sprite = 'img/char-princess-girl.png';
    }
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function() {

    if(this.y_axis > 380) { //if the player goes out of the box in the y direction, set it back to the starting state
    this.y_axis = 380;
}
if(this.x_axis > 400) { //if the player goes out of the box in the x direction, set it back to the starting state
    this.x_axis = 400;
}
if(this.x_axis < 0) {
    this.x_axis = 0;

}
    livesGotten.innerText = lives;
if (this.y_axis < 0) { // when you get to the beginning of the box, it should start from the initial stage
    this.y_axis = 400;
    this.x_axis = 200;
    points++;
    pointsGotten.innerText = points * 50; //increase points by 50

    if(points === 15 && lives > 0) {
       gameWonModal ();
       closeModals();
    }
}


};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x_axis, this.y_axis);
};

Player.prototype.handleInput = function(arrowkeys) {
    switch (arrowkeys) {
        case 'left': //move left 
            this.x_axis -= this.movement + 50;
            break;
        case 'right': //move right
            this.x_axis += this.movement + 50;
            break;
        case 'up': //move up
            this.y_axis -= this.movement + 30;
            break;
        case 'down': //move up
            this.y_axis += this.movement + 40;
            break;

    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let allEnemies = [];
// Place the player object in a variable called player
//adding the enemy to the screen
let enemy = [55, 140, 220];

enemy.forEach(enemyPosition => {
    let newPosition = new Enemy(0, enemyPosition, 150 + Math.floor(Math.random() * 505));
    allEnemies.push(newPosition);
});

//adding the player to the screen
let player = new Player(200, 400, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//functions to show and close the modals

function showModal() {
modal.style.display = 'block';

}


function closeModals() {
    modal.style.display = 'none';
}

function gameWonModal() {
    gameWon.style.display = "block";
}

function restartGame() {
    closeModals();
    lives = 5;
    points = 0;
    livesGotten.innerText = lives;
    pointsGotten.innerText = points;
}

function hideModalView() {
    gameWon.style.display = "none";
    lives = 5;
    points = 0;
    livesGotten.innerText = lives;
    pointsGotten.innerText = points;
}