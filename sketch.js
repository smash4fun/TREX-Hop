var score = 0
var PLAY = 1
var END = 0
var Game_state = PLAY
var jump,die,checkpoint

var Obstacles_group
var Clouds_group



var Trex ,Trex_running;
function preload(){
  Trex_running = loadAnimation("trex1.png","trex3.png","trex4.png")
  ground1 = loadImage("ground2.png")
  clouds = loadImage("cloud.png")
  obs1 = loadImage("obstacle1.png")
  obs2 = loadImage("obstacle2.png")
  obs3 = loadImage("obstacle3.png")
  obs4 = loadImage("obstacle4.png")
  obs5 = loadImage("obstacle5.png")
  obs6 = loadImage("obstacle6.png")
  Dead_Trex = loadAnimation("trex_collided.png")
  GameOver = loadImage("gameOver.png")
  Restart = loadImage("restart.png")
  jump = loadSound("jump.mp3")
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkPoint.mp3")
}

function setup(){
  createCanvas(windowWidth,windowHeight                )

  game_over = createSprite(300,50)
  
  game_over.addImage(GameOver)
RESTART = createSprite(400,20)
RESTART.addImage(Restart)
RESTART.scale = 0.4

  //create a trex sprite 
  Trex = createSprite(100,160,10,30)
  Trex.addAnimation("running", Trex_running)
  Trex.addAnimation("collided",Dead_Trex)
  Trex.scale = 0.5
  Trex.setCollider("circle",0,0,20)
Obstacles_group = createGroup()
Clouds_group = createGroup()
  ground = createSprite(300,175,525,5)
  ground.addImage(ground1)


  equator = createSprite(300,180,525,5)
  equator.visible = false
}
function SpawnClouds(){
  if(frameCount%60===0){

  var cloud = createSprite(390,50,30,10)
cloud.y = Math.round(random(50,100)) 
 cloud.addImage(clouds)
  cloud.velocityX = -3
  cloud.depth = Trex.depth
  Trex.depth = Trex.depth+1

  Clouds_group.add(cloud)



  }}
function draw(){
  background("lightblue")
 


  if(Game_state == PLAY){
    score += Math.round(frameCount/60)
    text("Score: " + score, width - 500,height - 500)
    Trex.changeAnimation("running")
    if (touches.length>0 || keyDown("space")&&(Trex.y>140)) {
      Trex.velocityY = -10
      jump.play()
touches = []
    }
 
    Trex.velocityY = Trex.velocityY + 0.5
 
  ground.velocityX = -(5+score/1000)
  
  if(ground.x < 0) {
    ground.x = ground.width/2
  }
    console.log(Trex.y)
 game_over.visible = false
 RESTART.visible = false  
 SpawnClouds()
 SpawnObstacles()
if(Obstacles_group.isTouching(Trex)){
  Game_state = END
  die.play()
}
  if(score%2000===0){
  
checkpoint.play()

  }
  } else if (Game_state === END){
    ground.velocityX = 0
    Obstacles_group.setVelocityXEach(0)
    Clouds_group.setVelocityXEach(0)
    Trex.veloctityY = 0
    Trex.changeAnimation("collided")
    game_over.visible = true 
    RESTART.visible = true


    text("Score: " + score, 200,20)
    if(mousePressedOver(RESTART)){
      Game_state = PLAY
      score = 0
      console.log("chocolate chip cookies")
      game_over.visible = false
      RESTART.visible = false
      Obstacles_group.destroyEach()
      Clouds_group.destroyEach()

    }

  }
  Trex.collide(equator)

  

drawSprites()

}



function SpawnObstacles(){
  if(frameCount%100===0){

    var obstacle = createSprite(width,160,10,30) 

    obstacle.velocityX = -(5+score/1000)
     var r = Math.round(random(1,6))
     switch(r){

         case 1 :
          obstacle.addImage(obs1)
          break
          case 2 :
          obstacle.addImage(obs2)
          break
          case 3 :
          obstacle.addImage(obs3)
          break
          case 4 :
          obstacle.addImage(obs4)
          break
          case 5 :
          obstacle.addImage(obs5)
          break
          case 6 :
          obstacle.addImage(obs6)
          break
          default: break
     }
     obstacle.scale=0.4
Obstacles_group.add(obstacle) }}


