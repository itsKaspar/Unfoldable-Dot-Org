let test_images;
let test_labels;

let squareSize = 170; // graphics

let autoencoder;
let encoder;
let decoder;

let spacing = 30;

let sliders = [];

let ten = [];

function preload(){

  test_images = loadJSON('./mnist/json/10k-mnist.json');
  test_labels = loadJSON('./mnist/json/10k-labels-mnist.json');

  latentSpace = loadJSON('latentSpace.json');

  autoencoder = new WebModel('./models/AE-mnist/model.json')
  encoder = new WebModel('./models/Encoder-mnist/model.json')
  decoder = new WebModel('./models/Decoder-mnist/model.json')

  for(let i = 0; i < 10; i++){
    ten.push(loadImage(`./ten/${i}.png`));
  }
}

function setup(){

  createCanvas(squareSize*3 + spacing * 4,squareSize*3 + spacing * 4);

  let p = 20;
  // # Create Sliders
  for(let i = 0; i < 8; i++){


    sliders.push(createSlider(-100,100,random([0,100]),1))
    let sx = spacing;
    let sy = i*((squareSize-2*p)/8) + p + squareSize + spacing * 2;
    sliders[i].position(sx, sy);
    sliders[i].style('width', squareSize + 'px');
    sliders[i].style('height', '5px');
    sliders[i].style('border-radius', '5px');
    sliders[i].style('background', '#d3d3d3');
    sliders[i].style('outline', 'none');
    sliders[i].style('-webkit-appearance', 'none');


  }
}

async function draw(){

  // # Classic in and out
  /////////////////////////////////////////

  const test_img = test_images[Math.floor(frameCount%1000/100)];
  const imgs = await autoencoder.evaluate(test_img);



  // # User input
  ////////////////////////////////////////

  let inputs = [];
  for(let i = 0; i < 8; i++){
    inputs[i] = sliders[i].value();
  }
  const imgs2 = await decoder.evaluate(inputs);

  // # Latent Space



  // DRAWING

  background(255); // needs to be here because of await
  let s = spacing;
  // Draw 1

  drawInput(imgs[0],0+s,0+s);
  drawNetwork([8,4,8],squareSize+s*2,0+s);
  drawOutput(imgs[1],squareSize*2+s*3,0+s,"heat");

  // Draw 2

  drawOutput(imgs2[1],squareSize*2+s*3,squareSize+s*2);
  drawNetwork([4,8],squareSize+s*2,squareSize+s*2);

  // Draw 3

  drawCorrespondingNumbers(0+spacing,squareSize*2+spacing*3);
  drawNetwork([8,4],squareSize+s*2,squareSize*2+s*3);
  drawLatentSpace(Object.values(latentSpace),squareSize*2+s*3,squareSize*2+s*3)
  //
  // noLoop();
}

// function drawOutput(newImages){
//   background(255);
//   // build an image
//   let im = createImage(28, 28);
//   im.loadPixels();
//   for (let i = 0; i < 28*28; i++) {
//       im.set(i%28, i/28, newImages[0][i]*255);
//   }
//   im.updatePixels();
//   im.resize(windowHeight, windowHeight);
//   image(im, 17, 17);
// }

function drawInput(img,x,y,style){
  drawPreview(img,x,y,style);
}

function drawOutput(img,x,y,style){
  drawPreview(img,x,y,style);
}

function drawPreview(img, startx, starty, style="bw"){

  // ADD A SECOND STYLE FOR THIS, NOT JUST THE BLACK AND WHITE

  const pixelDisplaySize = squareSize / 28; // Calculate Pixel Size
  noStroke();


  // Fill every pixel
  for(let i = 0; i < 28*28;i++){
    if(style == "heat"){
      let c3 = color("#361063");
      let c2 = color("#ba3a4e");
      let c1 = color("#f5e764");
      let c4;
      if(img[i]>0.5){
        c4 = lerpColor(c2,c3,(img[i]-0.5)*2);
        noStroke();
      }
      else{
                noStroke();
        c4 = lerpColor(c1,c2,img[i]*2);

      }

      fill(c4);
    }
    else{
              stroke("#ddd")
      fill(img[i]*255);
    }
    rect(startx + (Math.floor(i%28) * pixelDisplaySize),
         starty + (Math.floor(i/28) * pixelDisplaySize),
          pixelDisplaySize,
          pixelDisplaySize);
  }
}

function drawNetwork(n,x,y){

  let maxNeurons = Math.max.apply(Math, n);

  const p = 20; // padding
  const spacingX = (squareSize - p*2) / (n.length - 1); // to divide in 3
  const spacingY = (squareSize - p*2) / (maxNeurons - 1); // to divide in 8

  let l1 = [], l2 = [], l3 = [];

  let layers = []

  for(let j = 0; j < n.length; j++){

    let layer = [];

    for(let i = 0; i < n[j]; i ++){

      // if the layer doesnt have the max neurons it needs to start later
      let skip = maxNeurons - n[j];
      let late = (skip * spacingY)/2;

      // now calculate the coords
      let nx = p + x + spacingX * j;
      let ny = p + y + spacingY * i + late;

      let neuron = createVector(nx,ny);
      layer.push(neuron)

    }

    layers.push(layer);
  }

  // Lets just draw everything now


  for(let i = 0; i < layers.length-1;i++){
    drawConnections(layers[i],layers[i+1]);
  }
  for(let i = 0; i < layers.length; i++){
    drawNeurons(layers[i]);
  }
}

function drawNeurons(layer){
  noStroke();
  fill("#888");
  for(let i = 0; i < layer.length; i++){
    circle(layer[i].x, layer[i].y,10);
  }
}

function drawConnections(layer1, layer2){
  stroke("#bbb");
  for(let i = 0; i < layer1.length; i++){
    for(let j = 0; j < layer2.length; j++){
      line(layer1[i].x, layer1[i].y,layer2[j].x, layer2[j].y)
    }
  }
}

let colors = [
  ["#001219"],
  ["#005f73"],
  ["#0a9396"],
  ["#94d2bd"],
  ["#e9d8a6"],
  ["#ee9b00"],
  ["#ca6702"],
  ["#bb3e03"],
  ["#ae2012"],
  ["#9b2226"]
]

function drawLatentSpace(points,x,y){
  for(let i = 0; i < points.length;i++){
    let c = test_labels[i];
    if(c == 0) fill(colors[0])
    if(c == 1) fill(colors[1])
    if(c == 2) fill(colors[2])
    if(c == 3) fill(colors[3])
    if(c == 4) fill(colors[4])
    if(c == 5) fill(colors[5])
    if(c == 6) fill(colors[6])
    if(c == 7) fill(colors[7])
    if(c == 8) fill(colors[8])
    if(c == 9) fill(colors[9])
    let px = x + points[i][0]*squareSize/2 + squareSize/2
    let py = y + points[i][1]*squareSize/2 + squareSize/2
    noStroke();
    circle(px, py,2);
  }
}



function drawCorrespondingNumbers(x,y){
  let size = squareSize/5;
  for(let i = 0; i < 5; i++){
    let tx = 0+x;
    let ty = 0+y+i*size;
    image(ten[i], tx, ty,size,size);
    noStroke();
    fill(colors[i]);
    rect(tx+size,ty, size, size);
  }
  for(let i = 0; i < 5; i++){
    let tx = 0+x + squareSize/2;
    let ty = 0+y+i*size;
    image(ten[i+5], tx, ty,size,size);
    noStroke();
    fill(colors[i+5])
    rect(tx+size,ty, size, size);
  }
}
