
function processMouse(e) {
    //get real coords
    var coords = getMouseCoords(e);
    var right_mouse = e.button == 2; //0 izdo, 2 dcho.
    //process it accordingly
    var scene = APP.scenes.findScene(APP.current_scene);
    if (right_mouse) {
	scene.rightMouse(coords);
    }
    else {
	scene.leftMouse(coords);
    }

}

function draw_loop() {
  var curr_scene = APP.scenes.getScene(APP.current_scene);
  curr_scene.draw();
  if (APP.running==true){
    window.setTimeout(draw_loop, APP.REFRESH_RATE);
  }
}

function start () {
    var div_canvas = document.getElementById('jsgraph');
    //draw a canvas for stuff that's fixed
    var fixed_canvas = document.createElement('canvas');
    fixed_canvas.height = APP.HEIGHT;
    fixed_canvas.width = APP.WIDTH;
    fixed_canvas.id = "fixedcanvas";
    //and another one that will have some common redraws
    var user_canvas = document.createElement('canvas');
    user_canvas.height = APP.HEIGHT;
    user_canvas.width = APP.WIDTH;
    user_canvas.id = "usercanvas";
    user_canvas.oncontextmenu=function () {return false;};

    div_canvas.appendChild(user_canvas);

    APP.scenes = new SceneManager();
    var main_scene = APP.scenes.addScene("Main", user_canvas, fixed_canvas);
    main_scene.registerEvents();

    APP.current_scene = main_scene.name;
  APP.running = true;
  window.setTimeout(draw_loop, APP.REFRESH_RATE);
}

window.onload=start;
