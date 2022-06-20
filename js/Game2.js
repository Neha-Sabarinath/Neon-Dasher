class Game {
    constructor() {
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");

        this.playerMoving = false;
        this.leftKeyActive = false;
        this.blast = false;
    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
            gameState = data.val();
        });
    }

    update(state) {
        database.ref("/").update({
          gameState: state
        });
      }
    
      start() {
        player = new Player();
        playerCount = player.getCount();
    
        //form = new Form();
        //form.display();
    
        ball1 = createSprite(width / 2 - 50, height - 100);
        ball1.addAnimation("ball1", ball1_img);
        ball1.scale = 0.07;
    
        ball2 = createSprite(width / 2 - 50, height - 100);
        ball2.addAnimation("ball2", ball2_img);
        ball2.scale = 0.07;

        ball3 = createSprite(width / 2 - 50, height - 100);
        ball3.addAnimation("ball3", ball3_img);
        ball3.scale = 0.07;

        ball4 = createSprite(width / 2 - 50, height - 100);
        ball4.addAnimation("ball4", ball4_img);
        ball4.scale = 0.07;
    
        /*ball1.addAnimation("blast1", blast_1Image);
        ball2.addAnimation("blast2", blast_2Image);
        ball3.addAnimation("blast3", blast_3Image);
        ball4.addAnimation("blast4", blast_4Image);*/
    
        balls = [ball1, ball2, ball3, ball4];
    
        //gems = new Group();
        //speedCoins = new Group();
        //slowCoins = new Group();
        coins = new Group();
        spikes = new Group();
    
        var obstaclesPositions = [
          { x: width / 2 + 250, y: height - 800, image: spikeImage },
          { x: width / 2 - 150, y: height - 1300, image: spikeImage },
          { x: width / 2 + 250, y: height - 1800, image: spikeImage },
          { x: width / 2 - 180, y: height - 2300, image: spikeImage },
          { x: width / 2, y: height - 2800, image: spikeImage },
          { x: width / 2 - 180, y: height - 3300, image: spikeImage },
          { x: width / 2 + 180, y: height - 3300, image: spikeImage },
          { x: width / 2 + 250, y: height - 3800, image: spikeImage },
          { x: width / 2 - 150, y: height - 4300, image: spikeImage },
          { x: width / 2 + 250, y: height - 4800, image: spikeImage },
          { x: width / 2, y: height - 5300, image: spikeImage },
          { x: width / 2 - 180, y: height - 5500, image: spikeImage }
        ];
    
        this.addSprites(spikes,5,spikeImage,0.5);
        //Adding obstacles sprite in the game
      }
    
      addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
        console.log("in87");
        for (var i = 0; i < numberOfSprites; i++) {
          var x, y;
    
          //C41 //SA
          if (positions.length > 0) {
            x = positions[i].x;
            y = positions[i].y;
            spriteImage = positions[i].image;
          } else {
            x = random(width / 2 + 150, width / 2 - 150);
            y = random(height / 2 + 50, height / 2 - 50);
          }
          console.log("width"+width);
          console.log("height"+height);
          console.log("x"+x);
          console.log("y"+y);
          var sprite = createSprite(x, y);
          sprite.addAnimation("sprite", spriteImage);
    
          sprite.scale = scale;
          spriteGroup.add(sprite);
        }
      }
    
      handleElements() {
        form.hide();
        form.titleImg.position(40, 50);
        form.titleImg.class("gameTitleAfterEffect");
    
        //C39
        this.resetTitle.html("Reset Game");
        this.resetTitle.class("resetText");
        this.resetTitle.position(width / 2 + 200, 40);
    
        this.resetButton.class("resetButton");
        this.resetButton.position(width / 2 + 230, 100);
    
        this.leadeboardTitle.html("Leaderboard");
        this.leadeboardTitle.class("resetText");
        this.leadeboardTitle.position(width / 3 - 60, 40);
    
        this.leader1.class("leadersText");
        this.leader1.position(width / 3 - 50, 80);
    
        this.leader2.class("leadersText");
        this.leader2.position(width / 3 - 50, 130);
      }
    
      play() {
        //this.handleElements();
        this.handleResetButton();
    
        Player.getPlayersInfo();
        player.getBallsAtEnd();
    
        if (allPlayers !== undefined) {
          image(track, 0, -height * 5, width, height * 6);
    
          this.showFuelBar();
          this.showLife();
          //this.showLeaderboard();
    
          //index of the array
          var index = 0;
          for (var plr in allPlayers) {
            //add 1 to the index for every loop
            index = index + 1;
    
            //use data form the database to display the balls in x and y direction
            var x = allPlayers[plr].positionX;
            var y = height - allPlayers[plr].positionY;
    
            var currentLife = allPlayers[plr].life;
            if(currentLife <= 0) {
              balls[index - 1].changeAnimation("blast");
              balls[index - 1].scale = 0.3;
            }
    
            balls[index - 1].position.x = x;
            balls[index - 1].position.y = y;
    
            if (index === player.index) {
              
              this.handlesSpeedCoins(index);
              this.handlesSlowCoins(index);
              this.handleGems(index);
              this.handleObstacleCollision(index);
    
              if(player.life <= 0) {
                this.blast = true;
                this.playerMoving = false;
              }
    
              // Changing camera position in y direction
              camera.position.y = balls[index - 1].position.y;
            }
          }
    
          if (this.playerMoving) {
            player.positionY += 5;
            player.update();
          }
    
          // handling keyboard events
          this.handlePlayerControls();
    
          // Finshing Line
          const finshLine = height * 6 - 100;
    
          if (player.positionY > finshLine) {
            gameState = 2;
            player.rank += 1;
            Player.updateBallsAtEnd(player.rank);
            player.update();
            this.showRank();
          }
    
        }
        drawSprites();
      }

    
      handleResetButton() {
        this.resetButton.mousePressed(() => {
          database.ref("/").set({
            playerCount: 0,
            gameState: 0,
            players: {},
            ballsAtEnd: 0
          });
          window.location.reload();
        });
      }
    
      showLife() {
        push();
        image(lifeImage, width / 2 - 130, camera.position.y - 300, 20, 20);
        fill("white");
        rect(width / 2 - 100, camera.position.y - 300, 185, 20);
        fill("#f50057");
        rect(width / 2 - 100, camera.position.y - 300, player.life, 20);
        noStroke();
        pop();
      }
    
      showFuelBar() {
        push();
        image(fuelImage, width / 2 - 130, camera.position.y - 250, 20, 20);
        fill("white");
        rect(width / 2 - 100, camera.position.y - 250, 185, 20);
        fill("#ffc400");
        rect(width / 2 - 100, camera.position.y - 250, player.fuel, 20);
        noStroke();
        pop();
      }

      handlePlayerControls() {
        if (!this.blast) {
    
        
        if (keyIsDown(UP_ARROW)) {
          this.playerMoving = true;
          player.positionY += 10;
          player.update();
        }
    
        if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
          this.leftKeyActive = true;
          player.positionX -= 5;
          player.update();
        }
    
        if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
          this.leftKeyActive = false;
          player.positionX += 5;
          player.update();
        }
       }
      }
    
      handleFuel(index) {
        // Adding fuel
        balls[index - 1].overlap(fuels, function(collector, collected) {
          player.fuel = 185;
          //collected is the sprite in the group collectibles that triggered
          //the event
          collected.remove();
        });
    
        // Reducing Player balls
        if (player.fuel > 0 && this.playerMoving) {
          player.fuel -= 0.3;
        }
    
        if (player.fuel <= 0) {
          gameState = 2;
          this.gameOver();
        }
      }
    
      handlePowerCoins(index) {
        balls[index - 1].overlap(powerCoins, function(collector, collected) {
          player.score += 21;
          player.update();
          //collected is the sprite in the group collectibles that triggered
          //the event
          collected.remove();
        });
      }
    
      handleObstacleCollision(index) {
        if (balls[index - 1].collide(obstacles)) {
          if (this.leftKeyActive) {
            player.positionX += 100;
          } else {
            player.positionX -= 100;
          }
    
          //Reducing Player Life
          if (player.life > 0) {
            player.life -= 185 / 4;
          }
    
          player.update();
        }
      }
    
      showRank() {
        swal({
          title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
          text: "You reached the finish line successfully",
          imageUrl:
            "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
          imageSize: "100x100",
          confirmButtonText: "Ok"
        });
      }
    
      gameOver() {
        swal({
          title: `Game Over`,
          text: "Oops you lost the race....!!!",
          imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
          imageSize: "100x100",
          confirmButtonText: "Thanks For Playing"
        });
      }
      end() {
        console.log("Game Over");
      }
}

