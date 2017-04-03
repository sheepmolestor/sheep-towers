var rectangles = [];
var GRID_SQUARE_LENGTH = 32;
var path = [];
var blocked = [];

function initObstacles() {
  GRID_SQUARE_LENGTH = mapWidth/gridWidth;
  for (var i=0; i<obstacleData.rects.length; i++) {
    rectangles.push(obstacleData.rects[i]);
  }

  blocked = getBlockedCoords();
  path = getShortestPath(24,9);
}

function drawObstacles(context) {
  context.save();
  centreMapTranslate(context,mapWidth,mapHeight);
  for (var i=0; i<rectangles.length; i++) {
    context.fillStyle = "black";
    fillScaledRect(context, rectangles[i].x,
      rectangles[i].y,
      rectangles[i].width,
      rectangles[i].height);
  }
  context.restore();
}

function drawPath(context) {
  if (path===null)
    return;

  context.save();
  centreMapTranslate(context,mapWidth,mapHeight);

  context.strokeStyle = "red";
  context.lineWidth = 10;
  context.beginPath();
  context.moveTo((path[0][0]+0.5)*GRID_SQUARE_LENGTH,(path[0][1]+0.5)*GRID_SQUARE_LENGTH);
  for (var i=1; i<path.length; i++) {
    context.lineTo((path[i][0]+0.5)*GRID_SQUARE_LENGTH,(path[i][1]+0.5)*GRID_SQUARE_LENGTH);
  }
  context.stroke();

  context.restore();
}
