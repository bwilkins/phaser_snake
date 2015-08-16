

var textStyle_Key =   {font: "bold 14px sans-serif", fill: "#46c0f9", align: "center"},
    textStyle_Value = {font: "bold 18px sans-serif", fill: "#fff",    align: "center"};

var Game = {
  preload: function() {
    // Here we load all the needed resources for the level.
    // In our case, that's just two squares - one for the snake body and one for the apple.
    game.load.image('snake', './assets/images/snake.png');
    game.load.image('apple', './assets/images/apple.png');
  },

  snake: null,
  apple: null,                     // An object for the apple;

  score: 0,                      // Game score.
  speed: 0,                      // Game speed.
  updateDelay: 0,                // A variable for control over update rates.

  scoreTextValue: null,
  speedTextValue: null,


  cursors: null,

  create: function() {

    // By setting up global variables in the create function, we initialise them on game start.
    // We need them to be globally available so that the update function can alter them.

    this.snake = new Snake;
    this.apple = new Apple;                     // An object for the apple;

    this.score = 0;                      // Game score.
    this.speed = 0;                      // Game speed.
    this.updateDelay = 0;                // A variable for control over update rates.

    // Set up a Phaser controller for keyboard input.

    game.stage.backgroundColor = '#061f27';

    // Add Text to top of game.
    // Score.
    game.add.text(30, 20, "SCORE", textStyle_Key);
    this.scoreTextValue = game.add.text(90, 18, this.score.toString(), textStyle_Value);
    // Speed.
    game.add.text(500, 20, "SPEED", textStyle_Key);
    this.speedTextValue = game.add.text(558, 18, this.speed.toString(), textStyle_Value);

  },

  update: function() {

    // Handle arrow key presses, while not allowing illegal direction changes that will kill the player.

    this.snake.handleInput();

    // A formula to calculate game speed based on the score.
    // The higher the score, the higher the game speed, with a maximum of 10;
    this.speed = Math.min(10, Math.floor(this.score/5));
    // Update speed value on game screen.
    this.speedTextValue.text = this.speed.toString();

    // Since the update function of Phaser has an update rate of around 60 FPS,
    // we need to slow that down make the game playable.
    this.updateDelay++;

    // Do game stuff only if the counter is aliquot to (10 - the game speed).
    // The higher the speed, the more frequently this is fulfilled,
    // making the snake move faster.
    if (this.updateDelay % (10 - this.speed) == 0) {
      // Snake movement

      this.snake.update();

      this.appleCollision();


      // Check for collision with self. Parameter is the head of the snake.
      this.selfCollision();

      // Check with collision with wall. Parameter is the head of the snake.
      this.wallCollision();
    }


  },

  appleCollision: function() {

    // Check if any part of the snake is overlapping the apple.
    // This is needed if the apple spawns inside of the snake.

    if (this.snake.collidesWith(this.apple)) {
      // Next time the snake moves, a new block will be added to its length.
      this.snake.addNew();

      // Destroy the old apple.
      this.apple.destroy();

      // Make a new one.
      this.apple = new Apple;

      // Increase score.
      this.score++;

      // Refresh scoreboard.
      this.scoreTextValue.text = this.score.toString();

    }

  },

  selfCollision: function() {

    // Check if the head of the snake overlaps with any part of the snake.
    if (this.snake.head().collidesWith(this.snake.body())) {
      // If so, go to game over screen.
      game.state.start('Game_Over', true, false, this.score);
    }

  },

  wallCollision: function() {

    // Check if the head of the snake is in the boundaries of the game field.
    var head = this.snake.head().elements[0];

    if(head.x >= 600 || head.x < 0 || head.y >= 450 || head.y < 0){
      // If it's not in, we've hit a wall. Go to game over screen.
      game.state.start('Game_Over',true, false, this.score);
    }

  }

};
