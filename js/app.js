
var playerStart_X = 201,
    playerStart_Y = 440,
    playerLeftRight = 93,
    playerUpDown = 75,
    enemySpeeds = [35,180,65,100, 120];


//var randomitemfromarray = this[Math.floor(Math.random() * this.length)];
// Enemies our player must avoid
var Enemy = function(addsubtractfromY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = 0;
    this.y = 300 + (addsubtractfromY);
    this.speed = enemySpeeds[Math.floor(Math.random() * enemySpeeds.length)];
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x>500) {
      this.x = -10;
    };
    this.x = this.x + ( this.speed * dt );
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt){
  if (this.y<0) {
    this.x = playerStart_X;
    this.y = playerStart_Y;
  };
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function (input){
    switch (input) {
  case 'up':
    if (this.y < 65) {
        console.log('went too far up')
    } else {
    this.y-=playerUpDown
}
    break;
  case 'down':
    if (this.y > 420) {
        console.log('went too far down')
    } else {
    this.y+=playerUpDown
}
    break;
  case 'left':
  if (this.x < 20) {
       console.log('went too far left')
  } else {
    this.x-=playerLeftRight;
}
    break;
  case 'right':
  if (this.x > 385) {
       console.log('went too far right')
  } else {
    this.x+=playerLeftRight;
}
    break;
  default:
    console.log("Hello!");
} 
    };
// Now instantiate your objects.
var enemy1 = new Enemy(0),
    enemy2 = new Enemy(-155),
    enemy3 = new Enemy(-79),
    enemy4 = new Enemy(-240);


// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3,enemy4);
// Place the player object in a variable called player
var player = new Player(playerStart_X,playerStart_Y);


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
