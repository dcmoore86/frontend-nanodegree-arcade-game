// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x;
    this.y;
    this.speed; //speed to be multiplied by the dt parameter
    this.width = 78;
    this.height = 50;
    this.bugLocations = [60 , 140, 221]; //locations of the bug along the y-axis
    this.bugSpeeds = [375, 215, 125]; // speeds of the bug
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+=(dt*this.speed);
    if (this.x > 505) {
      //reset bug's location, change speed, and change location once offscreen
      this.setStartLocation();
      this.y = this.bugLocations[randomIntFromInterval(0,this.bugLocations.length-1)];
      this.x+=(dt*this.bugSpeeds[randomIntFromInterval(0,this.bugSpeeds.length-1)]);
    }
    //reset player back to start position after colliding with any bug
    if (this.checkCollisions()) {
      player.setStartLocation();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check collisions of player with bug
Enemy.prototype.checkCollisions = function() {
  return (player.x < this.x + this.width &&
     player.x + player.width > this.x &&
     player.y < this.y + this.height &&
     player.height + player.y > this.y);
};

//Set bug to start location
Enemy.prototype.setStartLocation = function() {
  this.x = -151;
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
  this.sprite = 'images/char-princess-girl.png';
  this.x;
  this.y;
  this.width = 71;
  this.height = 43;
  this.score = 0;
};

//Set player back to start location and increase the score by 1 point
//if the player touches the water
Player.prototype.update = function() {
  if (this.y === -32) {
    this.setStartLocation();
    score_div.innerHTML = this.score+=1;
  }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Set player back to start location
Player.prototype.setStartLocation = function() {
  this.x = 202;
  this.y = 383;
};

//Move player up, down, left, right within the canvas
Player.prototype.handleInput = function(input) {
  switch(input) {
    case 'left':
      this.x-101 >= 0 ? this.x-=101 : this.x;
      break;
    case 'right':
      this.x+101 <= 404 ? this.x+=101 : this.x;
      break;
    case 'up':
      this.y-=83;
      break;
    case 'down':
      this.y+83 <= 383 ? this.y+=83 : this.y;
      break;
  }
};

function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
player = new Player();
player.setStartLocation();

allEnemies = [];
for (let i = 0; i < 3; i++) {
  allEnemies.push(new Enemy());
  allEnemies[i].setStartLocation();
  allEnemies[i].y = allEnemies[i].bugLocations[i];
  allEnemies[i].speed = allEnemies[i].bugSpeeds[i];
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

const score_div = document.querySelector('.score');
