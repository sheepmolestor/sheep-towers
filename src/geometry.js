function getBlockedCoords() { // get list of all squares with a rectangle in it
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
