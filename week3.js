let dayt = true;
let afte = false;
let nightt = false;

function preload(){
	dayimage = loadImage('day.gif');
	aft = loadImage('afternoon.gif');
	nightImage = loadImage('night.gif');
}


function setup(){
	createCanvas(windowWidth, windowHeight);
	background('gray');
	imageMode(CENTER)
}

function draw(){

	if (dayt == true){
		morn();
	}

	if (afte == true){
		noon();
	}

	if (nightt == true){
		night();
	}
}

function keyPressed(){
	if (key == 'd'){
		dayt = true;
		afte = false;
		nightt = false;
	}

	if (key == 'a'){
		dayt = false;
		afte = true;
		nightt = false;
	}

	if (key == 'n'){
		dayt = false;
		afte = false;
		nightt = true;
	}
}

function morn(){
	image(dayimage, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
}

function noon(){
	image(aft, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
}

function night(){
	image(nightImage, windowWidth/2, windowHeight/2, windowWidth, windowHeight);
}


