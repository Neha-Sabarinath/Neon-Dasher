var gif_createImg; 
var game, form, player, gameState, playerCount, database, allPlayers;
var ball1, ball2, ball3, ball4, balls;
var blast1, blast2, blast3, blast4;
var spike, coins, spikes;

function preload() { 
    gif_createImg = loadImage("assets2/background1.gif");
    ball1_img = loadAnimation("assets1/pink_ball_test_image.jpg");
    ball2_img = loadAnimation("assets1/blue_ball_test_image.jpg");
    ball3_img = loadAnimation("assets1/green_ball_test_image.jpg");
    ball4_img = loadAnimation("assets1/red_ball_test_image.jpg");
    /* blast1_img = loadAnimation("assets1/pinkBlast.jpg");
    blast2_img = loadAnimation("assets1/blueBlast.jpg");
    blast3_img = loadAnimation("assets1/greenBlast.jpg");
    blast4_img = loadAnimation("assets1/redBlast.jpg"); */
    spikeImage = loadAnimation("assets1/spike.png");
} 
    
    
function setup() { 
    createCanvas(windowWidth, windowHeight); 
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
} 
    
    
function draw() { 
    background(0); 
    //gif_createImg.position(0, 0); 
    //gif_createImg.size(windowWidth, windowHeight);

    image (gif_createImg, 0, 0, width, height);
  
    game.play();
}