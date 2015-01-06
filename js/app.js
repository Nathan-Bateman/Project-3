
//variable declarations for player movements, locations, and enemy locations and speeds
var playerStart_X = 201,
    playerStart_Y = 440,
    playerLeftRight = 93,
    playerUpDown = 75,
    enemySpeeds = [190,200,225,250, 170, 145, 120],
    enemyStartY = [300,145,60,221],
    score = 0;
//chooses a random item from an array
var randomfromarray = function (array){
  return array[Math.floor(Math.random() * array.length)]
};

var scoreDisplay = function(){
  document.getElementById('scoreboard').innerHTML = 'Score: ' + score;
};
//the above and below functions display the time and score
var timeDisplay = function(){
  document.getElementById('timer').innerHTML = 'Time: 30';
};
  timeDisplay();
//counts down from 30 seconds
var Countdown = function(){
      if (timeLeft == 0) {
    clearTimeout(timerID);
    document.getElementById('timer').innerHTML = 'Time: 0';
    } else {
      document.getElementById('timer').innerHTML = 'Time: ' + timeLeft;
      timeLeft --;
    }
  
    };
var timeLeft = 30;

var timerID = setInterval(Countdown, 1000);
//causes the Countdown to run continuously as with the Player and Enemy functions
Countdown.prototype.update = function(dt){
  Countdown();
};

// Enemies our player must avoid
var Enemy = function() {
    this.x = -80;
    this.y = this.start();
    this.speed = this.changespeed();
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var rangex = 40;
    var rangey = 30;
   if(Math.abs(player.x - this.x)<=rangex && Math.abs(player.y - this.y)<=rangey){
      player.reset();
    }
    if (this.x>500) {
      this.x = -80;
      this.y = randomfromarray(enemyStartY);
      this.speed = randomfromarray(enemySpeeds);
    };
    this.x = this.x + ( this.speed * dt );
}


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//chooses a random Y start from the passed array
Enemy.prototype.start = function(){
  return randomfromarray(enemyStartY);
}
//chooses a random speed  from the passed array
Enemy.prototype.changespeed =function(){
  return randomfromarray(enemySpeeds);
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
}
//displays the scoreboard and updates each time the player reaches the end
Player.prototype.update = function(dt){
  scoreDisplay();
  if (this.y<0) {
  this.reset()
  score = score + 5;
  scoreDisplay();
}
}
//resets player position
Player.prototype.reset = function(){
    this.x = playerStart_X;
    this.y = playerStart_Y;
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
//constrains the player to the visible sprite and increments at specified distance
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
var enemy1 = new Enemy();
    enemy2 = new Enemy(),
    enemy3 = new Enemy(),
    enemy4 = new Enemy(),
    enemy5 = new Enemy(),
    enemy6 = new Enemy();
    enemy7 = new Enemy();



// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3,enemy4,enemy5,enemy6,enemy7);
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
