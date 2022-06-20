var canvas;
var backgroundImage, car1_img, car2_img, track;
var fuelImage, powerCoinImage, lifeImage;
var obstacle1Image, obstacle2Image;
var database, gameState;
var form, player, playerCount;
var allPlayers, car1, car2, fuels, powerCoins, obstacles;
var cars = [];
var blastImage;

function preload() {
  backgroundImage = loadImage("./assets1/background.png");
  car1_img = loadImage("./assets1/car1.png");
  car2_img = loadImage("./assets1/car2.png");
  track = loadImage("./assets1/track.jpg");
  fuelImage = loadImage("./assets1/fuel.png");
  powerCoinImage = loadImage("./assets1/goldCoin.png");
  obstacle1Image = loadImage("./assets1/obstacle1.png");
  obstacle2Image = loadImage("./assets1/obstacle2.png");
  lifeImage = loadImage("./assets1/life.png");
  blastImage = loadImage("./assets1/blast.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  if (playerCount === 4) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    //game.showLeaderboard();
    game.end();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
