var mainTimer = false;
var FPS = 50;
var mainInterval = 1000/FPS;

var canvasWidth = 0;
var canvasHeight = 0;

// initialise stuff
function init() {
  mainTimer = setInterval(tick, mainInterval);
  initObstacles();
}

function tick() { // main loop
  update();
  render();
}

function update() { // change variables every tick

}

function render() { // draw canvas
  var canvas = document.getElementById("sheepCanvas");
  var context = canvas.getContext("2d");

  context.save(); // just in case

  resizeCanvas(canvas, context); // fit to window

  context.clearRect(0, 0, canvasWidth, canvasHeight); // clear canvas

  drawMap(context);
  drawObstacles(context);
  drawPath(context);

  context.restore(); // just in case
}
