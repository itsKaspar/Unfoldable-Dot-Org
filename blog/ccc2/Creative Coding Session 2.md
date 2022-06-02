## Introducing Chaos in Generative Art

...

### The Javascript Random function

the [random() function documentation](https://p5js.org/reference/#/p5/random) on the p5.js reference

- evaluating the random() function in the console
- using the random() function
- making a randomly placed circle at every frame

<tiny-code layout="overlay">
let v;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(255,255,255,100);
  frameRate(1);
}

function draw(){
  v = createVector(random(width), random(height))
  diameter = random(width/2); // chooses a random number between 0 and width/2
  circle(v.x,v.y,diameter)
}

</tiny-code>

## For loops

Having realized some of the possibilities that the draw() loop offers, it's natural to ask yourself if we could create our own loops.
Let's say we wanted to draw 5 randomly placed circles every second but have to create variables for each of these circle every time

<tiny-code layout="overlay">
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(1);
  noFill();
  stroke(255,255,255,100);
}

function draw(){
    let v1 = createVector(random(width), random(height)); // create random vector 1
    let v2 = createVector(random(width), random(height)); // create random vector 2
    let v3 = createVector(random(width), random(height)); // create random vector 3
    let v4 = createVector(random(width), random(height)); // create random vector 4
    let v5 = createVector(random(width), random(height)); // create random vector 5

    circle(v1.x,v1.y,10); // draw circle 1
    circle(v2.x,v2.y,10); // draw circle 2
    circle(v3.x,v3.y,10); // draw circle 3
    circle(v4.x,v4.y,10); // draw circle 4
    circle(v5.x,v5.y,10); // draw circle 5
}

</tiny-code>

This code would be rather tedious and have a lot of repetition. Whereas by creating our own for loop inside the draw loop


<tiny-code layout="overlay">
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(1);
  noFill();
  stroke(255,255,255,100);
}

function draw(){

  for(let i = 0; i < 5; i++){ // define a for loop

    drawRandomCircle(); // wil be executed 5 times

  } // end of loop
}

function drawRandomCircle(){

  let v = createVector(random(width), random(height)); // create a random vector
  circle(v.x,v.y,10); // draw circle
}

</tiny-code>

The magic happens on the line ***for(let i = 0; i < 5; i++)***
Let's deconstruct this to understand how the for loop definition works

| statement  |  step name |   what does it do ?                                                               |
|------------|:-------------------------|:------------------------------------------------------------------|
| let i = 0; | step 1 : initialization | declares and initializes an iterator variable at 0               |
| i < 5;     | step 2 : loop condition | tells the loop to keep looping as long as this condition is true |
| i++        | step 3 : incrementation | add 1 to the iterator variable                                   |

And then everything executed within the for loop scope will be looped
If we were to understand the inner function of the loop we could do a little pseudo code like so


```js
for(let i = 0; i < 5; i++){
  console.log(i)
}

// console ouput :
// 1
// 2
// 3
// 4
// 5
```

## Random Kandinsky

#### 1st step : creating drawRandomShape() functions

```js
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(1);
}

function draw(){
  background(255);
  drawRandomCircle();
  drawRandomRect();
  drawRandomLine();
}

function drawRandomCircle(){
  //...
}

function drawRandomRect(){
  //...
}

function drawRandomLine(){
  //...
}

```

We should now have a random Kandinsky drawing every second


#### 2nd step : add for loops in each drawRandomShape() functions

but let's make good use fo the for loop to draw these shapes multiples times.
In the following code I am going to update my drawRandomCircle() function to draw multiple circles.

```js
function drawRandomCircle(){

  for(let i = 0; i < 5; i++){ // define the for loop to loop 5 times

    let pos = createVector(random(width), random(height)) // create a random position
    let randomDiameter = random(width/4); // create a random diameter

    circle(pos.x, pos.y, randomDiameter); // draw one circle

  } // end of for loop
}
```

Now you can do the same with your drawRandomRect() and drawRandomLine() functions;

<iframe src="blog/ccc2/code2.html"></iframe>

## Saving a frame as a picture

Since this is our first cool looking code, let's learn how to save a frame that we want as a picture

Let's save a picture each time the mouse is pressed, just like the draw() and setup() function, behind the curtain of p5.js exists a mousePressed() function
which is called every time the mouse is pressed. Which means all we need to do is to redefine the function as such :

```js
function mousePressed(){
    save('image.jpg');
  }
}
```

This should be the end of the class by now, but if we have some extra time, here are a few more things we can develop on

## Going Further

### Random StrokeWeight() values for lines

...

### Random number of shapes

The random function doesn't just have to be used for positioning or for your shapes height and width's. It can be used everywhere in the code where there is a numerical value.

For example you could use it to define how many times your for loops are going to loop like this

```js
function drawRandomShape(){

  for(let i = 0; i < random(10); i++){

    // ... draw the shape a random amount of time

  }
}
```

### Random colors

You can have the shape be of completely random colors, using the random() functions as an input to the fill(R,G,B)

```js
function drawRandomShape(){

  for(let i = 0; i < 5; i++){
    fill(random(255),random(255),random(255)) // RGB values go from 0-255
    // ... draw the shape a random RGB values
  }
}
```
### Better Random colors

Though randomness in color weirdly always looks the same, so a little trick is that you can also define two colors and interpolate randomly between them using the colorLerp function

```js
function drawRandomShape(){

  let col1 = '#43bbc2'
  let col2 = '#23caa1'

  for(let i = 0; i < 5; i++){
    let randomColor = lerpColor(col1, col2, random());
    fill(randomColor)
    // ... draw the shape a random interpolation between col1 and col2
  }
}
```
### Keeping Shapes in the Frame

Make sure no shape stand outside of the frame
Let's think how to do that shape by shape :
- triangles will always be inside the frame
- lines will always be inside the frame
- circles and rectangles can sit outside

In this case we need to keep the radius (diameter/2) of each circle and rectangle
and
- add it to the mininum of the random function
- subtract it from the maximum of the random function

```js
function drawRandomCircle(){

  for(let i = 0; i < 5; i++){

    let diameter = random(100);
    let radius = randomDiameter/2;

    let x = random(0+radius, width-radius);
    let y = random(0+radius, height-radius);

    circle(x,y,diameter);
  }
}
```

Once you understand this, can you apply the same logic to rectangles width and heights ?
You'll need to store two variable (not just radius) !
