var background1, bg;
var fastCoin, slowCoin, switchCoin;
var gem;
var pinkBall, blueBall, greenBall, orangeBall;
var spikes;

function preload() {
    background1 = loadAnimation("assets2/background-1/b1_1.png", 
    "assets2/background-1/b1_2.png",
    "assets2/background-1/b1_3.png",
    "assets2/background-1/b1_4.png",
    "assets2/background-1/b1_5.png",
    "assets2/background-1/b1_6.png",
    "assets2/background-1/b1_7.png",
    "assets2/background-1/b1_8.png",
    "assets2/background-1/b1_9.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    bg = createSprite(width / 2, height / 2);
    bg.addAnimation("background1", background1);
}

function draw() {
    background("black");

    if(playerCount === 2) {
        gameState.update(1);
    }

    if(gameState === 1) {
        gameState.play();
    }

    if(gameState === 2) {
        gameState.end();
    }

    drawSprites();
}