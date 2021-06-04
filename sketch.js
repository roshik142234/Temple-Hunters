
//https://opengameart.org/content/game-coins-sprite
//https://www.gameart2d.com/the-zombies-free-sprites.html
//https://www.gameart2d.com/temple-run---free-sprites.html
//https://kaspammer.glitch.me/


const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var backgroundImg;
var tp, tpI, tpRun, tpJump, tpSlide, tpDead;
var gameState;
var level;
var imageT;
var dir;
var coin, coinI;
var gravity, jumpS;
var score;
var colXR, colXL;
var zom1, zom2, zomW, zomM;
var zombG, coinG;
var room1, rmI;
var time;
var ground, lava1;
var bgI2;



 function preload(){
  backgroundImg = loadImage("images/templeB.jpg");
  bgI2 = loadImage("images/templeB.png");
  rmI = loadImage("images/door.png");
  tpI = loadAnimation("images/Idle__000.png", "images/Idle__001.png","images/Idle__002.png","images/Idle__003.png","images/Idle__004.png","images/Idle__005.png","images/Idle__006.png","images/Idle__007.png","images/Idle__008.png","images/Idle__009.png",);
  tpJump = loadAnimation("images/Jump__000.png", "images/Jump__001.png", "images/Jump__002.png", "images/Jump__003.png", "images/Jump__004.png", "images/Jump__005.png", "images/Jump__006.png", "images/Jump__007.png", "images/Jump__008.png", "images/Jump__009.png");
  tpRun = loadAnimation("images/Run__000.png","images/Run__001.png","images/Run__002.png","images/Run__003.png","images/Run__004.png","images/Run__005.png","images/Run__006.png","images/Run__007.png","images/Run__008.png","images/Run__009.png");
  tpSlide = loadAnimation("images/Slide__000.png", "images/Slide__001.png", "images/Slide__002.png", "images/Slide__003.png", "images/Slide__004.png", "images/Slide__005.png", "images/Slide__006.png", "images/Slide__007.png", "images/Slide__008.png", "images/Slide__009.png");
  tpDead = loadAnimation("images/Dead__000.png", "images/Dead__001.png", "images/Dead__002.png", "images/Dead__003.png", "images/Dead__004.png", "images/Dead__005.png", "images/Dead__006.png", "images/Dead__007.png", "images/Dead__008.png", "images/Dead__009.png");
  coinI = loadAnimation("images/PNG/Gold/Gold_21.png","images/PNG/Gold/Gold_22.png","images/PNG/Gold/Gold_23.png","images/PNG/Gold/Gold_24.png","images/PNG/Gold/Gold_25.png","images/PNG/Gold/Gold_26.png","images/PNG/Gold/Gold_27.png","images/PNG/Gold/Gold_28.png","images/PNG/Gold/Gold_29.png","images/PNG/Gold/Gold_30.png");
  zomW = loadAnimation("images/Walk (1).png", "images/Walk (2).png", "images/Walk (3).png", "images/Walk (4).png", "images/Walk (5).png", "images/Walk (6).png", "images/Walk (7).png", "images/Walk (8).png", "images/Walk (9).png");
}

function setup() {
  createCanvas(1400, 750);

  engine = Engine.create();
  world = engine.world;

  tp = createSprite(width/2, height-20, 50, 50);
  tp.addAnimation("Idle", tpI);
  tp.addAnimation("run", tpRun);
  tp.addAnimation("jump", tpJump);
  tp.addAnimation("slide", tpSlide);
  tp.addAnimation("dead", tpDead);
  tp.scale = 0.3;

  zombG = createGroup();
  coinG = createGroup();
  

  gameState = "intro";
  level=0;
  gravity=1;
  movement="idle";
  jumpS=0;
  score=0;
  colXR=0;
  colXL=0;
  zomM=0;
  time=0;

  setInterval(timer, 1000);

//level 1
  pl1 = new Platform(165, 175, 330, 5);

  pl2 = new Platform(380, 200, 100, 5);

  pl3 = new Platform(730, 175, 600, 5);

  pl4 = new Platform(1000, 360, 800, 5);

  pl5 = new  Platform(580, 75, 100, 150);

  pl6 = new Platform(750, 545, 200, 5);

  pl7 = new Platform(1330, 748, 100, 5);

  zom1 = createSprite(-100, -100, 1, 1);
  zom2 = createSprite(-100, -100, 1, 1);

  coin = createSprite(-100, -100, 10, 10);
  coin2 = createSprite(-100, -100, 10, 10);
  coin3 = createSprite(-100, -100, 10, 10);

  lava1 = createSprite(-100, 100, 100, 25);
  lava1.shapeColor = "orange";

  room1 = createSprite(-100, -100, 25, 140);
  room1.addImage("door", rmI);
  room1.scale = 0.35;

  ground = createSprite(-1000, -100, 1280, 10);
  ground.shapeColor = "orange";


}
function draw() {
  //gravity
    tp.velocity.y = tp.velocity.y+1;


  //debug
  //tp.debug=true;
  if(frameCount%25===0){
    //console.log("y value: "+tp.y);
    //console.log("x value: "+t5p.x);
    //console.log(Math.round(frameRate()));  
  } 


  //The beginning of the game
  if(gameState==="intro"){
    
    background(backgroundImg);

      tp.x = width/2
      tp.y = height-20
      tp.scale=0.3;
      tp.velocityY=0;

      fill("red");
      textAlign(CENTER);
      textSize(20);
      text("Welcome explorer to the fallen Aztec Empire, to seek our secrets and treasures you must be a brave one!", tp.x, tp.y-500);
      text("There will be traps and dangers that lurk within our temple. You can turn around now if you want. Before it is too late!", tp.x, tp.y-400);
      text("Press A to move left. Press D to move right. Tap W to jump. Press S to slide. Avoid red lava and beware of zombies.", tp.x, tp.y-300)
      text("Press C to Continue", tp.x, tp.y-200);

      if(keyWentDown("c")){
        gameState = "playing";
        level=1;
        tp.x = 20;
        tp.y = 100;
        
        frameCount=0;
      }
  }
  //The part of the game where you play(Handles the levels and stuff).

    if(gameState==="over"){     
      background(bgI2);
      tp.changeAnimation("dead");
      textSize(20);
      fill("red");
      imageMode(CENTER);
      text("GAME OVER", width/2-40, height/2);
      text("HINT: Slide then jump/move to go faster and further", width/2-80, height/2+40);
      zombG.destroyEach();
      coinG.destroyEach();
      room1.destroy();
      ground.destroy();
      lava1.destroy();
    }

    if(gameState==="complete"){
          
      background(backgroundImg);

      tp.changeAnimation("Idle");

      zombG.destroyEach();
      coinG.destroyEach();
      room1.destroy();
      ground.destroy();
      lava1.destroy();

      tp.x = width/2
      tp.y = height-20
      tp.scale=0.3;
      tp.velocityY=0;

      fill("green");
      textAlign(CENTER);
      textSize(50);
      text("YOU WON!", width/2, height/2);
      text("Final Score: "+ score, width/2, height/2+60);
      text("Final Time: " + time, width/2, height/2+120);
    }

  if(gameState==="playing"){

    background(bgI2);

    textSize(20);
    text("Score: " + score, 1000, 50);
    text("Time: " + time, 100, 50);

    //controls 
    if(keyWentDown("w") && gravity===0){
      zomM=1;
      tp.velocityY = -15;    
      jumpS=1;
      gravity=1;
    }else{
      jumpS=0;
    }
    if(keyDown("s")){
      zomM=1;
      movement="moving";
      tp.changeAnimation("slide");
      if(dir===-1 && colXR===0){
        tp.mirrorX(dir);
        tp.velocityX = -6;
      } else if(dir===1 && colXL===0){
        tp.mirrorX(dir);
        tp.velocityX = 6;
      }
    }else if(keyDown("a") && colXL===0){
      zomM=1;
      tp.changeAnimation("run");
      movement="moving";
      dir=-1;
      tp.mirrorX(-1);
      tp.x = tp.x-5;
    }else if(keyDown("d") && colXR===0){
      zomM=1;
      tp.changeAnimation("run");
      movement="moving";
      dir=1;
      tp.mirrorX(1);
      tp.x = tp.x+5;
    }else if(keyWentUp("w") || keyWentUp("s") || keyWentUp("a") || keyWentUp("d")){
      movement="idle";
      tp.velocityX=0
    }

      if(tp.isTouching(ground)){
        gameState="over";
      }

     if(level===1){
      pl1.display();
      pl1.overlap(tp, 330, 5);
      pl2.display();
      pl2.overlap(tp, 100, 5);
      pl3.display();
      pl3.overlap(tp, 600, 5);
      pl4.display();
      pl4.overlap(tp, 800, 5);
      pl5.display()
      pl5.overlap(tp, 100, 150)
      pl6.display();
      pl6.overlap(tp, 200, 5);
      pl7.display();
      pl7.overlap(tp, 100, 5)
      zomF(zom1, 825, 140, 100, 2);
      zomF(zom2, 900, 325, 100, 4);
      coinF(coin, 100, 150);
      coinF(coin2, 825, 150);
      coinF(coin3, 900, 325);
      if(tp.isTouching(room1)){
        gameState="complete";
      }
      if(tp.isTouching(lava1)){
        gameState="over";
      }
    } 

    if(movement==="idle"){
      tp.changeAnimation("Idle");
      tp.scale = 0.13;

    }


  }

  drawSprites();
}

function hasCollidedR(){
  colXR=1;
  frameCount=2;
  //console.log("collision detected at left border");
}
function hasCollidedL(){
  colXL=1;
  //console.log("collision detected at right border");
  frameCount=2;
}

function zomF(zom, xv, yv, dis, speed){
  if(frameCount===1){
    zom.x=xv;
    zom.y=yv;
    zom.velocityX=speed;
    zom.setCollider("rectangle", -10, 40, 275, 400);
    zom.addAnimation("walk", zomW);
    zom.scale=0.13;
    zombG.add(zom);
    room1.x=1330;
    room1.y=720;
    ground.x=640;
    ground.y=748; 
    lava1.x =380;
    lava1.y=187.5;                                          
  }
  if(zom.x > xv+dis/2){
    zom.velocityX=-speed;
    zom.mirrorX(-1);
  }
  if(zom.x < xv-dis/2){
    zom.velocityX=speed;
    zom.mirrorX(1);
  }
  
  if(zom.collide(tp)){
    gameState="over";
  }

}

function coinF(c, xv, yv){
  if(frameCount===1){
    c.addAnimation("coin", coinI);
    c.scale=0.05;
    c.x=xv
    c.y=yv;
    coinG.add(c);
  }

  if(c.collide(tp)){
    c.destroy();
    score++;
  }
}

function timer(){
  if(gameState==="playing"){
    time++
  }
}
