// Enemies our player must avoid

var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.randomizer = Math.floor((Math.random() * 3) + 1);

    //Math.floor((Math.random() * 9) + 1);

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    var oneToNine = Math.floor((Math.random() * 3) + 1);

    /*var speedSlow = this.x + (50 * dt);
    var speedMid = this.x = (100 * dt);
    var speedFast = this.x = (200 * dt);*/

    if(this.randomizer == 1) {
        if(this.x < 655) {
            this.x = this.x + (100 * dt);
        } else {
            this.x = -150;
            this.randomizer = oneToNine;
        }
    } else if (this.randomizer == 2) {
        if(this.x > -150) {
            this.x = this.x - (100 * dt);
        } else {
            this.x = 655;
            this.randomizer = oneToNine;
        }
    } else {
        this.x = this.x + Math.floor((Math.random() * 50) + 1);
        this.randomizer = oneToNine;
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
var Rock = function(x, y) {
    Enemy.call(this, x, y);

    this.sprite = 'images/Rock.png';
};

Rock.prototype = Object.create(Enemy.prototype);
Rock.prototype.constructor = Rock;
Rock.prototype.update = function(dt) {
    if(this.x >= 400) {
       this.x = -150;
    } else {
       this.x = this.x + (100 * dt);
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
}; */
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.


// Now write your own player class

var Player = function(x, y) {

    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;

};

Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
};

// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.

var enemy1 = new Enemy(-150, 50);
var enemy2 = new Enemy(-150, 140);
var enemy3 = new Enemy (-150, 225);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];


// Place the player object in a variable called player

var player = new Player(200, 400);

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

/// CLICK LOCATION ////


