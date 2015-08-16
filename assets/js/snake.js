function Snake() {
  var x, y;

  // Setup elements
  this.elementSize = 15;                                  // The length of a side of the squares. Our image is 15x15 pixels.
  this.elements = [];                                     // The stack of elements that make the snake
  for(var i = 0; i < 10; i++){
    x = 150 + i * this.elementSize;
    y = 150;
    this.elements[i] = game.add.sprite(x, y, 'snake');
  }

  this.direction = new Direction;                       // Set up the starting direction for the snake
  this.cursors = game.input.keyboard.createCursorKeys();  // Set up keyboard for input
  this.oldLastCellX = null;
  this.oldLastCellY = null;
}

Snake.prototype.handleInput = function() {
  if (this.cursors.right.isDown) { this.direction.right(); }
  else if (this.cursors.left.isDown) { this.direction.left(); }
  else if (this.cursors.up.isDown) { this.direction.up(); }
  else if (this.cursors.down.isDown) { this.direction.down(); }
};

Snake.prototype.update = function() {
  var firstCell = this.elements[this.elements.length - 1];
  var lastCell = this.elements.shift();
      this.oldLastCellx = lastCell.x,
      this.oldLastCelly = lastCell.y;

  this.direction.move(lastCell, firstCell);

  this.elements.push(lastCell);
  firstCell = lastCell;
};

Snake.prototype.addNew = function() {
  if (this.oldLastCellX && this.oldLastCellY) {
    this.elements.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snake'));
  }
};

Snake.prototype.head = function() {
  var head_elem = this.elements[this.elements.length - 1];
  var head = {
    elements: [ head_elem ]
  }
  extend(head, Collider);

  return head;
}

Snake.prototype.body = function() {
  var elems = this.elements.slice(0, -1);
  var body = {
    elements: elems
  }
  extend(body, Collider);

  return body
}

extend(Snake.prototype, Collider);
