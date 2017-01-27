var Player = function(x, y) {

    this.sprite = 'images/char-horn-girl.png';
    this.x = x;
    this.y = y;

};

Player.prototype.update = function(dt) {

    console.log(this.x, this.y);

    if (this.y <= -10) {
        points += 1;

        if (rockOccur > 505) {
        rockOccur -= 200;
        }

        for (var i = 0; i < allEnemies.length; i++) {
            allEnemies[i].update.speed += 50;
        }

        console.log(enemy1.update.speed);

        player.reset();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    console.log(key);

    switch (key) {
        case "left":
            if(this.x <= 0) {
                this.x = 0;
            } else {
            this.x -= 30;
            }
            break;
        case "right":
            if(this.x >= 410) {
                this.x = 410;
            } else {
            this.x += 30;
            }
            break;
        case "up":
            if(this.y <= -20) {
                this.y = -20;
            } else {
            this.y -= 30;
            }
            break;
        case "down":
            if(this.y >= 430) {
                this.y = 430;
            } else {
            this.y += 30;
            }
            break;
        default:
            console.log("no movement");
    }
};

Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
    console.log(this.x +  ", " + this.y );
};