var percent = 100; // in case of the need to make fancy seizure effects, this changes canvas size, centred with window
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
