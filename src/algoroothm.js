var minimumSteps = [];
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
