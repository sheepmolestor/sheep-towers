function generateGrid(a, b) {
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
