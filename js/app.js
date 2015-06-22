'use strict';

//constants
var GRIDHEIGHT = 83;
var GRIDWIDTH = 101;
var NUMROWS = 6;
var NUMCOLS = 5;
var HEIGHT = GRIDHEIGHT * (NUMROWS - 1);
var WIDTH = GRIDWIDTH * NUMCOLS;

var Entity = function(x, y) {
    // This is the Entity class that the
    // father of both enemy and player classes
    this.x = x;
    this.y = y;
};

Entity.prototype.render = function() {
    // drawing function for the entity
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This is the Enemy class
var Enemy = function(x, y, speed) {
    Entity.call(this, x, y);
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};
Enemy.prototype = Object.create(Entity.prototype);

Enemy.prototype.update = function(dt) {
    // Update the enemy's position, required method for game
    // Make sure the enemy loop through the table
    if (this.x > WIDTH && this.speed > 0) {
        this.x = -GRIDWIDTH;
    } else if (this.x < -GRIDWIDTH && this.speed < 0) {
        this.x = WIDTH;
    } else {
        this.x = this.x + this.speed * dt;
    }
};

// This is the player class
var Player = function(x, y) {
    Entity.call(this, x, y);
    this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Entity.prototype);

Player.prototype.update = function() {
    // reposition the player when it reaches top or touches enemies.
    if (this.y < 0) {
        this.y = HEIGHT - GRIDHEIGHT / 2;
    }
    for (var enemy in allEnemies) {
        if (this.ifCollision(allEnemies[enemy]) === true) {
            this.y = HEIGHT - GRIDHEIGHT / 2;
        }
    }
};

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
};

Player.prototype.ifCollision = function(object) {
    // detect if player touched the ojbect
    var ifTouch = false;
    if (this.y === object.y && Math.abs(object.x - this.x) < GRIDWIDTH / 2) {
        ifTouch = true;
    }
    return ifTouch;
};

// a collection of enemies
var allEnemies = [];

// generate eight enemies randomly and add them into the collection
while (allEnemies.length < 8) {
    var randomPick = Math.round(Math.random() * 2 + 1);
    if (randomPick === 1 || randomPick === 3) {
        var x = -GRIDWIDTH;
        var direction = 1;
    } else {
        var x = WIDTH;
        var direction = -1;
    }
    var y = randomPick * GRIDHEIGHT - GRIDHEIGHT / 2;
    var speed = (100 * Math.random() + 150) * direction;
    allEnemies.push(new Enemy(x, y, speed));
}

// this is the player
var player = new Player(WIDTH / 2 - GRIDWIDTH / 2, HEIGHT - GRIDHEIGHT / 2);

// key listener that waits for triggering the keyHandler
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
