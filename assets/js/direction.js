function Direction() {
  this.__move_left = function(new_cell, old_cell){ new_cell.x = old_cell.x - 15; new_cell.y = old_cell.y; };
  this.__move_right = function(new_cell, old_cell){ new_cell.x = old_cell.x + 15; new_cell.y = old_cell.y; };
  this.__move_up = function(new_cell, old_cell){ new_cell.x = old_cell.x; new_cell.y = old_cell.y - 15; };
  this.__move_down = function(new_cell, old_cell){ new_cell.x = old_cell.x; new_cell.y = old_cell.y + 15; };

  this.__proto__.move = this.__move_right;
};

Direction.prototype.left = function() {
  if(this.__proto__.move != this.__move_right) {
    this.__proto__.move = this.__move_left;
  }
};
Direction.prototype.right = function() {
  if(this.__proto__.move != this.__move_left) {
    this.__proto__.move = this.__move_right;
  }
};
Direction.prototype.up = function() {
  if(this.__proto__.move != this.__move_down) {
    this.__proto__.move = this.__move_up;
  }
};
Direction.prototype.down = function() {
  if(this.__proto__.move != this.__move_up) {
    this.__proto__.move = this.__move_down;
  }
};

