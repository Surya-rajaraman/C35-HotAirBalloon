var balloon, balloonImg;
var bgImg;
var database, height;

function preload()
{
   bgImg = loadImage("images/Hot Air Ballon-01.png")
   balloonImg = loadAnimation("images/Hot Air Ballon-02.png", "images/Hot Air Ballon-03.png", "images/Hot Air Ballon-04.png")
}
function setup() {
  database = firebase.database();
  createCanvas(1500,700);

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("balloonFly", balloonImg);
  balloon.scale = 0.3;

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readPosition, showErrow)
}

function draw() {
  background(bgImg);  

  if(keyDown(LEFT_ARROW))
  {
    updateHeight(-10,0)
    balloon.addAnimation("balloonFly", balloonImg);
  }
  else if(keyDown(RIGHT_ARROW))
  {
    updateHeight(10,0)
    balloon.addAnimation("balloonFly", balloonImg);
  }
 else if(keyDown(DOWN_ARROW))
  {
    updateHeight(0,+10)
    balloon.addAnimation("balloonFly", balloonImg);
    balloon.scale = balloon.scale + 0.005;
  }
 else if(keyDown(UP_ARROW))
  {
    updateHeight(0,-10)
    balloon.addAnimation("balloonFly", balloonImg);
    balloon.scale = balloon.scale - 0.005;
  }

  drawSprites();

  fill("red");
  textSize(20);
  stroke("black");
  text("Use arrow keys to move Hot Air Balloon!", 20,40)
}

function updateHeight(x,y)
{
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readPosition(data)
{
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;
}

function showErrow()
{
  console.log("Error in writing to the database");
}