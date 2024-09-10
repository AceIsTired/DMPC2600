let rectBool = false;
let ellBool = false;

function setup(){
	createCanvas(windowWidth, windowHeight);
}


function draw(){
	if (ellBool == true){
		ellipseBrush();
	}

	if (rectBool == true){
		rectBrush();
	}
}

function keyPressed(){
	if (key == 'e'){
		ellBool = true;
		rectBool = false;
	}

	if (key == 'r'){
		rectBool = true;
		ellBool = false;
	}

	if (key == 't'){
		rectBool = false;
		ellBool = false;
	}
}




//Brushes
function ellipseBrush() {
	fill(random(255), random(255), random(255));
	ellipse(mouseX, mouseY, 20, 20);
}

function rectBrush(){
	fill(random(255), random(255), random(255));
	rect(mouseX, mouseY, 40, 20);
}

