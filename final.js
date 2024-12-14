// Standard & Data
let canvas, width, height, playerName, mClicks, tElapsed, tshow, browser, pictureID, osSystem, localTime;
let goHome, vyraJamTrig, shopModule, shopVisited, bazModule, bazVisited, holoTabTrig, coins;
let say, show, count, squareDiv, hoverDiv, coinbg;
let correctAnswers, currentQuestion, quizData = [], buttons = [], ques, end, vyraLines = [];
let popSound, currentsong, right, wrong, shopBell, shopMusic, blip, bazaarMusic, cockpitMusic, buySound, buttonSound, startMusic, endMusic

// Scene
let scene, musicPlaying, sceneMade, mapTog, settingCog, hovering, currentIndex, strings, images = [], achievements

// BGs;
let cockpit, invBut, mapBut, shopbg, mapbg, inshopbg, bazlobbg, openbg, quizbg
let ship, shopPlan, bazPlan, module, jam, tab, quizpic, holoTab, coinicon, anim, animS;
let openDiv, shopDiv, bazDiv, endDiv, endingDiv, idDiv, timeDiv;

// Cutscenes
let cutscene1;

function preload(){
    for (let i = 1; i <= 24; i++) {
        images.push(loadImage(`data/${i}.PNG`));
    }

    // Images
    cockpit = loadImage("images/cockpit.gif");
    openbg = loadImage("images/openingbg.jpg")
    shopbg = loadImage("images/Vyra.png");
    mapbg = loadImage("images/space.gif");
    inshopbg = loadImage("images/shelf.png");
    bazlobbg = loadImage("images/bazaarLobby.png");
    ship = loadImage("images/ship.png")
    shopPlan = loadImage("images/bplanet.png");
    bazPlan = loadImage("images/rplanet.png");
    tab = loadImage("images/tablet.gif");
    quizpic = loadImage("images/quiz.png")
    jam = loadImage("images/jam.png");
    coinicon = loadImage("images/coin.png");
    module = loadImage("images/module.png");
    settingCog = loadImage("images/settingsCog.png");
    quizbg = loadImage("images/terminal.gif");

    // Sounds
    popSound = loadSound("music/pop.mp3");
    blip = loadSound("music/blip.wav");
    right = loadSound("music/questionCorrect.mp3")
    wrong = loadSound("music/wrongAnswer.wav")
    shopMusic = loadSound("music/ShopMusic.mp3");
    bazaarMusic = loadSound("music/bazaarMusic.mp3");
    shopBell = loadSound("music/ShopBell.mp3")
    cockpitMusic = loadSound("music/cockpitMusic.mp3");
    buySound = loadSound("music/bought.wav");
    buttonSound = loadSound("music/buttonClick.wav");
    startMusic = loadSound("music/startMusic.mp3");
    endMusic = loadSound("music/endingMusic.mp3");
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
    
    hoverDiv = createDiv("").style("background-color", "white").style("position", "absolute").style("border", "5px solid").style("border-color", "black")
    .style("border-radius", "15px").style("z-index", "8")

    coinbg = createDiv().style("font-family", "NewHiScore").style("font-size", "70px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px").style("text-align", "center").style("z-index", "0")

    timeDiv = createDiv().style("font-family", "NewHiScore").style("font-size", "55px").style("color", "black").position(windowWidth/2 + 200, 25)
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px").style("text-align", "center").style("z-index", "0")
    .size(250, 70).style("line-height", "70px")

    ques = createDiv().style("font-family", "NewHiScore").style("font-size", "70px").style("color", "black")
    .style("background-color", "white").position(windowWidth/2 - 500, 100).style("border", "5px solid").style("border-radius", "10px")
    .style("text-align", "center").style("z-index", "0").size(1000, 150);

    end = createDiv().style("font-family", "NewHiScore").style("font-size", "70px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
    .style("text-align", "center").style("z-index", "0").html("Data organized.").position(windowWidth/2 - 375, windowHeight/2 - 100)
    .size(700, 150).style("line-height", "140px");

    bazDiv = createDiv().style("font-family", "NewHiScore").style("font-size", "40px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
    .style("text-align", "center").style("z-index", "0")
    .html("\"Well what do we have here? You're a ways from home, aren't ya? How do I know? I know everything that happens in this sector of the cosmos! The name's Mari and all you need to know is that *I'M* your ticket out of here. Tell you what; I've got some data that needs organizing and *YOU'VE* got nothing better to do. If you organize enough of my data, I'll throw you a bone and give you a piece of your precious module back. I'll even sweeten the deal and pay you $1 for each data byte you sort correctly. So, do we have ourselves a deal?\"")
    .position(windowWidth/2 - 500, windowHeight/2 - 400)
    .size(1000, 800).style("line-height", "70px").style("padding-right", "20px").style("padding-left", "20px");

    shopDiv = createDiv().style("font-family", "NewHiScore").style("font-size", "55px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
    .style("text-align", "center").style("z-index", "0")
    .html("\"Welcome to the Andromeda branch of the DM93 Convenience R&R Shop: You're friendly galaxy pit stop. What, that data do-dad on the shelf? Yeah, that's new stock we just got in. .....   Ohhhh, that's YOUR data module? Hm.... Sorry bun, but space junk is space junk out here. I can, however, give you a discount on it.\"")
    .position(windowWidth/2 - 500, windowHeight/2 - 325)
    .size(1000, 650).style("line-height", "70px").style("padding-right", "20px").style("padding-left", "20px");

    vtalkDiv = createDiv().style("font-family", "NewHiScore").style("font-size", "45px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
    .style("z-index", "0")
    .html("\"Ohhhh, that's YOUR data module? Hm.... Sorry bun, but space junk is space junk out here. I can, however, give you a discount on it.\"")
    .position(windowWidth/2 - 875, windowHeight/2 + 225)
    .size(1300, 200).style("line-height", "60px").style("padding-right", "20px").style("padding-left", "20px");

    openDiv = createDiv().style("font-family", "NewHiScore").style("font-size", "25px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
    .style("z-index", "0").position(windowWidth/2 - 425, windowHeight/2 - 400)
    .html("> Movement detected!<br/> > Performing vitality scan....<br/> > Pilot vitals detected!<br/> > Pilot vitals stable!<br/> > Vitals Scan Results:<br/> > *$SN@QA/+E_: UNAVAILABLE<br/> > %AND&^#(@)J: > UNAVAILABLE<br/> > #@!DNI&A^NV: UNAVAILABLE<br/> > Performing location scan....<br/> ...<br/> .....<br/> .......<br/> > Location Scan Results Unavailable Data Modules A and C Unavailable<br/> > Please have maintainece personel check your vessel and try again.<br/> > To start the ship, please enter your identification credentials:")
    .size(850, 550).style("line-height", "35px").style("padding-right", "20px").style("padding-left", "20px").style("padding-top", "10px").style("padding-bottom", "10px")

    endingDiv = createDiv().style("font-family", "NewHiScore").style("font-size", "30px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
    .style("z-index", "0").position(100, windowHeight/2 - 275)
    .html("Placing the final data module back in place, the *Stellar Vortex* system installed in the vessel whirred back to life. The lights flickered on, and the hum of the engines filled the cabin. You in the background, you hear the robotic voice of your ship's AI beginning to chart courses back to your home system.<br>  With the ship's navigation restored, it only took minutes before you were on your way. The vessel lifted smoothly off the planet's surface, cutting through the atmosphere and into the vast expanse of stars. Finally, you're heading home.<br/> A low buzz rang thoughout the ship, corospondence from your home station.<br/><br/> *bzzzt* \"Cadet " + playerName + ", do you copy?\"")
    .size(850, 550).style("line-height", "35px").style("padding-right", "20px").style("padding-left", "20px").style("padding-top", "10px").style("padding-bottom", "30px");

    endingDiv.hide();
    end.hide();
    openDiv.hide();
    ques.hide();
    bazDiv.hide();
    shopDiv.hide();
    vtalkDiv.hide();
    timeDiv.hide();
    
    strokeWeight(10);

    animS = .25;
    anim = 0;
    currentIndex = 0; // Tracks the current string in the array


    vyraLines = [
        "\"You should try that jam on the shelf; best homemade spread in the system. Promise.\"",
        "\"Am I a bunny??? Jeez, you can tell you're not from around here, bun. You NEVER ask that... like ever.\"",
        "\"Feel free to browse our \"vaaassttt\" offerings.\"",
        "The storekeeper lazily picks at her claws, offering an occasional yawn to accompany her apparent boredom.",
        "\"Coins only, sorry the machine is down. Told Gizelle to fix it a while ago, never did.\"",
        "\"Want my advice? Stick to the left side of the shop. Right side's cursed. Long story.\"",
        "\"Oh, you're looking for fuel? Sorry, sold the last batch to a guy in a rush. Seemed real… fiery.\"",
        "The bunny flicks an ear toward the shelf. \"Careful, that one bites. Well, metaphorically. I think.\"",
        "\"You break it, you buy it. And no, I don't accept apologies as payment.\"",
        "The shopkeeper chuckles, \"Oh, that crystal? Yeah, it glows in the dark… but also attracts space moths. Your call.\"",
        "\"If it smells like it's burning, it's either defective or it's on sale. Take your pick.\"",
        "\"Listen, bun, I don't set the prices. I just make them up as I go.\""
    ]

    quizData = [
        {
            question: "What game does Mari have the most hours in?",
            answers: ["BG3", "ADOFI", "The Sims 4", "Sun Haven"],
            correct: 1 // Index of the correct answer
        },
        {
            question: "What game does Mari have less than 100 hours in?",
            answers: ["Dave the Diver", "Baldurs Gate 3", "Cyberpunk", "The Sims 4"],
            correct: 1
        },
        {
            question: "Which game in Mari's library a cooking game?",
            answers: ["Chef RPG", "Death Must Die", "The Sims 4", "Risk of Rain 2"],
            correct: 1
        },
        {
            question: "What game is NOT in Mari's Library?",
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
            answers: ["August 24th", "October 31st", "January 2nd", "September 30th"],
            correct: 4
        },
        {
            question: "How many achievements does Mari have in FTL: Faster Than Light?",
            answers: ["15", "51", "0", "26"],
            correct: 4
        },
    ];
    correctAnswers = 0;
    selectQuestion();
    achievements = 0

    musicPlaying = false;
    hovering = false;
    goHome = false;
    vyraJamTrig = false;
    holoTabTrig = false;
    shopVisited = false;
    shopModule = false;
    bazVisited = false;
    bazModule = false;
    scene = "opening";

    tShow = 0;
    tElapsed = 0;
    mClicks = 0;
    playerName = "none"
    coins = 0;
    localTime = "none"
    
    // Cutscenes

    sceneMade = false;
}

function draw(){
    musicPlayer();
    trackData()
    strokeWeight(10)
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
        background("#330632");
        let exitBut;

        let baz = makeButton("Bazaar", windowWidth - 400, windowHeight/2 - 250, 350, 150, () => {
            buttonSound.play()
            exitBut.remove();
            baz.remove();
            shop.remove();
            sceneChange("bazaarLob");
        });

        let shop = makeButton("Shop", windowWidth - 400, windowHeight/2 , 350, 150, () => {
            buttonSound.play()
            exitBut.remove();
            baz.remove();
            shop.remove();
            sceneChange("shop");
            shopBell.play();
        });

        exitBut = makeButton("X", 50, 50, 100, 100, () => {
            buttonSound.play()
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
    image(mapbg, 25, 25, windowWidth - 435, windowHeight - 50);
    fill("#300229")
    rect(windowWidth - 425, 25, 400, windowHeight - 50);

    // Ship 
    anim += animS
    image(ship, 100, windowHeight - (350 + anim) , 250, 250);
    
    if(anim >= 25 || anim <= 0){
        animS *= -1;
    }

    image(shopPlan, windowWidth - 1400, 200, 200, 200);
        if((mouseX < windowWidth - 50 && mouseX > windowWidth - 400) && (mouseY > windowHeight/2 && mouseY < windowHeight/2 + 150)){
            image(shopPlan, windowWidth - 1425, 175, 250, 250)
        }

    
    if((mouseX < windowWidth - 50 && mouseX > windowWidth - 400) && (mouseY > windowHeight/2 - 250 && mouseY < windowHeight/2 - 100)){
        image(bazPlan, windowWidth - 1075, 475, 350, 400)
    }else{
        image(bazPlan, windowWidth - 1050, 500, 300, 350)
    }


        
    fill("white")

}

function drawInventory(){
    if(sceneMade == false){
        background("orange");
        rect(25, 25, windowWidth - 50, windowHeight - 50);

        // Jam Item
        if(vyraJamTrig == true){
            fill("purple");
            image(jam, 300, 150, 300, 300);
        }

        //HoloTab
        if(holoTabTrig == true){
            fill("gray")
            rect(200, 550, 600, 100);
        }

        //Modules
        // fill("yellow");
        // rect(925, 300, 150, 150);
        image(module, 850, 225, 300, 300)

        if(shopModule == true){
            // fill("pink");
            // rect(1075, 300, 150, 150);
            image(module, 1000, 225, 300, 300)
        }

        if(bazModule == true){
            // fill("blue");
            // rect(1000, 150, 150, 150);
            image(module, 925, 70, 300, 300)
        }


        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            buttonSound.play()
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
    image(quizbg, 0, 0, windowWidth, windowHeight);
    fill("white");
    text(correctAnswers + "/7", windowWidth - 100, 100);

    if(sceneMade == false){
        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            buttonSound.play()
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
            let bWidth = textWidth(buttons[i].html())
            buttons[i].position((windowWidth/8 - bWidth) + (i * (windowWidth/4 - bWidth)), 500);
            buttons[i].size(i.length + 120, 75)
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
    if (index + 1 === currentQuestion.correct) {
        right.play()
        alert("Correct!");
        
        correctAnswers += 1
        coins += 1

        // Remove the question from the array
        let questionIndex = quizData.indexOf(currentQuestion);
        if (questionIndex !== -1) {
            quizData.splice(questionIndex, 1);
        }
    } else {
        wrong.play();
        alert("Wrong!");
    }

    selectQuestion(); // Load the next question
}

function selectQuestion() {
    if (quizData.length === 0) {
        currentQuestion = null; // No questions left
        alert("Data sorted. You have recieved a data moudle part!")
        alert("Achievement earned: Coinstar - Collect all coins.")
        achievements += 1
        return;
    }

    // Randomly select a question
    currentQuestion = random(quizData);

    // Clear previous buttons
    for (let btn of buttons) {
        btn.remove();
    }
    buttons = [];

    // // Create buttons for each answer
    // for (let i = 0; i < currentQuestion.answers.length; i++) {
    //     let btn = makeButton(currentQuestion.answers[i]);
    //     btn.mousePressed(() => checkAnswer(i)); // Check the selected answer
    //     buttons.push(btn);
    // }
    // Create buttons for each answer
    let spacing = 20; // Space between buttons
    let buttonWidth = 200; // Fixed width for all buttons
    let buttonHeight = 50; // Fixed height for all buttons

    let totalWidth = (buttonWidth * currentQuestion.answers.length) + (spacing * (currentQuestion.answers.length - 1));
    let startX = (width - totalWidth) / 2; // Calculate starting x-position to center the buttons

    for (let i = 0; i < currentQuestion.answers.length; i++) {
        let btn = makeButton(currentQuestion.answers[i]);
        btn.size(buttonWidth, buttonHeight); // Set button size
        btn.style("font-size", "30px").style("line-height", "25px")
        btn.position(startX + i * (buttonWidth + spacing), height / 2); // Position buttons dynamically
        btn.mousePressed(() => checkAnswer(i)); // Check the selected answer
        buttons.push(btn); // Store button in the array for future use
    }

}



// Game Scenes

function openingScene(){
    if(sceneMade == false){
        openDiv.show();
        let box = createInput("");
        box.size(300, 50)
        box.position(windowWidth/2 - 150, windowHeight/2 + 200)
        box.style("font-family", "NewHiScore");
        box.style("font-size", "30px")
        box.style("padding-left", "10px")
        box.style("padding-right", "10px")
        box.style("border-radius", "10px")
        box.style("border", "10px")
        box.style("color", "black")

        let start = makeButton("Start", windowWidth/2 - 100, windowHeight/2 + 350, 200, 65, () =>{
            buttonSound.play();
            openDiv.remove()
            start.remove()
            sceneChange("cockpit")
        }, "#abf5ab");
        start.hide()
        
        let next = makeButton("\&#x2713", windowWidth/2 + 195, windowHeight/2 + 200, 50, 50, () =>{
            if(box.value() != ""){
                buttonSound.play()
                next.remove()
                playerName = box.value()
                box.hide()

                start.show();
                openDiv.size(850, 700).style("padding-top", "10px")
                openDiv.style("text-align", "left").style("font-size", "40px").style("line-height", "40px")
                openDiv.html("\"Log Entry 6743-A: Pilot " + playerName + " of the Chester System reporting. The *Stellar Vortex* is down. Crashed in an uncharted sector after a gravity spike. Two of three data modules were ejected on impact, location module required for jump damaged. Scanners show a nearby system with a habitable planet. Heading there now to recover them. If I don't return, tell the Fleet it wasn't pilot error. Pilot out.\"<br/><br/> ATTENTION PILOT:<br/> you have crash-landed in a distant galaxy and have lost parts of your location data module. You'll have to explore the system in order to recover your lost pieces and return home. Good luck, pilot. ")
            }else{
                wrong.play()
                alert("Please input your credentials!");
            }

        }, "#abf5ab")
        next.style("font-size", "25px")
    
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

        invBut = makeButton("Inventory", 350, 15, 220, 90, () => {
            buttonSound.play()
            mapBut.remove();
            invBut.remove();
            coinbg.hide();
            timeDiv.hide()
            sceneChange("inventory")}, "yellow");

        mapBut = makeButton("Map", 50, 10, 200, 90, () => {
            buttonSound.play()
            mapBut.remove();
            invBut.remove();
            coinbg.hide()
            timeDiv.hide()
            sceneChange("map")}, "#eb7328");

        if(goHome == true){
            let goHomeBut = makeButton("Go Home", windowWidth - 250, windowHeight - 200, 200, 100, () => {
                buttonSound.play()
                alert("Achievement earned! SP-Ace Cadet - Complete the game.")
                achievements += 1;
                invBut.remove();
                mapBut.remove();
                coinbg.hide()
                timeDiv.hide();
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
    fill("#1b1c06");
    rect(0, 0, windowWidth, 125);
    
    fill("black")
    coinbg.html(coins).position(windowWidth - 275, 25).size(100, 70);
    coinbg.show();

    timeDiv.html(makeClock());
    timeDiv.show();
    image(coinicon, windowWidth - 375, 15, 100, 100)
    fill("white")

    image(settingCog, windowWidth - 120, 25, 75, 75);
    if((mouseX > windowWidth - 120 && mouseX < windowWidth - 45) && (mouseY > 10 && mouseY < 85)){
        toolHover("Settings");
        if(mouseIsPressed == true){
            // invBut.remove();
            // mapBut.remove()
            // coinbg.hide()
            // hoverDiv.hide()
            // sceneChange("settings");
            wrong.play();
        }
    }else{
        hoverDiv.hide();
    }
    
}

function endingSequence(){
    background("pink");
    endingDiv.show();

    createDiv().style("font-family", "NewHiScore").style("font-size", "30px").style("color", "black")
    .style("background-color", "white").style("border", "5px solid").style("border-radius", "10px")
    .style("z-index", "0").position(windowWidth/2 + 150, windowHeight/2 - 150)
    .html("Identification Card (Data)<br/>Cadet " + playerName + "<br/>________________<br/>Time Elapsed: " + Math.floor(tElapsed/30) + " seconds <br/>Total Mouse Clicks: " + mClicks + "<br/>Achievements Earned: " + achievements + "/3<br/>System Sector: " + browser + "<br/>Ship OS System: " + osSystem)
    .size(550, 300).style("line-height", "35px").style("padding-right", "20px").style("padding-left", "20px").style("padding-top", "10px").style("padding-bottom", "10px");

}

function drawShop(){
    if(shopVisited == false && sceneMade == false){
        background("purple");
        fill("white");
        rect(25, 25, windowWidth - 50, windowHeight - 50);
        image(shopbg, 35, 35, windowWidth - 70, windowHeight - 70);
        
        popSound.play()
        shopDiv.show();
        sceneMade = true;

        let nextBut = makeButton("Next", windowWidth - 450, windowHeight - 200, 200, 100, () => {
            buttonSound.play()
            nextBut.remove();
            shopDiv.hide();
            shopVisited = true;
            sceneMade = false;
        }, "#34c274");
    }


    if(sceneMade == false){
        

        background("purple");
        fill("white");
        rect(25, 25, windowWidth - 50, windowHeight - 50);
        image(shopbg, 35, 35, windowWidth - 470, windowHeight - 70);

        fill("#1a0e2e")
        rect(windowWidth - 425, 25, 400, windowHeight - 50);

        let shop = makeButton("Shop", windowWidth - 400, windowHeight/2 - 350, 350, 150, () => {
            buttonSound.play()
            exitBut.remove();
            talk.remove();
            shop.remove();
            vtalkDiv.hide();
            sceneChange("shopping");
        }, "#4f81ab");

        let talk = makeButton("Talk", windowWidth - 400, windowHeight/2 - 75, 350, 150, () => {
            popSound.play()
            vtalkDiv.html(vyraLines[Math.floor(random(0,11.99))])
            vtalkDiv.show()
        }, "#c790e0");

        let exitBut = makeButton("Leave", windowWidth - 400, windowHeight/2 + 200, 350, 150, () => {
            buttonSound.play()
            exitBut.remove();
            talk.remove();
            shop.remove();
            vtalkDiv.hide()
            sceneChange("map");
        }, "#ed4545");

        fill("white")

        sceneMade = true;
    }
}

function shopping(){
    if(sceneMade == false){
        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            buttonSound.play()
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
        ellipse(413, 265, 200, 50)
        image(jam, 300, 65, 225, 225)
    }
    
    if(shopModule == false){
        ellipse(773, 575, 200, 50)
        image(module, 550, 185, 450, 450)
    }

    if(holoTabTrig == false){
        // rect(550, windowHeight - 200, 700, 150);
    }
    

    if((shopModule == false)&&((mouseX > 650 && mouseX < 900) && (mouseY > 100 && mouseY < 550))){
        image(module, 525, 160, 500, 500)
            toolHover("Location Module Part $4", 150, 75)
            if(mouseIsPressed == true && coins >= 4){
                buySound.play()
                shopModule = true;
                coins -= 4
                hoverDiv.hide();
            }else if(mouseIsPressed == true && coins < 4){
                wrong.play()
            }
    }
    else if((vyraJamTrig == false)&&(mouseX > 325 && mouseX < 500) && (mouseY > 25 && mouseY < 250)){
        image(jam, 287, 52, 250, 250)
            toolHover("Vyra's Jam $2")
            hoverDiv.show()
            if(mouseIsPressed == true && coins >= 2){
                buySound.play()
                alert("Achievement Earned: Support Local Businesses! - Purchase Vyra's Jam")
                vyraJamTrig = true;
                coins -= 2
                achievements += 1
                hoverDiv.hide();
            }else if(mouseIsPressed == true && coins < 2){
                wrong.play()
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
    if(bazVisited == false){
    background("black")
    rect(25, 25, windowWidth - 50, windowHeight - 50);
    image(bazlobbg, 25, 25, windowWidth - 50, windowHeight - 50);
    }
    
    
    if(bazVisited == false && sceneMade == false){
        sceneMade = true;

        popSound.play();
        bazDiv.show();
        ellipse(windowWidth - 1300, windowHeight/2, 300, 700);
        let nextBut = makeButton("Next", windowWidth - 450, windowHeight - 150, 200, 100, () => {
            nextBut.remove();
            bazDiv.hide();
            bazVisited = true;
            sceneMade = false;
        }, "#b2eaeb");
        }

    if(sceneMade == false){
        background("#67f5e7")
        rect(25, 25, windowWidth - 50, windowHeight - 50);
        fill("white")



        let quizBut = makeButton("Organize Mari's Data", 450, windowHeight - 250, 300, 150, () => {
            buttonSound.play()
            exitBut.remove()
            quizBut.remove()
            galBut.remove()
            sceneChange("quizzing");
        })

        let galBut = makeButton("View Data Gallery", windowWidth - 600, windowHeight - 250, 300, 150, () => {
            buttonSound.play()
            exitBut.remove()
            quizBut.remove()
            galBut.remove()
            sceneChange("bazaarGal");
        })

        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            buttonSound.play()
            exitBut.remove();
            quizBut.remove();
            galBut.remove();
            sceneChange("map");
        });
        exitBut.style("border-radius", "50%");
        exitBut.style("background-color", "red");
        exitBut.style("z-style", "5");

        // Play cutscene if first time visiting.
        
        sceneMade = true;
    }

    if(bazVisited == true){
        background("black")
        rect(25, 25, windowWidth - 50, windowHeight - 50);
        image(bazlobbg, 25, 25, windowWidth - 50, windowHeight - 50);
        
        image(quizpic, 250, windowHeight - 750, 650, 400);
        image(tab, windowWidth - 850, windowHeight - 850, 800, 550);
    }
    

        fill("white")
    
}

function bazaarGallery(){
    if(sceneMade == false){
        background("black");
        rect(25, 25, windowWidth - 50, windowHeight - 50);
        fill("black")
        textSize(40);
        strokeWeight(0)
        text("Click the screen to display data.", windowWidth/2 - 330, 100)

        let clearBut = makeButton("Clear", windowWidth - 250, windowHeight - 150, 200, 100, () => {
            buttonSound.play()
            clear();
            background("black");
            rect(25, 25, windowWidth - 50, windowHeight - 50);
        }, "#d97f71")
        

        let exitBut = makeButton("X", 50, 50, 100, 100, () => {
            buttonSound.play()
            clearBut.remove();
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
        cutscene1.pause();
        cutscene1.hide();
        scene = 'cockpit'
    }
    else if(newscene == "cockpit"){
        scene = "cockpit";

        if(currentsong != cockpitMusic){
            currentsong.stop();
            musicPlaying = false;
        }
    }
    else if(newscene == 'map'){
        scene = "map";
        if(currentsong != cockpitMusic){
            currentsong.stop();
            musicPlaying = false;
        }
    }
    else if(newscene == "settings"){
        scene = "settings"
    }
    else if(newscene == "ending"){
        scene = "ending"
        if(currentsong != endMusic){
            currentsong.stop();
            musicPlaying = false;
        }
    }
    else if(newscene == "inventory"){
        scene = "inventory"

    }
    else if(newscene == "shop"){
        scene = "shop"
        if(currentsong != shopMusic){
            currentsong.stop();
            musicPlaying = false;
        }
    }
    else if(newscene == "shopping"){
        scene = "shopping"
    }
    else if(newscene == "bazaarLob"){
        scene = "bazaarLob"
        if(currentsong != bazaarMusic){
            currentsong.stop();
            musicPlaying = false;
        }
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

function musicPlayer(){
    if(scene == "opening"){
        currentsong = startMusic;
    }

    else if(scene == "cockpit" || scene == "map" || scene == "inventory"){
       currentsong = cockpitMusic;
    }

    else if(scene == "shop" || scene == "shopping"){
        currentsong = shopMusic;
    }

    else if(scene == "bazaarLob" || scene == "bazaarGal" || scene == "quizzing"){
       currentsong = bazaarMusic
    }

    else if(scene == "ending"){
        currentsong = endMusic
    }

    if(!musicPlaying){
        currentsong.play();
        currentsong.loop();
        musicPlaying = true
    }
}



// Data Functions
function trackData(){
    osSystem = navigator.platform;
    browser = detectBrowser();
    localTime = makeClock();

    if(scene != "ending"){
        tElapsed += 1  
    }
    
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
        cutscene1.resize(AUTO, AUTO)
    }
}

function mousePressed(){
    
}

function mouseClicked(){
    if(scene != "ending"){
        mClicks += 1
    }

    if(scene == "bazaarGal" && !(mouseX > windowWidth - 250 && mouseX < windowWidth - 50) && !(mouseY > windowHeight - 100 & mouseY < windowHeight - 50)){
        let imgIndex = floor(random(0, images.length)); // Random index between 0 and 7
        let x = random(30, windowWidth - 680); // Random x position within canvas
        let y = random(30, windowHeight - 380); // Random y position within canvas

        strokeWeight(2);
        stroke("white")
        fill(random(0, 255), random(0, 255), random(0, 255))

        rect(x - 5, y - 5, 660, 360);
        image(images[imgIndex], x, y, 650, 350); // Draw the random image
        stroke("black")
        strokeWeight(10);
        fill("white")
    }

    if(scene == "bazaarGal"){
        blip.play();
    }
}