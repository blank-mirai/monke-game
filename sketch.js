var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;

var gameState = "PLAY";

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600, 200);
  
  monkey = createSprite(75, 150, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300, 190, 600, 25);
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
}


function draw() {
  background(250);
  
  monkey.collide(ground);
  
  if(gameState == "PLAY"){
    
    textSize(20);
    text("Score: " + score, 17, 30);
    
    if(keyDown("space")&& monkey.y >= 140) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8

    if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
    if(foodGroup.isTouching(monkey)){
      score = score + 1;
      foodGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(monkey)){
      gameState = "END";
    }
    spawnFood();
    spawnObstacle();
  }
  
  drawSprites();
  
  if(gameState == "END"){
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    monkey.destroy();
    ground.destroy();
    
    foodGroup.lifetime = -1;
    obstacleGroup.lifetime = -1;
    
    foodGroup.setVelocityXEach = 0;
    obstacleGroup.setVelocityXEach = 0;
    
    textSize(20);
    text("Game Over!", 240, 100);
    text("Score: " + score, 250, 125);
  }
}

function spawnFood(){
  if(frameCount % 100 === 0){
    var rand = Math.round(random(40, 90))
    var banana = createSprite(600, rand, 25, 25);
    banana.velocityX = -6;
    banana.addImage("banana image", bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 125;
    foodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 125 === 0){
    var obstacle = createSprite(600, 160, 10, 10);
    obstacle.addImage("obstacle image", obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.1;
    obstacle.lifetime = 125;
    obstacleGroup.add(obstacle);
  }
}