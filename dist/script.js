/*var unvisitedNodes = [];
var minimumSteps = [];
var spawnNode = [0,18]; // starting point
var currentNode = [];
var pathing = true;
var successPaths = [];
var blocked = [];

function getShortestPath(i, j) {
  currentNode = [0, [spawnNode]];
  pathing = true;
  unvisitedNodes = generateGrid(gridWidth,gridHeight);
  blocked = getBlockedCoords();
  removeBlocks();
  spliceCoords(unvisitedNodes, currentNode[1][0]);
  while (pathing) {
    pathStep(i, j);
    minimiseDiagonals();
    if (currentNode.length==1) {
      pathing = false;
      return null;
    }
  }
  return leastDiagonals(successPaths);
}

function minimiseDiagonals() { // take out all paths that have more diagonals than others to the same point
  var recentCoords = [];
  var newCurrent = [currentNode[0]];
  for (var i=1; i<currentNode.length; i++) {
    var mostRecent = currentNode[i][currentNode[i].length-1];
    if (!containsCoords(recentCoords,mostRecent)) {
      recentCoords.push(mostRecent);
      newCurrent.push(currentNode[i]);
    }
    else {
      index = indexCoords(recentCoords, mostRecent);
      if (getDiagonals(currentNode[index])<=getDiagonals(currentNode[i])) {
        continue;
      } else {
        newCurrent.splice(index,1);
        newCurrent.push(mostRecent);
      }
    }
  }
  currentNode = newCurrent;
}

function getDiagonals(path) {
    var diagonals = 0;
    for (var j=0; j<path.length; j++)
      if (isDiagonal(path[j][0],path[j][1]))
        diagonals++;
  return diagonals;
}

function leastDiagonals(paths) {
  var index = 0;
  var minDiagonals = 999;
  for (var i=0; i<paths.length; i++) {
    var diagonals = 0;
    for (var j=0; j<paths[i].length; j++)
      if (isDiagonal(paths[i][j][0],paths[i][j][1]))
        diagonals++;
    if (diagonals<minDiagonals) {
      minDiagonals = diagonals;
      index = i;
    }
  }
  return paths[index];
}

function isDiagonal(p1, p2) {
  var a = Math.abs(p1[0]-p2[0]);
  var b = Math.abs(p1[1]-p2[1]);
  return (a==1&&b==1);
}

function removeBlocks() {
  for (var i=0; i<blocked.length; i++) {
    spliceCoords(unvisitedNodes,blocked[i]);
  }
}

function pathStep(a, b) {
  var newCurrent = [currentNode[0]+1];
  successPaths = [];
  for (var i=1; i<currentNode.length; i++) {
    connected = getConnectedNodes(currentNode[i][currentNode[0]]);
    for (var j=0; j<connected.length; j++) {
      //alert(connected.length+" "+connected[j][0]+" "+connected[j][1]);
      if (containsCoords(unvisitedNodes,connected[j])) {
        newCurrent.push(currentNode[i].slice(0));
        newCurrent[newCurrent.length-1].push(connected[j]);
        //spliceCoords(unvisitedNodes,connected[j]);
        if (sameCoords(connected[j],[a,b])) {
          pathing = false;
          successPaths.push(newCurrent[newCurrent.length-1]);
        }
      }
    }
  }
  for (var k=1; k<newCurrent.length; k++) {
    spliceCoords(unvisitedNodes,newCurrent[k][newCurrent[0]]);
  }
  currentNode = newCurrent;
}

function getConnectedNodes(node) { // get all connected unvisited from this node
  var connected = [];
  var blocked = getBlockedCoords();
  var nearby = [[node[0]+1, node[1]], // one square away from current
                [node[0]-1, node[1]],
                [node[0], node[1]+1],
                [node[0], node[1]-1]];

  for (var i=0; i<nearby.length; i++) {
    if (containsCoords(unvisitedNodes,nearby[i])) {
      connected.push(nearby[i]);
    }
  }

  var diagonalCheck = [[0,2],[0,3],[1,2],[1,3]];
  var diagonal = [[node[0]+1, node[1]+1],
                  [node[0]+1, node[1]-1],
                  [node[0]-1, node[1]+1],
                  [node[0]-1, node[1]-1]];

  for (var j=0; j<diagonalCheck.length; j++) {
    if (containsCoords(unvisitedNodes,diagonal[j])&&
      !containsCoords(blocked, nearby[diagonalCheck[j][0]])&&
      !containsCoords(blocked, nearby[diagonalCheck[j][1]])) {
      connected.push(diagonal[j]);
    }
  }
  return connected;
}*/
;var minimumSteps = [];
var blocked = [];
var spawnNode = [0, 9];
var currentNode = [];
var unvisitedNodes = [];
var steps = 0;
function getShortestPath(a, b) {
  /*minimumSteps = new Array(gridWidth);
  for (var i=0; i<gridHeight; i++) {
    minimumSteps[i] =  new Array(gridHeight);
  }*/
  shortestPath = [];
  unvisitedNodes = generateGrid(gridWidth,gridHeight);
  minimumSteps.push([]);
  minimumSteps[0].push(spawnNode);
  while (true) {
    var newNodes = getConnectedNodes();
    minimumSteps.push(newNodes);
    if (containsCoords(minimumSteps[minimumSteps.length-1], [a,b])) {
      break;
    }
    if (newNodes.length === 0)
      return null;
  }
  destIndex = indexCoords(minimumSteps[minimumSteps.length-1], [a,b]);
  currentNode = minimumSteps[minimumSteps.length-1][destIndex];
  shortestPath.push(currentNode);
  loop:
  for (var i=minimumSteps.length-2; i>=0; i--) {
    units = getAllUnitStepNodes(currentNode);
    for (var j=0; j<minimumSteps[i].length; j++) {
      for (var k=0; k<units.length; k++) {
        if (sameCoords(units[k],minimumSteps[i][j])) {
          currentNode = minimumSteps[i][j];
          shortestPath.push(currentNode);
          continue loop;
        }
      }
    }
    diagonals = getAllDiagonalStepNodes(currentNode);
    for (var l=0; l<minimumSteps[i].length; l++) {
      for (var m=0; m<diagonals.length; m++) {
        if (sameCoords(diagonals[m],minimumSteps[i][l])) {
          currentNode = minimumSteps[i][l];
          shortestPath.push(currentNode);
          continue loop;
        }
      }
    }
  }
  return shortestPath;
}

function getConnectedNodes() { // from latest minimumSteps element
  var newNodes = []; // for the next step
  latestSteps = minimumSteps[minimumSteps.length-1]; // previous step
  for (var i=0; i<latestSteps.length; i++) {
    units = getUnitStepNodes(latestSteps[i]); // get all possible unit moves
    diagonals = getDiagonalStepNodes(latestSteps[i]); // get all possible diagonal moves
    addUniqueCoords(newNodes, units);
    addUniqueCoords(newNodes, diagonals);
  }
  return newNodes;
}

function addUniqueCoords(array, toBeAdded) {
  for (var i=0; i<toBeAdded.length; i++) {
    if (!containsCoords(array, toBeAdded[i]))
      array.push(toBeAdded[i]);
  }
}

function getDiagonalStepNodes(node) { //unvisited only
  var nodes = [];
  var checks = [[node[0]+1, node[1]+1],[node[0]+1, node[1]-1],[node[0]-1, node[1]+1],[node[0]-1, node[1]-1]];
  var diagonalChecks = [[1,1],[1,-1],[-1,1],[-1,-1]];
  for (var i=0; i<checks.length; i++) {
    if (isUnvisited(checks[i])&&!isBlocked(checks[i]) &&
      !isBlocked([node[0]+diagonalChecks[i][0], node[1]]) &&
      !isBlocked([node[0], node[1]+diagonalChecks[i][1]])) {
      nodes.push(checks[i]);
      spliceCoords(unvisitedNodes,checks[i]);
    }
  }
  return nodes;
}

function getUnitStepNodes(node) { //unvisited only
  var nodes = [];
  var checks = [[node[0]+1, node[1]],[node[0]-1, node[1]],[node[0], node[1]+1],[node[0], node[1]-1]]; // possible squares
  for (var i=0; i<checks.length; i++) {
    if (isUnvisited(checks[i])&&!isBlocked(checks[i])) {
      nodes.push(checks[i]);
      spliceCoords(unvisitedNodes,checks[i]);
    }
  }
  return nodes;
}

function getAllUnitStepNodes(node) {
  return [[node[0]+1, node[1]],[node[0]-1, node[1]],[node[0], node[1]+1],[node[0], node[1]-1]];
}

function getAllDiagonalStepNodes(node) {
  return [[node[0]+1, node[1]+1],[node[0]+1, node[1]-1],[node[0]-1, node[1]+1],[node[0]-1, node[1]-1]];
}

function isBlocked(node) {
  return containsCoords(blocked, node);
}

function isUnvisited(node) {
  return containsCoords(unvisitedNodes, node);
}
;function generateGrid(a, b) {
  var grid = [];
  for (var i=0; i<a; i++) {
    for (var j=0; j<b; j++) {
      grid.push([i,j]);
    }
  }
  return grid;
}

function drawCentredRect(context, width, height) {
  context.fillRect(canvasWidth/2-width/2, canvasHeight/2-height/2, width, height);
}

function centreMapTranslate(context, width, height) {
  context.translate(canvasWidth/2-width/2, canvasHeight/2-height/2);
}

function fillScaledRect(context, x, y, width, height) {
  context.fillRect(x*GRID_SQUARE_LENGTH,y*GRID_SQUARE_LENGTH,width*GRID_SQUARE_LENGTH,height*GRID_SQUARE_LENGTH);
}

function containsElement(array, element) {
  /*for (var i=0; i<array.length; i++) {
    if (array[i]===element) {
      return true;
    }
  }
  return false;*/
  var index = array.indexOf(element);
  if (index >= 0) {
    return true;
  }
  return false;
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

function spliceElement(arr, element) {
  var index = arr.indexOf(element);
  if (index >= 0) {
    arr.splice( index, 1 );
  }
}

function spliceCoords(arr, coords) {
  for (var i=0; i<arr.length; i++) {
    if (sameCoords(arr[i],coords)) {
      arr.splice(i,1);
      return;
    }
  }
}

function containsCoords(array, coords) {
  for (var i=0; i<array.length; i++) {
    if (sameCoords(array[i],coords)) {
      return true;
    }
  }
  return false;
}

function indexCoords(array, coords) {
  for (var i=0; i<array.length; i++) {
    if (sameCoords(array[i],coords)) {
      return i;
    }
  }
  return -1;
}

function sameCoords(c1, c2) {
  if (c1.length!=c2.length)
    return false;
  for (var i=0; i<c1.length; i++) {
    if (c1[i]!=c2[i])
      return false;
  }
  return true;
}

function containsCommonElement(array1, array2) {
  for (var i=0; i<array1.length; i++) {
    for (var j=0; j<array2.length; j++) {
      if (array1[i]===array2[i]) {
        return true;
      }
    }
  }
  return false;
}

function clearArray(array) {
  array.splice(0, array.length);
}

function randomInt(number) { // pick a random integer
  return Math.floor(Math.random()*number);
}
function booleanArray(truths, arrayLength) { // get an array of boleans with a certain number of trues
  var falses = arrayLength-truths;
  if (falses<0)
    return;

  var booleans = [];
  for (var i=0; i<falses; i++) {
    booleans.push(false);
  }
  for (var j=0; j<truths; j++) {
    booleans.splice(randomInt(arrayLength), 0, true);
  }
  return booleans;
}

function sortNumber(a,b) { // ignore
    return a - b;
}

function sortCoords(aa, bb) { // ordered by y first then x (ie [0, 0] < [0, 1] < [1, 0] < [1, 1])
  if (aa[1]<bb[1]) {
    return -1;
  } else if (aa[1]>bb[1]) {
    return 1;
  } else {
    return aa[0]-bb[0];
  }
}

function groupSplice(array, splicePositions) { // remove a bunch of things from an array
  if (array.length<splicePositions.length)
    return;

  if (splicePositions.length===0)
    return;

  splicePositions.sort(sortNumber);
  for (var k=splicePositions.length-1; k>=0; k--) {
    array.splice(splicePositions[k], 1);
  }
}

function increaseIfPossible(toIncrease, increment, maximum) { // self-explanatory
  if (toIncrease >= maximum)
    return toIncrease;

  increased = toIncrease + increment;
  if (increased >= maximum)
    increased = maximum;

  return increased;
}

function decreaseIfPossible(toDecrease, decrement, minimum) { // self-explanatory
  if (toDecrease <= minimum)
    return toDecrease;

  decreased = toDecrease - decrement;
  if (decreased <= minimum)
    decreased = minimum;
  return decreased;
}
;function getBlockedCoords() { // get list of all squares with a rectangle in it
  return combineRectangles(rectangles);
}

function combineRectangles(rects) { // turn a group of rects into list of coordinates
  var polygonVertices = [];
  for (var i=0; i<rects.length; i++) {
    var vertices = rectangleToVertices(rects[i]);
    for (var j=0; j<vertices.length; j++) {
      if (!containsCoords(polygonVertices, vertices[j]))
        polygonVertices.push(vertices[j]);
    }
  }
  polygonVertices.sort(sortCoords);
  return polygonVertices;
}

function rectangleToVertices(rect) { // returns a list of rectangle's coordinates
  var vertices = [];
  for (var i=0; i<rect.width; i++) {
    for (var j=0; j<rect.height; j++) {
      vertices.push([rect.x+i, rect.y+j]);
    }
  }
  return vertices;
}
;var mainTimer = false;
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
;var mapWidth = 800;
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
;var rectangles = [];
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
;var percent = 100; // in case of the need to make fancy seizure effects, this changes canvas size, centred with window
function resizeCanvas(canvas, context) { // i have no idea why this is here
  fitToContainer(canvas, context);
}

function fitToContainer(canvas, context) {
  canvas.style.width="100%";
  canvas.style.height="100%";

  w = canvas.offsetWidth;
  h = canvas.offsetHeight;

  canvas.width = w;
  canvas.height = h;

  canvasWidth = w*percent/100;
  canvasHeight = h*percent/100;

  context.translate(-(percent-100)*w/200, -(percent-100)*h/200);
}
