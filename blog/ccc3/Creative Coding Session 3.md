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

```js
let x, y;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw(){
  circle(x,y,10)
  x += random(-10,10);
  y += random(-10,10);
}

```

<iframe src="blog/ccc3/code1.html"></iframe>

Let's say we'd like to have a hundred random walkers, except we don't want to create 100 vectors.
And since the data needs to be persistent we can't just use a for loop, to solve this we are going to need a persistent data structure
that will can contain all the random walkers

## Arrays

An efficient data structure to use for this is an array, in common terms an array is exactly like an indexed table

First let's create an array of 100 walkers and display them

```js
let walkers = []; // initiate the walkers array

function setup() {
  createCanvas(windowWidth, windowHeight);
  initWalkers();
}

function draw(){
  drawWalkers();
}

function initWalkers(){
  for(let i = 0; i < 100; i++){ // loop to create 100 walkers
    let w = createVector(random(width), random(height)); // create a random vector
    walkers.push(w) // add the walker to the walkers array
  }
}

function drawWalkers(){
  for(let i = 0; i < 100; i++){ // loop to display the 100 walkers
    circle(walkers[i].x, walkers[i].y, 10); // display walker at index i
  }
}

```

Now all we need to do is add an moveWalkers() function and add it in the draw loop calls

```js
function moveWalkers() {
  for(let i = 0; i < 100; i++){ // loop to display the 100 walkers
    walkers[i].x += random(-2,2); // update walkers[i] x position
    walkers[i].y += random(-2,2); // update walkers[i] y position
  }
}
```

<iframe src="blog/ccc3/code2.html"></iframe>

### Ideas to make the code better

We need to somehow check if the random walker is going out of the frame and either :
- put them back in the center of the sketch if he goes out of the frame

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


```js
// # ssc.org v.0.0.1b
// # copy <it> right  !
// # <3

let sentimental;
let signal;
let culture;

function stateMachines() {
  while(undefined == null){
    ...
    // the art happens here
    ...
  }
}
```
