let x = 200;


function preload(){
furby = loadImage('furby.png');
pizza = loadImage('pizza.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  print(mouseX, mouseY);
  
  circle(mouseX, mouseY, 100);

  image(pizza, windowWidth/2, windowHeight/2);
  fill('white')
  rect(100, 250, 300, 75,);
  
  fill(201, 26, 10)
  quad(100,250, 400, 250, 325, 45, 30, 50);
  
  fill('red');
  quad(0,240, 0, 300, 100, 325, 100, 250);
  
  fill('red');
  triangle(27, 105, 30, 50, 70, 165);
 
  fill(237, 194, 164);
  arc(215, 150, 165, 130, 0, PI + HALF_PI);
  fill('yellow')
  arc(215, 150, 135, 100, 0, PI + HALF_PI);
  
  fill('darkgray')
  triangle(0, 240, 95, 235, 100, 250)
  
  fill('red')
  circle(200, 120, 15)
  circle(220, 190, 13)
  circle(225, 165, 13)
  circle(175, 135, 17)
  circle(180, 165, 16)
  circle(250, 164, 15)
}

function keyPressed(){
     if (key == 'b'){
   background(random(255), random(255), random(255));
  }
}