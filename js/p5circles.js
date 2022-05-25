
  let triplets = [];
  let grid;

  function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    let w = width;
    let h = height;
    let v = createVector;

    grid = new Grid(4,4);

    let t = [
      [
        [ w/2   , h/9*2 , 150 ],
        [ w/9*7 , h/9*7 , 150 ],
        [ w/9*2 , h/9*7 , 150 ]
      ],
      [
        [ w/6*2  , h/4*1 , 200 ],
        [ w/6*4  , h/4*1 , 200 ],
        [ w/2*1  , h/4*3.25 , 120 ]
      ],
      [
        [ w/4*3  , h/4*1 , 150 ],
        [ w/7*2  , h/7*5 , 150 ],
        [ w/7*2  , h/7*5 , 250 ]
      ],
      [
        [  w/2   , h/2   , 150 ],
        [  w/2   , h/2   , 250 ],
        [  w/2   , h/2   , 350 ]
      ],
      [
        [ w/4   , h/4   , 200 ],
        [ w/4*3 , h/4*3 , 200 ],
        [ w/2   , h/2   , 200 ]
      ],
      [
        [ w/2   , h/6*2 , 200 ],
        [ w/6*4 , h/6*4 , 200 ],
        [ w/6*2 , h/6*4 , 200 ]
      ],
      [
        [  w/7*2   , h/2   , 120 ],
        [  w/7*5   , h/2   , 120 ],
        [  w/2   , h/2   , 350 ]
      ],
      [
        [  w/2   ,   h/2   , 350 ],
        [  w/7*3   , h/2   , 150 ],
        [  w/7*4   , h/2   , 150 ]
      ],
      [
        [  w/8*5   , h/8*5   , 300 ],
        [  w/8*5   , h/8*5   , 100 ],
        [  w/8*2   , h/8*2   , 200 ]
      ],
      [
        [  w/8*3   , h/8*5   , 100 ],
        [  w/8*3   , h/8*5   , 250 ],
        [  w/8*5   , h/8*3   , 250 ]
      ],
      [
        [  w/2   , h/2   , 100 ],
        [  w/3*1   , h/2   , 300 ],
        [  w/3*2   , h/2   , 300 ]
      ],
      [
        [  w/2   , h/2   ,   200 ],
        [  w/3*1   , h/2   , 280 ],
        [  w/3*2   , h/2   , 280 ]
      ],
      [
        [  0  , 0  ,   0 ],
        [ 0   , 0   , 0 ],
        [  0   , 0   , 0 ]
      ],
      [
        [  w/2   , h*0.75   ,   250 ],
        [  w/3*1   , h*0.2   , 150 ],
        [  w/3*2   , h*0.2   , 150 ]
      ],
      [
        [  w/2   , h/2   ,   260 ],
        [  w/3*0.8   , h/2   , 260 ],
        [  w/3*2.2   , h/2   , 260 ]
      ],

    ]

    for(let i = 0; i< t.length; i++){
      let c1 = v(t[i][0][0], t[i][0][1], t[i][0][2]);
      let c2 = v(t[i][1][0], t[i][1][1], t[i][1][2]);
      let c3 = v(t[i][2][0], t[i][2][1], t[i][2][2]);

      triplets[i] = new CircleTriplet(c1, c2, c3);
    }


  }

  function draw() {
    clear();

    //grid.draw();

    for(let i = 0 ; i < triplets.length ; i++){
      grid.drawIn(triplets[i].animate.bind(triplets[i]), i);
    }

    // passing an object function inside a regular function using bind
    // >>> https://stackoverflow.com/questions/34505261/how-to-pass-objects-method-as-a-parameter-in-javascript
  }

  function drawSquare(){
    fill(255,0,0);
    square(width/2,height/2,width)
  }

  class CircleTriplet{
    constructor(c1, c2, c3){  // each c value contains x, y and radius
      this.c1 = c1;
      this.c2 = c2;
      this.c3 = c3;
      this.anim = 0;
    }

    draw(){

        circle(this.c1.x, this.c1.y, this.c1.z);
        circle(this.c2.x, this.c2.y, this.c2.z);
        circle(this.c3.x, this.c3.y, this.c3.z);


    }
    animate(otherX, otherY, otherR){

      this.anim += 0.001;
      let c1, c2, c3;

      if(this.anim < 1){ // first step
        let l2 = expInOut(this.anim);
        c1 = p5.Vector.lerp(this.c1, this.c2, l2);
        c2 = p5.Vector.lerp(this.c2, this.c3, l2);
        c3 = p5.Vector.lerp(this.c3, this.c1, l2);
      }
      else if( this.anim < 2){ // second step
        let l2 = expInOut(this.anim-1);
        c1 = p5.Vector.lerp(this.c2, this.c3, l2);
        c2 = p5.Vector.lerp(this.c3, this.c1, l2);
        c3 = p5.Vector.lerp(this.c1, this.c2, l2);
      }
      else{
        let l2 = expInOut(this.anim-2); // third step
        c1 = p5.Vector.lerp(this.c3, this.c1, l2);
        c2 = p5.Vector.lerp(this.c1, this.c2, l2);
        c3 = p5.Vector.lerp(this.c2, this.c3, l2);
      }
      if(this.anim >= 3){ this.anim = 0;}


      noFill();
      strokeWeight(8);

      stroke('#ffffffdd')

          if(this.c1.z > 0){
      //stroke(255,50,90); // red
      circle(c1.x,c1.y,c1.z);

      //stroke(255,220,100); // yellow
      circle(c2.x,c2.y,c2.z);

      //stroke(60,120,255); // blue
      circle(c3.x,c3.y,c3.z);
          }
    }
  }

  class Grid{
    constructor(n,m){
      this.n = n;
      this.m = m;
      this.size = width / n;
    }
    draw(){
      for(let i = 0; i < this.n; i++){
        for(let j = 0; j < this.m; j++){

          strokeWeight(1);
          stroke(0);
          square(i*(this.size)+this.size/2,j*(this.size)+this.size/2, this.size);

        }
      }
    }

    drawIn(drawThing, n=0,m=undefined){

      // choose if its either coord or index
      if(m === undefined){
        m = floor(n / this.n);
        n = floor(n % this.n);
      }

      push();

      // find the right block
      translate(n * this.size, m * this.size);
      scale(1/this.n);

      // add a padding of 0.8 (20%) (10% each side)            // DOESNT ACTUALLY WORK
      translate( 0.7/2 * this.size, 0.7/2 * this.size);
      scale(0.7);

      drawThing();
      pop();
    }
  }


  function expInOut(x) {
    if(x == 0.0 || x == 1.0) return x;

    	if(x < 0.5){
    		return(0.5 * pow(2, (20 * x) - 10));
    	}
    	else{
    		return(-0.5 * pow(2, (-20 * x) + 10) + 1);
    	}
    }
