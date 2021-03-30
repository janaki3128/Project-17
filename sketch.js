//Game States
var PLAY=1;
var END=0;
var gameState=PLAY;

var knife;
var knifeImage ;
var fruit,fr1, fr2, fr3, fr4;
var al1, al2;
var fruitsG, monsterG;
var r;
var swoosh,gameOver, gameoverS, gameoverImg;
var monster, monsterImg;
var score=0;

function preload(){
  
  knifeImage = loadImage("knife.png");
  fr1 = loadImage("fruit1.png");
  fr2 = loadImage("fruit2.png");
  fr3 = loadImage("fruit3.png");
  fr4 = loadImage("fruit4.png");
  al1 = loadImage("alien1.png");
  al2 = loadImage("alien2.png");
  swoosh = loadSound("knifeSwoosh.mp3");
  gameoverS = loadSound("gameover.mp3");
  monsterImg = loadAnimation("alien1.png","alien2.png");
  gameoverImg = loadImage("gameover.png");

}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  
  fruitsG = new Group();
  monsterG = new Group();
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
    if(fruitsG.isTouching(knife)){
       score = score+1;
      fruitsG.destroyEach();
      swoosh.play();
    }
    if(monsterG.isTouching(knife)){
      gameState = END;
     
    }
  }
  
   if(gameState===END){
    
  gameOver = createSprite(300,100);
  gameOver.addImage(gameoverImg);
  
  gameOver.visible=true;
    
  monsterG.destroyEach();
  fruitsG.destroyEach();
  }
  
  
  var rand = Math.round(random(1,2));
  if(rand === 1){
    fruits();
  }else{
    spawnMonster();
  }
  drawSprites();
  
  
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}
  
  function fruits(){
    if (frameCount % 80 === 0) {
    fruit = createSprite(400,200,20,20);
    fruit.velocityX = -2;
    fruit.scale = 0.3;
    r = Math.round(random(1,4))  
      if(r === 1){
        fruit.addImage(fr1);
      }else if(r === 2){
        fruit.addImage(fr2);
      }else if(r === 3){
        fruit.addImage(fr3);
      }else{
        fruit.addImage(fr4);
      }
      
   fruit.y = Math.round(random(50, 340));
      fruit.lifetime = 200;
    fruitsG.add(fruit);
  }
  }

 function spawnMonster(){
   if(frameCount % 80=== 0){
   monster = createSprite(400,200,20,20);
   monster.velocityX = -2;
   
   monster.addAnimation("monster",monsterImg);
   monster.y = Math.round(random(50, 340));
    monsterG.add(monster);
   }
    
   
 }