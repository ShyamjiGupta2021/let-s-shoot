var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

//var missile = 70;
var score = 0;
var life = 3;

var heart1,heart2,heart3;

var gameState="fight";

function preload(){
   backgroundImg = loadImage("space background.jpg");
   playerImg = loadImage("spaceship.png");
   missileImg = loadImage("missile.png");
   enemyImg = loadImage("enemy.png");
   heart1Img = loadImage("life.png");
   heart2Img = loadImage("life.png");
   heart3Img = loadImage("life.png");
   GameOverImg = loadImage("gameOver.png");
   restartImg = loadImage("restart.png");
   bk_song = loadSound("sound1.mp3");
   explosionSound = loadSound("explosion.mp3");
   YouWinImg = loadImage("YouWin.png");
};
function setup(){
   canvas = createCanvas(windowWidth,windowHeight);

   bk_song.play();
   bk_song.replay();
   bk_song.setVolume(0.5);

   ground = createSprite(700,700,2000,10);
   ground.visible = false;

   player = createSprite(700,650,20,30);
   player.scale = .2;
   player.addImage("shooter",playerImg);

   player.setCollider("rectangle",5,10,100,500,0);
   player.debug = true;

   gameOver = createSprite(800,200)
   gameOver.addImage(GameOverImg)

   restart = createSprite(800,300);
   restart.addImage(restartImg);

   YouWin = createSprite(800,200);
   YouWin.addImage(YouWinImg);
   YouWin.scale = 5;

    heart1 = createSprite(displayWidth-100,40,20,20)
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.04

    heart2 = createSprite(displayWidth-50,40,20,20)
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.04

    heart3 = createSprite(displayWidth-0,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.04

   missileGroup = new Group();
   enemyGroup = new Group();
};
function draw(){
   background(backgroundImg);

   player.collide(ground);
  
if(gameState==="fight"){

   createEnemy();
   
   gameOver.visible = false;
   restart.visible = false;
   YouWin.visible = false;

   if(life===3){
      heart3.visible = true
      heart1.visible = true  
      heart2.visible = true
    }
    if(life===2){
      heart2.visible = true
      heart1.visible = true
      heart3.visible = false
    }
    if(life===1){
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }
    if(life===0){
      heart1.visible = false
      heart3.visible = false
      heart2.visible = false
      gameState = "lost"
      
    }
   if (score === 1000){
     gameState = "won"
   }
    

   if(keyDown("RIGHT_ARROW")){
      player.x = player.x+7
     };
   if(keyDown("LEFT_ARROW")){
      player.x = player.x-7
     };

   if(keyWentDown("space")){
      missile = createSprite(player.x- 1,650,15)
      missile.velocityY = -20
      missile.addImage("shooting", missileImg)
      missile.scale = 0.03
      missileGroup.add(missile)
      player.depth = missile.depth
      player.depth = player.depth+2
      explosionSound.play();
    
   }
   if(enemyGroup.isTouching(missileGroup)){
    for(var i=0;i<enemyGroup.length;i++){     
        
     if(enemyGroup[i].isTouching(missileGroup)){
          enemyGroup[i].destroy()
          missileGroup.destroyEach()
   
          score = score+1000
          } 
    
    }
  }
  if(enemyGroup.isTouching(player)){
 
   for(var i=0;i<enemyGroup.length;i++){     
       
   if(enemyGroup[i].isTouching(player)){
        enemyGroup[i].destroy()
       
       life=life-1
        } 
      }
  }
}
 
  else if(gameState === "lost"){
    gameOver.visible = true;
    restart.visible = true;
    YouWin.visible = false;
    enemyGroup.destroyEach();
    missileGroup.destroyEach();
    player.destroy();
    bk_song.stop();
  
   }
   else if(gameState == "won"){
    YouWin.visible = true;
    restart.visible = true;
    enemyGroup.destroyEach();
    missileGroup.destroyEach();
    player.destroy();
    bk_song.stop();
  }
   drawSprites();

   textSize(30);
   text("Score: "+ score,1140,50);



  };



function createEnemy(){
   if(frameCount%80===0){
 
     //giving positions for enemy to appear.
     enemy = createSprite(random(200,1100))
 
     enemy.addImage(enemyImg)
     enemy.scale = 0.15
     enemy.velocityY = 3
     enemy.debug= true
     enemy.setCollider("rectangle",0,0,400,400)
    
     enemy.lifetime = 400
    enemyGroup.add(enemy)
   }
 
 }
 