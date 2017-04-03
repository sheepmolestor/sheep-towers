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
