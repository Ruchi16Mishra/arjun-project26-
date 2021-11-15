const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var playerArrows = [];
var board, board_2, b_Img;//, boardA = [];



function preload() {
  backgroundImg = loadImage("./assets/background.png");
  baseimage = loadImage("./assets/base.png");
  playerimage = loadImage("./assets/player.png");
  b_Img = loadImage ("./assets/board.png");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  var winW = windowWidth;
  var winH = windowHeight; 

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);

  var options = {
    isStatic: true
  };

  playerBase = Bodies.rectangle(200, 350, 180, 150, options);
  World.add(world, playerBase);

  player = Bodies.rectangle(250, playerBase.position.y - 160, 50, 180, options);
  World.add(world,player)

  playerArcher = new PlayerArcher(
    340,
    playerBase.position.y - 112,
    120,
    120
  );

  board = new Board (
    Math.round(random(winW - 200, winW - 75)),
    Math.round(random(75, winH - 300)),
    75,
    75,
    b_Img
  );
  board_2 = new Board (
    Math.round(random(winW - 200, winW - 75)),
    Math.round(random(375, winH - 75)),
    75, 
    75,
    b_Img    
  );

  //boardA.push (board);
  //boardA.push (board_2);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);
  image(baseimage,playerBase.position.x,playerBase.position.y,180,150)
  image(playerimage,player.position.x,player.position.y,50,180)

  playerArcher.display();
  board.display ();
  board_2.display ();

  for (var x = 0; x < playerArrows.length; x++) {
    if (playerArrows[x] !== undefined) {
      playerArrows[x].display();


          var b1 = Matter.SAT.collides(board.body, playerArrows[x].body);
          var b2 = Matter.SAT.collides(board_2.body, playerArrows[x].body);
          
        if (b1.collided || b2.collided) {
          if (!playerArrows[x].isRemoved) {
          playerArrows [x].remove (x);}
          else{
            playerArrows[x].trajectory = [];
          }
          //boardA [i].remove (i);
        }
        }
        
      }
    
  

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);
}

function keyPressed() {
  if (keyCode === 32) {
    var posX = playerArcher.body.position.x;
    var posY = playerArcher.body.position.y;
    var angle = playerArcher.body.angle;
    //console.log(angle);

    var arrow = new PlayerArrow(posX, posY, 100, 10, angle);
    arrow.trajectory = [];
    Matter.Body.setAngle(arrow.body, angle);
    playerArrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (playerArrows.length) {
      var angle = playerArcher.body.angle;
      playerArrows[playerArrows.length - 1].shoot(angle);
    }
  }
}
