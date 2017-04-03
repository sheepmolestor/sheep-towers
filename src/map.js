var mapWidth = 800;
var mapHeight = 608;

var gridWidth = 25;
var gridHeight = 19;

var MAP_ALPHA = 0.6; // transparency of map

function drawMap(context) {
  context.fillStyle = "white";
  context.globalAlpha = MAP_ALPHA;
  drawCentredRect(context, mapWidth, mapHeight);
  context.globalAlpha = 1;
}
