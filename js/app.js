//increments each time player makes it to water
var score = 0;

var highScore = 0;

//effects how often rocks fall.
//Is a global variable because it is used in Player() and Rock().
var rockOccur = 5000;

//determines if heart is moving up or down

//Sprite Prototype

var Sprite = function(x, y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/Star.png';
}

Sprite.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Sprite.prototype.checkCollision = function(playr) {
     if (playr.x < this.x + 65 &&
        playr.x + 55 > this.x &&
        playr.y < this.y + 50 &&
        70 + playr.y > this.y) {


        if (life.numberOfLives < 1) {
            if (score > highScore) {
                highScore = score;
            }
            score = 0;
        } else {
            life.numberOfLives -= 1;
        }

        playr.reset();
    }

}

// Enemies our player must avoid
var Enemy = function(x, y) {

    Sprite.call(this, x, y);
    //establishes initial position, randomly
    this.randomizer = Math.floor((Math.random() * 3) + 1);

    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Sprite.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, playr) {

    //sees if enemy is in similar coordinates to player
    //and restarts game if true
    this.checkCollision(playr);

    //used to reset randomizer, so that sprite starts in different place each time
    var oneToThree = Math.floor((Math.random() * 3) + 1);

    //speed is incremented each time player scores a point
    this.speed = (100 + (25 * score)) * dt;

    //change direction of Enemy sprite
    //according to direction of movement

    if (this.x <= -100) {
        this.sprite = 'images/enemy-bug.png';
    } else if (this.x >= 550) {
        this.sprite = 'images/enemy-bug-reverse.png';
    }

    //randomizes Enemy movement

    if (this.randomizer == 1) {
        if (this.x < 655) {
            this.x = this.x + (this.speed);
        } else {
            this.x = -150;
            this.randomizer = oneToThree;
        }
    } else if (this.randomizer == 2) {
        if (this.x > -150) {
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

//restarts game if collision occurs


var Rock = function(x, y) {

    Sprite.call(this, x, y);

    //determines starting position
    this.randomX = Math.floor((Math.random() * rockOccur) + 1);

    this.sprite = 'images/Rock.png';
};

Rock.prototype = Object.create(Sprite.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Rock.prototype.update = function(dt, playr) {

    //sees if rock is in similar coordinates to player
    //and restarts game if true
    this.checkCollision(playr);

    //Rock sometimes renders off screen, in order to fall occasionally in-game
    var randomX = Math.floor((Math.random() * rockOccur) + 1);

    // variable for determing rock speed
    this.speed = 250 * dt;

    if (this.y < 210) {
        this.y = this.y + (this.speed);
    } else {
        this.y = 0;
        this.x = randomX;
    }

};

// Draw the enemy on the screen, required method for game

var Player = function(x, y) {

    Sprite.call(this, x, y);
    this.sprite = 'images/char-horn-girl.png';

};

Player.prototype = Object.create(Sprite.prototype);

Player.prototype.update = function(dt) {

    if (this.y <= -10) {
        score += 1;
        life.x = Math.floor((Math.random() * 2000) + 1);
        life.y = Math.floor((Math.random() * 250) + 1);

        if (rockOccur > 505) {
            rockOccur -= 200;
        }

        for (var i = 0; i < allEnemies.length; i++) {
            allEnemies[i].update.speed += 50;
        }

        this.reset();
    }
};

Player.prototype.handleInput = function(key) {
    console.log(key);

    switch (key) {
        case "left":
            if (this.x <= 0) {
                this.x = 0;
            } else {
                this.x -= 30;
            }
            break;
        case "right":
            if (this.x >= 410) {
                this.x = 410;
            } else {
                this.x += 30;
            }
            break;
        case "up":
            if (this.y <= -20) {
                this.y = -20;
            } else {
                this.y -= 30;
            }
            break;
        case "down":
            if (this.y >= 430) {
                this.y = 430;
            } else {
                this.y += 30;
            }
            break;
        default:
            console.log("no movement");
    }
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
    console.log(this.x + ", " + this.y);
};

///HEART

var Life = function(x, y) {

    Sprite.call(this, x, y);

    this.sprite = 'images/Heart.png';
    this.numberOfLives = 0;
    this.moveUpCounter = 0;
    this.moveDownCounter = 0;

};

Life.prototype = Object.create(Sprite.prototype);

Life.prototype.update = function(dt, playr) {
    this.checkCollision(playr);

    //makes heart float up and down in place
    if (this.moveUpCounter < 15) {
        this.moveDownCounter = 0;
        this.y -= 70 * dt;
        this.moveUpCounter += 1;
    } else {
        if (this.moveDownCounter < 15) {
            this.y += 70 * dt;
            this.moveDownCounter += 1;
        } else {
            this.moveUpCounter = 0;
            this.moveDownCounter = 0;

        }
    }

};

Life.prototype.checkCollision = function(playr) {

    //this block of code could be made once
    if (playr.x < this.x + 65 &&
        playr.x + 55 > this.x &&
        playr.y < this.y + 50 &&
        70 + playr.y > this.y) {

        this.numberOfLives += 1;

        this.x = Math.floor((Math.random() * 2000) + 1);
        this.y = Math.floor((Math.random() * 250) + 1);
    }
};

//all instances of enemies go here
var enemy1 = new Enemy(-150, 50);
var enemy2 = new Enemy(-150, 140);
var enemy3 = new Enemy(-150, 225);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3];

//all instances of rock go here
var rock1 = new Rock(100, 0);

//rocks are kept in an array in case I want to add more later
var allRocks = [rock1];

// Place the player object in a variable called player
var player = new Player(200, 400);

//Place instances of life here
var life = new Life(200, 300);

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
