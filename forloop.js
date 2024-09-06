let wX = windowWidth
let wY = windowHeight

function preload(){
	let pizza = loadImage('pizza.png');
}


function setup(){
	createCanvas(windowWidth, windowHeight);
	background('gray');
}


function draw(){
	for(let i = 0; i < 100; i++){
		fill('white');
		ellipse(random(windowWidth), random(windowHeight), 20, 20);
	}
		fill('orange');
		ellipse(mouseX, mouseY, 20, 20,);

	// 	for(let i = 0; i < wX/2; i ++){
	// 	line(0, 0, i, wY);
	// 	line(wX, 0, wX - i, wY);
	// }

}