// Enemies our player must avoid

var Enemy = function(x, y) {

    this.x = x;
    this.y = y;

    //establishes initial position, randomly
    this.randomizer = Math.floor((Math.random() * 3) + 1);

    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, playr) {

    this.checkCollision(playr);

    //used to reset randomizer, so that sprite starts in different place each time
    var oneToThree = Math.floor((Math.random() * 3) + 1);

    //randomizes sprite speed each time it restarts it's run
    this.speed = (Math.floor((Math.random() * 250) + 1) * dt);

//change direciton of Enemy sprite

    if(this.x <= 0) {
        this.sprite = 'images/enemy-bug.png';
    } else if (this.x >= 550) {
        this.sprite = 'images/enemy-bug-reverse.png'
    }

//randomizes Enemy movement

    if(this.randomizer == 1) {
        if(this.x < 655) {
            this.x = this.x + (this.speed);
        } else {
            this.x = -150;
            this.randomizer = oneToThree;
        }
    } else if (this.randomizer == 2) {
        if(this.x > -150) {
            this.x = this.x - (this.speed);
        } else {
            this.x = 655;
            this.randomizer = oneToThree;
        }
    } else {
        this.x = this.x + Math.floor((Math.random() * 50) + 1);
        this.randomizer = oneToThree;

    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollision = function(playr) {
    if (playr.x < this.x + 75 &&
        playr.x + 65 > this.x &&
        playr.y < this.y + 50 &&
        70 + playr.y > this.y) {
        playr.reset();
    }
};

// ROCK


var Rock = function(x, y) {

    this.x = x;
    this.y = y;

    //determines starting position
    this.randomX = Math.floor((Math.random() * 505) + 1);

    //Math.floor((Math.random() * 9) + 1);

    this.sprite = 'images/Rock.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Rock.prototype.update = function(dt) {
    //Rock sometimes renders off screen, in order to fall occasionally in-game
    var randomX = Math.floor((Math.random() * 1500) + 1);

    //this variable has no use ATM
    var oneToTen = Math.floor((Math.random() * 10) + 1);

    // variable for determing rock speed
    this.speed = 250 * dt;

    if(this.y < 210) {
    this.y = this.y + (this.speed);
    } else {
       this.y = -30;
       this.x = randomX;
    }

};

// Draw the enemy on the screen, required method for game
Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// END ROCK////////////////

// Now write your own player class

var playerPosition = {
    "x": 0,
    "y": 0
}


var Player = function(x, y) {

    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;

};

Player.prototype.update = function(dt) {
    playerPosition.x = this.x;
    playerPosition.y = this.y;

    console.log(playerPosition.x, playerPosition.y);
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    console.log(key);

    switch (key) {
        case "left":
            this.x -= 25;
            break;
        case "right":
            this.x += 25;
            break;
        case "up":
            this.y -= 25;
            break;
        case "down":
            this.y += 25;
            break;
        default:
            console.log("no movement");
    }
};

Player.prototype.reset = function () {
    this.x == 200;
    this.y == 400;
    console.log("reset is passing");
};


// Now instantiate your objects.

var enemy1 = new Enemy(-150, 50);
var enemy2 = new Enemy(-150, 140);
var enemy3 = new Enemy (-150, 225);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];

var rock1 = new Rock (100, 0);


var allRocks = [rock1];
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



