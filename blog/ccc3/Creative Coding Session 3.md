## Algorithms

## The Random Walker

Algorithms in visual arts are often written in two phases : the initialization, and the loop

A simple random walker algorithm can be written as

1. Initialization Phase
    1. initialize the walker's x and y position to the center of the sketch
2. Loop Phase
    1. draw the random walker
    2. add a random value to the walker x position
    3. add a random value to the walker y position

<tiny-code>
let v;

function setup() {
  createCanvas(windowWidth, windowHeight);
  v = createVector(width/2, height/2);
  noStroke();
}

function draw(){
  clear();
  circle(v.x,v.y,10)
  v.x += random(-1,1);
  v.y += random(-1,1);
}

</tiny-code>


Let's say we'd like to have a hundred random walkers, except we don't want to create 100 vectors.
And since the data needs to be persistent we can't just use a for loop, to solve this we are going to need a persistent data structure
that will can contain all the random walkers

## Arrays

An efficient data structure to use for this is an array, in common terms an array is exactly like an indexed table

First let's create an array of 100 walkers and display them

<tiny-code>
let walkers = []; // initiate the walkers array

function setup() {
  createCanvas(windowWidth, windowHeight);
  initWalkers();
  noStroke();
}

function draw(){
  clear();
  drawWalkers();
  moveWalkers();
}

function initWalkers(){
  // loop to create 100 walkers
  for(let i = 0; i < 100; i++){
    // create a random vector
    let w = createVector(random(width), random(height));
    // add the walker to the walkers array
    walkers.push(w)
  }
}

function drawWalkers(){
  // loop to display the 100 walkers
  for(let i = 0; i < 100; i++){
    // display walker at index i
    circle(walkers[i].x, walkers[i].y, 10);
  }
}

function moveWalkers() {
  // loop to move the 100 walkers
  for(let i = 0; i < 100; i++){
    // update walkers[i] x position
    walkers[i].x += random(-2,2);
    // update walkers[i] y position
    walkers[i].y += random(-2,2);
  }
}

</tiny-code>






### Conditions

We need to somehow check if the random walker is going out of the frame and either :
- put them back in the center of the sketch if he goes out of the frame

For this we are going to use the if condition. Here is a simple example :

<tiny-code>
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw(){
  clear();
  if(mouseX < width/2){
    fill('red');
  }
  else{
    fill('blue');
  }
  circle(mouseX, mouseY, 100);
}

</tiny-code>

Except we are going to use some conditions that are a little bit more advanced

<tiny-code>
function reset(){

}

</tiny-code>

<tiny-code>
function constrain(){

}

</tiny-code>

<tiny-code>
function snake2(){

}

</tiny-code>

### Conditions and Statements

- using the if condition
- how many cases do we need to study ?

#### In-Class Exercise 1 :

Adding a custom function to reset the random walker's position when it is out of bounds

code-example-2.js

#### In-Class Exercise 2 :

Adding a custom function to wrap the random walker's position to opposite walls (Snake 2 Behavior from Nokia 3310 phone)

code-example-3.js

#### In-Class Exercise 3 :

Adding a custom function to contain the random walker's position to the walls

code-example-3.js

#### Extra Exercise :

Create a random path by adding a new line connected to the old one at every draw loop

- create a variable to store the current position (initialize at center of sketch)
- create a variable to store the next position (add random x and random y to the current position)
- draw a line from current position to next position
- update the current position to the next position
- update the next position (add random x and random y to itself)
- repeat last three steps
