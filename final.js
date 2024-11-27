// Standard & Data
let canvas, width, height, playerName, mClicks, tElapsed, browser, pictureID, osSystem, localTime;
let goHome, vyraJamTrig, shopModule, bazModule, bazVisited, holoTabTrig;

// Scene
let scene, sceneMade, mapTog, fadingIn, fadingOut, faded, fadeSqu, aVal;

// Cockpit;
let cockpit

// Cutscenes
let cutscene1;

function preload(){
    cutscene1 = createVideo("videos/Cutscene1.mp4");
    cockpit = loadImage("images/cockpit.gif");
}

function setup(){
    canvas = createCanvas(innerWidth, innerHeight);
    canvas.style("z-index", '-10');
    goHome = false;
    scene = "cockpit";
    mClicks = 0;
    playerName = "Mari"
    
    // Cutscenes
    cutscene1.position(0,0);
    cutscene1.size(AUTO, AUTO)
    cutscene1.pause();
    cutscene1.hide();
    sceneMade = false;
}

function draw(){
    trackData()

    if(scene == "opening"){
        openingScene();
    }
    else if(scene == "intro"){
        introCutscene();
    }
    else if(scene == "cockpit"){
        cockpitMain()
    }
    else if(scene == "map"){
        drawSpaceMap();
    }
    else if(scene == "settings"){
        drawSettings();
    }
    else if(scene == "ending"){
        endingSequence();
    }

}

// Dynamic Scenes

function drawSettings(){
    if(sceneMade == false){
        background("yellow");
        rect(25, 25, windowWidth - 50, windowHeight - 50);

        let finishBut = makeButton("Finish Game (For class purposes)", windowWidth - 300, windowHeight - 150, 250, 100, () => {
            finishBut.remove();
            exitBut.remove();
            gameEndValSet();
            sceneChange("cockpit");
        });

        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            exitBut.remove();
            finishBut.remove();
            sceneChange("cockpit");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("z-style", "5");

        sceneMade = true;
    }
    text("Name: " + playerName, 100, 100)
}

function drawSpaceMap(){
    if(sceneMade == false){
        background("brown");
        rect(25, 25, windowWidth - 50, windowHeight - 50);
        rect(windowWidth - 425, 25, 400, windowHeight - 50)

        let plan1 = makeButton("Planet 1", windowWidth - 400, 75, 350, 150)
        let plan2 = makeButton("Planet 2", windowWidth - 400, 300, 350, 150)
        let shop = makeButton("Shop", windowWidth - 400, 525, 350, 150)

        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            exitBut.remove();
            plan1.remove();
            plan2.remove();
            shop.remove();
            sceneChange("cockpit");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("z-style", "5");

        

        sceneMade = true;
    }
}

function gameEndValSet(){
    goHome = true;
    shopModule = true;
    bazModule = true;
    vyraJamTrig = true;
    holoTabTrig = true;
    bazVisited = true;
}



// Game Scenes

function openingScene(){
    if(sceneMade == false){
        fadeOut();
        background('#393257');


        sceneMade = true;
    }
}

function introCutscene(){
    if(sceneMade == false){
        cutscene1.show();
        cutscene1.play();
        cutscene1.loop = true;
        let but = makeButton("Next", 1000, 250, 200, 100, () => {
            but.hide();
            sceneChange("exitCutscene1")});
        sceneMade = true;
    }
    else{

    }
    
}

function cockpitMain(){
    if(sceneMade == false){
        let invOpen = false;

        let invBut = makeButton("Inventory", 350, 10, 250, 100, () => {
            if(invOpen == false){

            }
        });


        let mapBut = makeButton("Map", 50, 10, 250, 100, () => {
            mapBut.remove();
            invBut.remove();
            settingsBut.remove();
            sceneChange("map")});

        let settingsBut = makeButton("Settings", windowWidth - 150, 10, 100, 100, () => {
            settingsBut.remove();
            mapBut.remove();
            invBut.remove();
            sceneChange("settings");
        });
        settingsBut.style("border-radius", "50%");
        
        if(goHome == true){
            let goHomeBut = makeButton("Go Home", windowWidth - 250, windowHeight - 1200, 200, 100, () => {
                invBut.remove();
                mapBut.remove();
                settingsBut.remove();
                goHomeBut.remove();

                // if(musicVar.isPlaying() == true){
                //     musicVar.stop();
                // }

                sceneChange("ending");
        });
        }
        


        sceneMade = true;
    }
    image(cockpit, 0, 0, windowWidth, windowHeight);

    // Top panel
    rect(0, 0, windowWidth, 125);
    fill("white");
}

function endingSequence(){
    background("pink")
}

// Scene functions



// Helper functions

function trackData(){
    

    // if()
}

function makeButton(label, x, y, w, h, action = () => {}) {
    const button = createButton(label);
    button.style("z-index", "5");
    button.position(x, y);
    button.size(w, h);
    button.mousePressed(action);
    return button;
    // button.mouseOver();
}

function sceneChange(newscene){
    if(newscene == "exitCutscene1"){
        cutscene1.pause();
        cutscene1.hide();
        scene = 'cockpit'
    }
    else if(newscene == "cockpit"){
        scene = "cockpit";
    }
    else if(newscene == 'map'){
        scene = "map";
    }
    else if(newscene == "settings"){
        scene = "settings"
    }
    else if(newscene == "ending"){
        scene = "ending"
    }

    sceneMade = false;
}

function speak(str, x = 0, y = 100, fontSize = 100, speed = 3) {
    // fill("black");   // Text color
    speed = 3; // Text speed, higher = slower

    // If text is centered, uncomment
    x = (width - textWidth(str))/2;
    
    if (count < str.length && frameCount % speed == 0) { // Iterated through string and adds to say
        say += str[count];
        count++;
    }

    if(mouseIsPressed == true){
        if(say != str){ // Displays full text on left mouse click
        count = str.length;
        say = str;
        }
        else if(say == str){ // If all text is displayed and mouse is clicked, get rid of text
            say = "";
            count = 0;
            speakVariable = ""
            show.hide();
        }
    }
}

function fadeOut(speed){
    fadingOut = true;
    sVal = speed;
}

// Integrated functions

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(scene == "intro"){
        cutscene1.resize(AUTO, AUTO)
    }
}

function mousePressed(){
    mClicks += 1

}