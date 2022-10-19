function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);

  noStroke();
  linearGradient(
    width/2-50, 0, //Start point
    width/2+50, height, //End point
    color('#FFCBA4'), //Start color
    color('#7267CB'), //End color

  );
  rect(width/2, height/2, width, height);
}

  function linearGradient(sX, sY, eX, eY, colorS, colorE){
  let gradient = drawingContext.createLinearGradient(
    sX, sY, eX, eY
  );
  gradient.addColorStop(0, colorS);
  gradient.addColorStop(1, colorE);
  drawingContext.fillStyle = gradient;
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}
