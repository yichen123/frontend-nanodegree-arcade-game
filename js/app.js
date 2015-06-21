'use strict';

//constants
var GRIDHEIGHT = 85;
var GRIDWIDTH = 100;
var HEIGHT = 400;
var WIDTH = 500;
var ENEMYHEIGHT = 60;
var ENEMYWIDTH = 100;
var PLAYERWIDTH = 60;

var Enemy = function() {
    // This is the enemy object
    this.sprite = 'images/enemy-bug.png';
    var randomPick = Math.round(Math.random() * 2 + 1);
    if (randomPick === 1 || randomPick === 3) {
        this.x = -ENEMYWIDTH;
        this.direction = 1;
    } else {
        this.x = WIDTH;
        this.direction = -1;
    }
    this.y = randomPick * GRIDHEIGHT - ENEMYHEIGHT / 2;
    this.speed = (100 * Math.random() + 150) * this.direction;
    console.log(this.x, this.y, this.speed);
}

Enemy.prototype.update = function(dt) {
    // Update the enemy's position, required method for game
    // Make sure the enemy loop through the table
    if (this.x > WIDTH && this.direction === 1) {
        this.x = -ENEMYWIDTH;
    } else if (this.x < -ENEMYWIDTH && this.direction === -1) {
        this.x = WIDTH;
    } else {
        this.x = this.x + this.speed * dt;
    }
}

Enemy.prototype.render = function() {
    // drawing function for the enemy
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {
    // This is the player object
    this.sprite = 'images/char-boy.png';
    this.x = 0;
    this.y = HEIGHT;
};

Player.prototype.update = function() {
    // reposition the player when it reaches top or if it touches with any
    // of the enemys.
    if (this.y < 0) {
        this.y = HEIGHT;
    }
    for (var enemy in allEnemies) {
        if (Math.abs(allEnemies[enemy].y - this.y) < 10) {
            if (Math.abs(allEnemies[enemy].x - this.x) < (ENEMYWIDTH + PLAYERWIDTH) / 2) {
                this.y = HEIGHT;
            }
        }
    }
}

Player.prototype.render = function() {
    //drawing function for the player
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(input) {
    // move player to the desired position when key pressed
    if (input === 'left' && this.x >= GRIDWIDTH) {
        this.x -= GRIDWIDTH;
    } else if (input === 'right' && this.x < WIDTH - GRIDWIDTH) {
        this.x += GRIDWIDTH;
    } else if (input === 'up') {
        this.y -= GRIDHEIGHT;
    } else if (input === 'down' && this.y <= HEIGHT - GRIDHEIGHT) {
        this.y += GRIDHEIGHT;
    }

}

var allEnemies = [];
while (allEnemies.length < 10) {
    allEnemies.push(new Enemy);
}

var player = new Player;

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
