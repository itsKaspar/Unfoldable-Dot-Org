## Placing things in space

We've learned to place things in space by defining x and y variables

```js
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw(){
  let x = width/2;
  let y = height/2;
  let diameter = 100;
  circle(x,y,diameter);
}

```

But when handling hundreds of items it will become pretty tedious to have two separate variables for each of our placed shapes.
To solve this we need a type of variable that can contain both the x and the y coordinate.


## Vectors

For this reason I'd like to introduce vector notation. Though vectors mean different things in maths, physics and computer science,
in creative coding, a vector refers to a specific data structure which we call objects, more specifically a vector is an object which holds two values :
one x-coordinate and one y-coordinate.

In creative coding this can be assimilated to a point in space.

If we were to create a vector called v and look inside it, it would look like this

| attributes of v | values                 |
|-----------|------------------------|
| v.x       | holds the x-coordinate |
| v.y       | holds the y-coordinate |

Let's write the same code from above but with vector notation :

```js
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw(){

  let v = createVector(width / 2, height / 2);
  // creates a random vector with
  // x = width / 2
  // y = height / 2

  let diameter = 100;

  circle(v.x,v.y,diameter);
}

```

The x and y values of our vector object can be accessed with what is called ***dot notation***.

## Exercise

Reverse-engineer and then reproduce this code using vectors.

Here are some common questions that you could ask yourself :

1. List the geometric shapes that you can see
2. List the endpoints of every shape, how many are there ?
3. Are some endpoints shared ? How many endpoints really exist ?
4. How many of these are fixed ? How many are moving ?


<i-code layout="visual">
function setup() {
createCanvas(windowWidth, windowHeight);
}

function draw() {
  clear();

  let padding = 100;

  let v1 = createVector(0 + padding,0 + padding);
  let v2 = createVector(width-padding,0 + padding);
  let v3 = createVector(width-padding,height-padding)
  let v4 = createVector(0 + padding, height-padding);

  stroke('white');
  noFill();

  // fill(mouseY);
  triangle(v1.x, v1.y, v2.x, v2.y, mouseX, mouseY);

  // fill(width-mouseX);
  triangle(v2.x, v2.y, v3.x, v3.y, mouseX, mouseY);

  // fill(height-mouseY);
  triangle(v3.x, v3.y, v4.x, v4.y, mouseX, mouseY);

  // fill(mouseX);
  triangle(v4.x, v4.y, v1.x, v1.y, mouseX, mouseY);
}
</i-code>
