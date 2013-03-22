APP.P_RADIUS = 3;

function Point (x, y) {
    this.x = x;
    this.y = y;

    this.draw=function (ctx) {
	console.log("drawing!");
	ctx.moveTo(x, y);
	ctx.arc(x, y, APP.P_RADIUS, 0, Math.PI*2);
	ctx.fillStyle="#33C";
	ctx.fill();
    };
}

// puramente explicativo, para que no quede raro
function reset_canvas(canvas){
    canvas.width = canvas.width;
}


function getMouseCoords(e) {
  var coords = {x:0, y:0};
  //depending on the browser it's processed differently
  //getting the coordinates within the document
  if (e.pageX != undefined && e.pageY != undefined) {
	coords.x = e.pageX;
	coords.y = e.pageY;
  }
  else {
	coords.x = e.clientX + document.body.scrollLeft +
	  document.documentElement.scrollLeft;
	coords.y = e.clientY + document.body.scrollTop +
	  document.documentElement.scrollTop;
  }

	//and relative to the canvas position:
  var cnv = document.getElementById('usercanvas');
  coords.x -= cnv.offsetLeft;
  coords.y -= cnv.offsetTop;

  return coords;
  };

function processMouseClick (scene, e) {
  var coords = getMouseCoords(e);
  console.log("clickety " + e.button);
  if (e.button==2) {
	scene.rightMousePressed(coords);
    console.log("right click");
  }
  else {
	//this.leftMousePressed(coords);
    scene.rightMousePressed(coords);
    console.log("left click");
  }
  e.stopPropagation();
};

var Scene = function (name, user_canvas, fixed_canvas) {
    this.name = name;
    this.user_canvas = user_canvas;
    this.fixed_canvas = fixed_canvas;
    this.have_to_draw_fixed = true;

    this.fixed_node = [];

    this.draw = function () {
	if (this.have_to_draw_fixed){
	    this.drawFixed();
	    this.have_to_draw_fixed = false;
	}
	reset_canvas(this.user_canvas);
	//put the other canvas
	var ctx = this.user_canvas.getContext("2d");
	ctx.drawImage(this.fixed_canvas, 0, 0);
	//draw temporary resources
    };

    this.addTempNode = function (x, y) {

    };

    this.addFixedNode = function (node) {
	  this.fixed_node.push(node);
      this.have_to_draw_fixed = true;
    };

    this.drawFixed = function () {
	var ctx = this.fixed_canvas.getContext("2d");
	reset_canvas(this.fixed_canvas);
	this.displayGrid();
	for (var i = 0; i < this.fixed_node.length; i++){
	    this.fixed_node[i].draw(ctx);
	}
    };

    this.displayGrid = function() {
	var ctx = this.fixed_canvas.getContext("2d");
	var gridSize = 20;
	for (var ypos = 0; ypos < APP.WIDTH; ypos += gridSize) {
            ctx.moveTo(0, ypos);
            ctx.lineTo(APP.WIDTH, ypos);
	}
	for (var xpos = 0; xpos < APP.WIDTH; xpos += gridSize) {
            ctx.moveTo(xpos, 0);
            ctx.lineTo(xpos, APP.WIDTH);
	}

	ctx.strokeStyle = "#eee";
	ctx.lineWidth = .7;
	ctx.stroke();
    };

  this.rightMousePressed = function (coords) {
	//override to treat properly ;)
    var node = new Point(coords.x, coords.y);
	this.addFixedNode(node);
  };

  this.leftMousePressed = function (coords) {
	//override to treat properly ;)
  };

  this.registerEvents = function() {
    console.log("registering events");
    var self = this; //js pasa el objeto que recibio el evento como origen de this
	this.user_canvas.addEventListener("mousedown", function (e) {processMouseClick(self, e); }, false);
  };

  this.unregisterEvents = function() {
	this.user_canvas.removeEventListener("click", this.processMouseClick, false);
  };

};

var SceneManager = function() {
    this.scenes = {};

    this.addScene = function (name, user_canvas, fixed_canvas) {
	if (!(name in this.scenes)) {
	    this.scenes[name] = new Scene(name, user_canvas, fixed_canvas);
	    return this.scenes[name];
	}
	return false;
    };

    this.getScene = function (name) {
	if (this.scenes.hasOwnProperty(name)) {
	    return this.scenes[name];
	}
	return false;
    };
};
