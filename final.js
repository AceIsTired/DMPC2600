// Standard & Data
let canvas, width, height, playerName, mClicks, tElapsed, tshow, browser, pictureID, osSystem, localTime;
let goHome, vyraJamTrig, shopModule, bazModule, bazVisited, holoTabTrig, coins;
let say, show, count, squareDiv, hoverDiv, coinbg;
let correctAnswers, currentQuestion, quizData = [], buttons = [], ques, end;

// Scene
let scene, sceneMade, mapTog, settingCog, hovering, currentIndex, strings, images = []

// BGs;
let cockpit, invBut, mapBut, shopbg, mapbg, inshopbg, bazlobbg, openbg
let bazPlan, module, jam, tab, holoTab, coinicon;
let openDiv, shopDiv, bazDiv, endDiv;

// Cutscenes
let cutscene1;

function preload(){
    for (let i = 1; i <= 24; i++) {
        images.push(loadImage(`data/${i}.PNG`));
    }

    //cutscene1 = createVideo("videos/Cutscene1.mp4");
    cockpit = loadImage("images/cockpit.gif");
    openbg = loadImage("images/openingbg.jpg")
    shopbg = loadImage("images/Vyra.png");
    mapbg = loadImage("images/space.gif");
    inshopbg = loadImage("images/shelf.png");
    bazlobbg = loadImage("images/bazaarLobby.png")
    bazPlan = loadImage("images/bplanet.png");
    tab = loadImage("images/tablet.gif");
    jam = loadImage("images/jam.png");
    coinicon = loadImage("images/coin.png");
    module = loadImage("images/module.png");
    settingCog = loadImage("images/settingsCog.png");
}

function setup(){
    canvas = createCanvas(innerWidth, innerHeight);
    canvas.style("z-index", '-10');
    frameRate(30);

    say = ''
    count = 0
    squareDiv = createDiv("").style("background-color", "white").style("position", "absolute").style("border", "5px solid").style("border-color", "black")
    .style("border-radius", "15px")
    show = createP("").style("font-size", "24px").style("color", "black").style("margin", "0").style('font-family', "NewHiScore").style("font-size", "25px")
    // .style("text-align", "center"); // Center align the text
    hoverDiv = createDiv("").style("background-color", "white").style("position", "absolute").style("border", "5px solid").style("border-color", "black")
    .style("border-radius", "15px").style("z-index", "8")
    coinbg = createDiv().style("font-family", "NewHiScore").style("font-size", "70px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px").style("text-align", "center").style("z-index", "0")

    ques = createDiv().style("font-family", "NewHiScore").style("font-size", "70px").style("color", "black")
        .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
        .style("text-align", "center").style("z-index", "0").position(600, 100);

    end = createDiv().style("font-family", "NewHiScore").style("font-size", "70px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
    .style("text-align", "center").style("z-index", "0").html("Quiz Complete!").position(600, 100);

    openDiv = createDiv().style("font-family", "NewHiScore").style("font-size", "70px").style("color", "black")
        .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
        .style("text-align", "center").style("z-index", "0").position(windowWidth/2, windowHeight/2);

    end.hide();
    openDiv.hide();
    
    strokeWeight(10);

    currentIndex = 0; // Tracks the current string in the array
    strings = ["Movement detected!", "Performing vitality scan....", ".", "..."]; // Array of strings

    
    quizData = [
        {
            question: "What game does Mari have the most hours in?",
            answers: ["BG3", "ADOFI", "The Sims 4", "Sun Haven"],
            correct: 1 // Index of the correct answer
        },
        {
            question: "What game does Mari have < 100 hours in?",
            answers: ["Dave the Diver", "Baldurs Gate 3", "Cyberpunk", "The Sims 4"],
            correct: 1
        },
        {
            question: "Which game in Mari's library a cooking game?",
            answers: ["Chef RPG", "Death Must Die", "The Fractured but Whole", "Risk of Rain 2"],
            correct: 1
        },
        {
            question: "What game is NOT in Mari's Library",
            answers: ["Persona 3: Reload", "Black Ops 3", "Tavern Master", "Papa's Pizzaria"],
            correct: 2
        },
        {
            question: "How many hours does Mari have in Papa's Frezzeria?",
            answers: ["100.4 hours", "14.1 hours", "67.6 hours", "23.8 hours"],
            correct: 3
        },
        {
            question: "When was the last time Mari played Cyberpunk?",
            answers: ["August 24th", "October 31st", "Today", "September 30th"],
            correct: 4
        },
        {
            question: "How many achievements does Mari have in FTL",
            answers: ["15", "51", "0", "26"],
            correct: 4
        },
    ];
    correctAnswers = 0;
    selectQuestion();


    hovering = false;
    goHome = false;
    vyraJamTrig = false;
    holoTabTrig = false;
    shopModule = false;
    bazVisited = false;
    bazModule = false;
    scene = "cockpit";

    tShow = 0;
    tElapsed = 0;
    mClicks = 0;
    playerName = "none"
    coins = 0;
    localTime = "none"
    
    // Cutscenes
    //cutscene1.position(0,0);
   // cutscene1.size(AUTO, AUTO)
    //cutscene1.pause();
    //cutscene1.hide();
    sceneMade = false;
}

function draw(){
    trackData()
    hovering = false;
    if(bazModule == true && shopModule == true){
        goHome = true;
    }

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
    else if(scene == "inventory"){
        drawInventory();
    }
    else if(scene == "shop"){
        drawShop();
    }
    else if(scene == "shopping"){
        shopping();
    }
    else if(scene == "bazaarLob"){
        bazaarLobby();
    }
    else if(scene == "bazaarGal"){
        bazaarGallery();
    }
    else if (scene = "quizzing"){
        quiz();
    }

}

// Dynamic Scenes

function drawSettings(){
    if(sceneMade == false){
        background("gray");
        rect(25, 25, windowWidth - 50, windowHeight - 50);

        let name = createDiv().html("-  " + playerName + "  -").style("font-family", "NewHiScore").style("font-size", "75px").position(windowWidth - (900 + playerName.length), 50).style("color", "black")
        let vol = createDiv().html("Volume").style("font-family", "NewHiScore").style("font-size", "40px").position(75, 200).style("color", "black").style("background-color", "white")
        .style("border", "5px solid").size(500, 300).style("border-radius", "15px").style("text-align", "center").style("padding", "3px")

        let finishBut = makeButton("Finish Game", windowWidth - 300, windowHeight - 150, 250, 100, () => {
            finishBut.remove();
            exitBut.remove();
            gameEndValSet();
            sceneChange("cockpit");
        });

        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            exitBut.remove();
            finishBut.remove();
            vol.hide()
            name.hide()
            sceneChange("cockpit");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("background-color", "red");
        exitBut.style("z-style", "5");

        sceneMade = true;
    }
    
    fill("black")
    fill("white")
}

function drawSpaceMap(){
    if(sceneMade == false){
        background("#1a0318");
        let exitBut;

        let baz = makeButton("Bazaar", windowWidth - 400, 75, 350, 150, () => {
            exitBut.remove();
            baz.remove();
            shop.remove();
            sceneChange("bazaarLob");
        });

        let shop = makeButton("Shop", windowWidth - 400, 525, 350, 150, () => {
            exitBut.remove();
            baz.remove();
            shop.remove();
            sceneChange("shop");
        });

        exitBut = makeButton("X", 50, 50, 100, 100, () => {
            exitBut.remove();
            baz.remove();
            shop.remove();
            sceneChange("cockpit");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("background-color", "red");
        exitBut.style("z-style", "5");


        fill("red");
        ellipse(600, 500, 200);
        
        fill("white")
        sceneMade = true;
    }

    rect(25, 25, windowWidth - 50, windowHeight - 50);
    image(mapbg, 25, 25, 1100, 710);
    fill("#1a0318")
    rect(windowWidth - 425, 25, 400, windowHeight - 50);

    let blue = image(bazPlan, 300, 100, 200, 200);

        if((mouseX < windowWidth - 50 && mouseX > windowWidth - 400) && (mouseY > 525 && mouseY < 675)){
            blue = image(bazPlan, 275, 75, 250, 250)
        }

    fill("red");
    ellipse(600, 500, 200);
        
    fill("white")

}

function drawInventory(){
    if(sceneMade == false){
        background("orange");
        rect(25, 25, windowWidth - 50, windowHeight - 50);

        // Jam Item
        if(vyraJamTrig == true){
            fill("purple");
            ellipse(450, 250, 300);
        }

        //HoloTab
        if(holoTabTrig == true){
            fill("gray")
            rect(200, 550, 600, 100);
        }

        //Modules
        fill("yellow");
        rect(925, 300, 150, 150);

        if(shopModule == true){
            fill("pink");
            rect(1075, 300, 150, 150);
        }

        if(bazModule == true){
            fill("blue");
            rect(1000, 150, 150, 150);
        }


        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            exitBut.remove();
            sceneChange("cockpit");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("background-color", "red");
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

function quiz(){
    background(220);
    if(sceneMade == false){
        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            exitBut.hide();
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].hide();
                ques.hide();
                end.hide();
            }
            sceneChange("bazaarLob");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("background-color", "red")
        exitBut.style("z-style", "5");
        sceneMade = true;
    }
    if (currentQuestion) {
        ques.show();
        ques.html(currentQuestion.question);

        // Display the answer buttons
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].position(200 + i * 300, 500);
            buttons[i].show();
        }
    } else {
        // Display a message if no questions are left
        ques.hide()
        end.show();
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].hide();
        }

        bazModule = true;
    }
}

function checkAnswer(index) {
    if (index === currentQuestion.correct) {
        alert("Correct!");
        correctAnswers += 1
        coins += 1

        // Remove the question from the array
        let questionIndex = quizData.indexOf(currentQuestion);
        if (questionIndex !== -1) {
            quizData.splice(questionIndex, 1);
        }
    } else {
        alert("Wrong!");
    }

    selectQuestion(); // Load the next question
}

function selectQuestion() {
    if (quizData.length === 0) {
        currentQuestion = null; // No questions left
        return;
    }

    // Randomly select a question
    currentQuestion = random(quizData);

    // Clear previous buttons
    for (let btn of buttons) {
        btn.remove();
    }
    buttons = [];

    // Create buttons for each answer
    for (let i = 0; i < currentQuestion.answers.length; i++) {
        let btn = makeButton(currentQuestion.answers[i]);
        btn.mousePressed(() => checkAnswer(i)); // Check the selected answer
        buttons.push(btn);
    }
}



// Game Scenes

function openingScene(){
    if(sceneMade == false){
    
        fill("white")
        rect(windowWidth/2, windowHeight/2, windowWidth - 100, windowHeight - 100);

        text()

        sceneMade = true;
    }

    
}

function introCutscene(){
    //if(sceneMade == false){
        //cutscene1.show();
        //cutscene1.play();
        //cutscene1.loop = true;
        //let but = makeButton("Next", 1000, 250, 200, 100, () => {
            //but.hide();
            //sceneChange("exitCutscene1")});
        //sceneMade = true;
   // }
    //else{

    //}
    
}

function cockpitMain(){
    if(sceneMade == false){

        invBut = makeButton("Inventory", 350, 15, 200, 90, () => {
            mapBut.remove();
            invBut.remove();
            coinbg.hide();
            sceneChange("inventory")}, "yellow");

        mapBut = makeButton("Map", 50, 10, 250, 100, () => {
            mapBut.remove();
            invBut.remove();
            coinbg.hide()
            sceneChange("map")}, "#c5cf95");

        if(goHome == true){
            let goHomeBut = makeButton("Go Home", windowWidth - 250, windowHeight - 200, 200, 100, () => {
                invBut.remove();
                mapBut.remove();
                coinbg.hide()
                goHomeBut.remove();

                // if(musicVar.isPlaying() == true){
                //     musicVar.stop();
                // }

                sceneChange("ending");});
            }

        sceneMade = true;
    }


    // Cockpit BG
    image(cockpit, 0, 0, windowWidth, windowHeight);

    // Top panel
    fill("#4d2102");
    rect(0, 0, windowWidth, 125);
    
    fill("black")
    coinbg.html(coins).position(windowWidth - 275, 25).size(100, 70);
    coinbg.show();
    image(coinicon, windowWidth - 375, 15, 100, 100)
    fill("white")

    let cog = image(settingCog, windowWidth - 120, 25, 75, 75);
    if((mouseX > windowWidth - 120 && mouseX < windowWidth - 45) && (mouseY > 10 && mouseY < 85)){
        toolHover("Settings");
        if(mouseIsPressed == true){
            invBut.remove();
            mapBut.remove()
            coinbg.hide()
            hoverDiv.hide()
            sceneChange("settings");
        }
    }else{
        hoverDiv.hide();
    }
    
}

function endingSequence(){
    background("pink");
    textSize(100);
    speak("The End!")
}

function drawShop(){
    if(sceneMade == false){
        background("purple");

        fill("white");
        rect(25, 25, windowWidth - 50, windowHeight - 50);
        

        image(shopbg, 30, 35, 1090, 690);

        // fill("gray")
        // rect(25, 750, windowWidth - 50, windowHeight - 400);

        fill("#1a0e2e")
        rect(windowWidth - 425, 25, 400, windowHeight - 50);

        let talk = makeButton("Shop", windowWidth - 400, 75, 350, 150, () => {
            exitBut.remove();
            talk.remove();
            shop.remove();
            sceneChange("shopping");
        }, "#4f81ab");
        let shop = makeButton("Talk", windowWidth - 400, 300, 350, 150, () => {}, "#c790e0");
        let exitBut = makeButton("Leave", windowWidth - 400, 525, 350, 150, () => {
            exitBut.remove();
            talk.remove();
            shop.remove();
            sceneChange("map");
        }, "#ed4545");
        fill("white")

        sceneMade = true;
    }
}

function shopping(){
    if(sceneMade == false){
        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            exitBut.remove();
            coinbg.hide();
            sceneChange("shop");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("background-color", "red")
        exitBut.style("z-style", "5");

        sceneMade = true;
    }

    background("#78513a");
    rect(25, 25, windowWidth - 50, windowHeight - 50);
    shelf = image(inshopbg, 25, 25, windowWidth - 50, windowHeight - 50)

    if(vyraJamTrig == false){
        ellipse(413, 225, 200, 50)
        image(jam, 300, 25, 225, 225)
    }
    
    if(shopModule == false){
        ellipse(773, 485, 200, 50)
        image(module, 550, 100, 450, 450)
    }

    if(holoTabTrig == false){
        rect(550, windowHeight - 200, 700, 150);
    }

    if((shopModule == false)&&((mouseX > 650 && mouseX < 900) && (mouseY > 100 && mouseY < 550))){
        image(module, 525, 70, 500, 500)
            toolHover("Location Module Part $4", 150, 75)
            if(mouseIsPressed == true && coins >= 4){
                shopModule = true;
                coins -= 4
                hoverDiv.hide();
            }
    }
    else if((vyraJamTrig == false)&&(mouseX > 325 && mouseX < 500) && (mouseY > 25 && mouseY < 250)){
        image(jam, 290, 15, 250, 250)
            toolHover("Vyra's Jam $2")
            hoverDiv.show()
            if(mouseIsPressed == true && coins >= 2){
                vyraJamTrig = true;
                coins -= 2
                hoverDiv.hide();
            }
    }
    else{
        hoverDiv.hide();
    }

    fill("black")
    coinbg.html(coins).position(windowWidth - 150, 40).size(100, 70);
    coinbg.show();
    image(coinicon, windowWidth - 250, 30, 100, 100)

}

function bazaarLobby(){
    if(sceneMade == false){
        background("#67f5e7")
        rect(25, 25, windowWidth - 50, windowHeight - 50);
        fill("white")

        let quizBut = makeButton("Take the quiz!", windowWidth - 1300, windowHeight - 250, 300, 150, () => {
            exitBut.remove()
            quizBut.remove()
            galBut.remove()
            sceneChange("quizzing");
        })

        let galBut = makeButton("View Data Gallery", windowWidth - 500, windowHeight - 250, 300, 150, () => {
            exitBut.remove()
            quizBut.remove()
            galBut.remove()
            sceneChange("bazaarGal");
        })

        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            exitBut.remove();
            quizBut.remove();
            galBut.remove();
            sceneChange("map");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("background-color", "red");
        exitBut.style("z-style", "5");

        
        



        // Play cutscene if first time visiting.
        if(bazVisited == false){

            bazVisited = true;
        }
        sceneMade = true;
    }

    background("black")
        rect(25, 25, windowWidth - 50, windowHeight - 50);
        image(bazlobbg, 25, 25, windowWidth - 50, windowHeight - 50);

        let holo = image(tab, windowWidth - 650, windowHeight - 700, 700, 450);

        fill("black")

        fill("white")
    
}

function bazaarGallery(){
    if(sceneMade == false){
        background("black");
        rect(25, 25, windowWidth - 50, windowHeight - 50);

        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            exitBut.remove();
            sceneChange("bazaarLob");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("background-color", "red");
        exitBut.style("z-style", "5");

        sceneMade = true
    }
    



}



// Helper functions

function makeButton(label, x, y, w, h, action = () => {}, bcolor = "white",) {
    const button = createButton(label);
    button.style("font-family", "NewHiScore");
    button.style("border", "5px solid");
    button.style("text-align", "center")
    button.style("font-size", "40px")
    button.style("box-shadow", "0 5px #999")
    button.style("border-radius", "10px")
    button.style("cursor", "pointer");
    button.style("background-color", bcolor);
    button.position(x, y);
    button.size(w, h);
    button.mouseReleased(action);
    return button;
}

function speak(text, x = 0, y = 100, width = 300, height = 100, speed= 3) {
    show.show()
    squareDiv.show()
    // Position and size the square
    squareDiv.position(x, y)
        .style("width", `${width}px`)
        .style("height", `${height}px`);
    
    // Center the text within the square
    show.position(x + 10, y + 10) // Adjust for vertical centering
        .style("width", `${width}px`);
    
    // Update text incrementally
    if (count < text.length && frameCount % speed === 0) {
        say += text[count];
        count++;
        show.html(say);
    }

    // Handle mouse press to toggle text
    if (mouseIsPressed) {
        if (say !== text) {
            say = text;
            count = text.length;
            show.html(say);
        } else {
            say = "";
            count = 0;
            show.html("");
            show.hide();
            squareDiv.hide();
        }
    }
}

function speaking(textArray, x = 0, y = 100, width = 300, height = 100, speed = 3) {
    let pressed = false;
    show.show();
    squareDiv.show();

    // Position and size the square
    squareDiv.position(x, y)
        .style("width", `${width}px`)
        .style("height", `${height}px`);

    // Center the text within the square
    show.position(x + 10, y + 10) // Adjust for vertical centering
        .style("width", `${width}px`);

    // Access the current string in the array
    let text = textArray[currentIndex];

    // Update text incrementally
    if (count < text.length && frameCount % speed === 0) {
        say += text[count];
        count++;
        show.html(say);
    }

    // Handle mouse press to iterate through the array
    if (mouseIsPressed && pressed == false) {
        pressed = true;
        if (say !== text) {
            say = text; // Complete the text if partially displayed
            count = text.length;
            show.html(say);
        } else {
            // Move to the next string in the array
            currentIndex = (currentIndex + 1) % textArray.length; // Loop back to start if at the end
            say = ""; // Reset displayed text
            count = 0;
            show.html(say);
        }
    }
    pressed = false
}

function sceneChange(newscene){
    if(newscene == "exitCutscene1"){
        //cutscene1.pause();
        //cutscene1.hide();
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
    else if(newscene == "inventory"){
        scene = "inventory"
    }
    else if(newscene == "shop"){
        scene = "shop"
    }
    else if(newscene == "shopping"){
        scene = "shopping"
    }
    else if(newscene == "bazaarLob"){
        scene = "bazaarLob"
    }
    else if(newscene == "bazaarGal"){
        scene = "bazaarGal"
    }
    else if (newscene == "quizzing"){
        scene = "quizzing"
    }

    sceneMade = false;
}

function toolHover(tip = "text here. super long text test", w = 150, h = 50, hcentered = true, vcentered = true){
    hovering = true;

    if(hovering == true){
        hoverDiv.show();
    hoverDiv.html(tip)
    hoverDiv.style("font-family", "NewHiScore")
    hoverDiv.style("padding", "5px")
    hoverDiv.style("color", "black")
    hoverDiv.style("font-size", "25px")
    hoverDiv.size(w, h)
    hoverDiv.position(mouseX - (w + 50), mouseY);

    // if(hcentered == true){
    //     hoverDiv.style("text-align","center")
    // }else{
    
    // }
    }else{
        hoverDiv.hide();
    }
    
    
}



// Data Functions
function trackData(){
    osSystem = navigator.platform;
    // tElapsed = 
    browser = detectBrowser();
    localTime = makeClock();
    tElapsed += 1  
}

function detectBrowser() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edg") > -1) {
        return "Microsoft Edge";
    } else if (userAgent.indexOf("Opera") > -1) {
        return "Opera";    
    } else if (userAgent.indexOf("OPR") > -1) {
        return "Opera GX";
    } else if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    } else if (userAgent.indexOf("Firefox") > -1) {
        return "Firefox";
    } else if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } else if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
        return "Internet Explorer";
    }

    return "Unknown";
}

function makeClock(){
    let time;
    if(hour() > 12){
        time = (hour() - 12) + ":"
    }else{
        time = hour() + ":"
    }
    if(minute() < 10){
        time += "0" + minute()
    }else{
        time += minute();
    }
    if(hour() >= 12){
        time += " PM"
    }else{
        time += " AM"
    }

    return time;
}



// Integrated functions
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    if(scene == "intro"){
        //cutscene1.resize(AUTO, AUTO)
    }
}

function mousePressed(){
    
}

function mouseClicked(){
    if(scene != "ending"){
        mClicks += 1
    }

    if(scene == "bazaarGal"){
        let imgIndex = floor(random(0, images.length)); // Random index between 0 and 7
        let x = random(0, windowWidth - 250); // Random x position within canvas
        let y = random(0, windowHeight - 100); // Random y position within canvas
        image(images[imgIndex], x, y, 650, 350); // Draw the random image
    }
}

function keyPressed(){
    if(key === LEFT_MOUSE){
        mClicks += 1
    }
}
