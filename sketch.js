// ball variables
let xBall = 300;
let yBall = 200;
let radius = 11;
let diameter = radius * 2;

// ball speed variables
let velocityXBall = 6;
let velocityYBall = 6;

// racket players variables
let xPlayerOneRacket = 5;
let yPlayerOneRacket = 150;

let xPlayerTwoRacket = 585;
let yPlayerTwoRacket = 150;

let widthRacket = 10;
let heightRacket = 90;

let hit = false;

// game score
let playerTwoPoints = 0;
let playerOnePoints = 0;

// game sounds
let pointSound;
let racketSound;
let soundtrack;

function preload() {
  pointSound = loadSound("./assets/pointSound.wav");
  racketSound = loadSound("./assets/racketSound.wav");
  soundtrack = loadSound("./assets/soundtrack.wav");
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(0);
  ball();
  ballMovement();
  borderCollision();
  racket(xPlayerOneRacket, yPlayerOneRacket);
  movePlayerOneRacket();
  racketCollision(xPlayerOneRacket, yPlayerOneRacket);
  racket(xPlayerTwoRacket, yPlayerTwoRacket);
  movePlayerTwoRacket();
  racketCollision(xPlayerTwoRacket, yPlayerTwoRacket);
  includesScoreboard();
  scorePoints();
  gameOver();
}

function ball() {
  circle(xBall, yBall, diameter);
}

function ballMovement() {
  xBall += velocityXBall;
  yBall += velocityYBall;
}

function borderCollision() {
  if (xBall + radius > width || xBall - radius < 0) {
    velocityXBall *= -1;
  }

  if (yBall + radius > height || yBall - radius < 0) {
    velocityYBall *= -1;
  }
}

function racket(x, y) {
  rect(x, y, widthRacket, heightRacket);
}

function racketCollision(x, y) {
  hit = collideRectCircle(
    x,
    y,
    widthRacket,
    heightRacket,
    xBall,
    yBall,
    radius
  );

  if (hit) {
    velocityXBall *= -1;
    racketSound.play();
  }
}

function movePlayerOneRacket() {
  if (keyIsDown(87)) {
    yPlayerOneRacket -= 10;
  }

  if (keyIsDown(83)) {
    yPlayerOneRacket += 10;
  }
}

function movePlayerTwoRacket() {
  if (keyIsDown(UP_ARROW)) {
    yPlayerTwoRacket -= 10;
  }

  if (keyIsDown(DOWN_ARROW)) {
    yPlayerTwoRacket += 10;
  }
}

function includesScoreboard() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(220, 20, 60));
  rect(400, 10, 40, 20);
  fill(255);
  text(playerOnePoints, 420, 26);
  fill(color(30, 144, 255));
  rect(150, 10, 40, 20);
  fill(255);
  text(playerTwoPoints, 170, 26);
}

function scorePoints() {
  if (xBall > 590) {
    playerTwoPoints += 1;
    pointSound.play();
  }
  if (xBall < 10) {
    playerOnePoints += 1;
    pointSound.play();
  }
}

function gameOver() {
  let winner;

  if (playerOnePoints >= 10) {
    winner = "Game over! Player 1 won :D";
  } else if (playerTwoPoints >= 10) {
    winner = "Game over! Player 2 won :D";
  }

  function stopTheGame(winner) {
    fill(color((54, 54, 54)));
    rect(0, 0, 600, 400);

    noStroke();
    fill(255);
    textSize(25);
    textStyle(BOLD);
    text(winner, 300, 200);
    textAlign(CENTER, CENTER);

    velocityXBall = 0;
    velocityYBall = 0;
    xBall = 300;
    yBall = 200;
    soundtrack.stop();
    pointSound.stop();
    racketSound.stop();
  }

  if (playerOnePoints >= 10) {
    stopTheGame(winner);
  }

  if (playerTwoPoints >= 10) {
    stopTheGame(winner);
  }
}
