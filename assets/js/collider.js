Collider = {
  collidesWith: function(other) {
    var collisionDetected = false;
    this.elements.forEach(function(element) {
      other.elements.forEach(function(other_element) {
        if (element.x == other_element.x && element.y == other_element.y) {
          collisionDetected = true;
        }
      });
    });

    return collisionDetected;
  }
};
