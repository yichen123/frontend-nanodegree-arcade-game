'use strict';

// constants
var GRIDHEIGHT = 83;
var GRIDWIDTH = 101;
var NUMROWS = 6;
var NUMCOLS = 5;
var HEIGHT = GRIDHEIGHT * (NUMROWS - 1);
var WIDTH = GRIDWIDTH * NUMCOLS;
var ENEMYWIDTH = 80;
var PLAYERWIDTH = 80;
var NUMENEMIES = 8;
// global variables
var allEnemies = [];
var player;

// This is the Entity class that the father of both enemy and player classes
var Entity = function(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
};

Entity.prototype.render = function() {
    // drawing function for the entity
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is the Enemy class
var Enemy = function(x, y, width, speed) {
    Entity.call(this, x, y, width);
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};
Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function(dt) {
    // Update the enemy's position, required method for game
    // Make sure the enemy loop through the table
    // parameter dt is a time interval
    if (this.x > WIDTH && this.speed > 0) {
        this.x = -GRIDWIDTH;
    } else if (this.x < -GRIDWIDTH && this.speed < 0) {
        this.x = WIDTH;
    } else {
        this.x = this.x + this.speed * dt;
    }
};

// This is the player class
var Player = function(x, y, width) {
    Entity.call(this, x, y, width);
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
    // reposition the player when it reaches top or touches enemies.
    if (this.y < 0) {
        this.y = HEIGHT - GRIDHEIGHT / 2;
    }
};

Player.prototype.handleInput = function(input) {
    // move player to the desired position when key pressed
    // make sure the player will not off the screen
    if (input === 'left' && this.x >= GRIDWIDTH) {
        this.x -= GRIDWIDTH;
    } else if (input === 'right' && this.x < WIDTH - GRIDWIDTH) {
        this.x += GRIDWIDTH;
    } else if (input === 'up') {
        this.y -= GRIDHEIGHT;
    } else if (input === 'down' && this.y <= HEIGHT - GRIDHEIGHT) {
        this.y += GRIDHEIGHT;
    }
};

Player.prototype.ifCollision = function(object) {
    // detect if player touched the ojbect
    var ifTouch = false;
    if (this.y === object.y && this.x + this.width > object.x && this.x < object.x + object.width) {
        ifTouch = true;
    }
    return ifTouch;
};

document.addEventListener('keyup', function(e) {
    // key listener that waits for triggering the keyHandler
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
