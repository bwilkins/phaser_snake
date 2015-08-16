function Apple() {
  // Chose a random place on the grid.
  // X is between 0 and 585 (39*15)
  // Y is between 0 and 435 (29*15)

  this.elementSize = 15;

  var randomX = Math.floor(Math.random() * 40 ) * this.elementSize,
      randomY = Math.floor(Math.random() * 30 ) * this.elementSize;

  // Add a new apple.
  this.elements = [];
  this.elements.push(game.add.sprite(randomX, randomY, 'apple'));
}

Apple.prototype.destroy = function() {
  this.elements.forEach(function(element) {
    element.destroy();
  });
};

extend(Apple.prototype, Collider);
