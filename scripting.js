//constants + measurment variables
let ufoX = 200;
let ufoY = 50;
let speedY = 1;

//image elements
let ufo, movingUfo, bplanet, rplanet, planetA, planetB, panel, screen, loadingGif, startButton;

//sound elements
let pop;

//scene variables
let fadeOut;
let fadeLvlA = 255;
let fadeLvlB = 0;
let state = 'loadingScreen'


function preload(){
    loadingGif = loadImage('loading.gif');
    startButton = loadImage('start.png');

    ufo = loadImage('ufo.png');
    bplanet = loadImage('bplanet.png');
    rplanet = loadImage('rplanet.png');
    screen = loadImage('panel.PNG');

    pop = loadSound('pop.mp3');
    newJeans = loadSound('NewJeans.mp3')
}

function setup(){
    createCanvas(windowWidth, windowHeight);

    //change to play button after 6 seconds
    setTimeout(() => {
        state = 'playScreen'
    }, 9000);
}

function draw(){
    if(state == 'loadingScreen'){
    bootScreen();
    }
    else if(state == 'playScreen'){
        playScreen();
    }
    else if(state == 'mainScreen'){
        mainScene();
    }

}


function bootScreen(){
    rect(0, 0, windowWidth, windowHeight);
    fill('#290622');

    image(loadingGif, 425, 250, 700, 250)
}


function playScreen(){
    rect(0, 0, windowWidth, windowHeight);
    fill('#290622');

    if(fadeLvlA > 0){
        tint(255, fadeLvlA);
        image(loadingGif, 425, 250, 700, 250);
        fadeLvlA -= 5;
    }
    if(fadeLvlA <= 0 && fadeLvlB < 255){
        tint(255, fadeLvlB);
        image(startButton, 425, 200, 700, 300);
        fadeLvlB += 5;
    }

    if(fadeLvlB >= 255){
        noTint();
        image(startButton, 425, 200, 700, 300);
    }

    //hover effect for start button
    if(state == 'playScreen' && fadeLvlB >=255 && (mouseX > 425 && mouseX < 1125) && (mouseY > 200 && mouseY < 500)){
        image(startButton, 400, 175, 750, 350);
    }

}


function mainScene(){
    aniUfo();
    planetA = image(bplanet, 700, 50, 200, 200);
    planetB = image(rplanet, 1100, 200, 300, 300);
    hoverEffect();
    panel = image(screen, -250, windowHeight-250, windowWidth+600, 225);
}

function aniUfo(){
    clear();
    ufoY += speedY;
    movingUfo = image(ufo, ufoX, ufoY, 300, 250);

    if(ufoY == 50 || ufoY == 200){
        speedY *= -1;
    }
}

function hoverEffect(){
    //blue planet hover check
    if((mouseX >= 700 && mouseX <= 900)&&(mouseY >= 25 && mouseY <= 250)){
        image(bplanet, 675, 25, 250, 250);
    }

    //red planet hover check
    if((mouseX >= 1100 && mouseX <= 1450)&&(mouseY >= 200 && mouseY <= 550)){
        image(rplanet, 1075, 175, 350, 350);
    }
}

function mousePressed(){
    if(state == 'playScreen' && fadeLvlB >=255 && (mouseX > 425 && mouseX < 1125) && (mouseY > 200 && mouseY < 500)){
        state = "mainScreen";
    }
    newJeans.play();
}
