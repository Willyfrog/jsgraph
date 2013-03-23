var MainScene = function(name, user_canvas, fixed_canvas) {
  this.prototype = new Scene(name, user_canvas, fixed_canvas);

  this.rightMousePressed = function (coords) {
    var node = new Point(coords.x, coords.y);
  };

  this.leftMousePressed = function (coords) {
    console.log("pressed");
  };
  return this;
};