let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let startBtn = document.querySelector("#start");
let restartBtn = document.querySelector("#restart");
let splashScreen = document.querySelector("#splash");
let GOScreen = document.querySelector("#gameOver");
let winScreen = document.querySelector("#win");
let ScoreDisplay = document.querySelector("#score");
let ScoreWinDisplay = document.querySelector("#scoreWin");
let isGameOver = false;
let hasWon = false;
let intervalId = 0;
let isArrowUp = false,
  isArrowDown = false;
let isSpaceDown = false;

//audio
let audio = new Audio("./img/Mystery Forest.mp3");

//images
let bg = new Image();
bg.src = "./img/bg.jpg";

let road = new Image();
road.src = "./img/road.png";
//main character:
let san = new Image();
san.src = "./img/San.png";
//the white forest spirits to score:
let spir1 = new Image();
spir1.src = "./img/spirit1.png";

let spir2 = new Image();
spir2.src = "./img/spirit2.png";

let spir3 = new Image();
spir3.src = "./img/spirit3.png";

let spir4 = new Image();
spir4.src = "./img/spirit_4.png";

let spir5 = new Image();
spir5.src = "./img/spirit_5.png";

let spir6 = new Image();
spir6.src = "./img/spirit_6.png";
//Villians:
let vil1 = new Image();
vil1.src = "./img/villain1.png";

let vil2 = new Image();
vil2.src = "./img/villain2.png";

let vil3 = new Image();
vil3.src = "./img/villain3.png";

let sanX = 10,
  sanY = 300,
  sanW = 250,
  sanH = 150,
  roadX = 0,
  roadY = 380;

function draw() {
  startBtn.style.display = "none";
  // splashScreen.style.display = "none";
  //winScreen.style.display = "none";
  //GOScreen.style.display = "none";
  ctx.drawImage(bg, 0, 0);
  ctx.drawImage(road, roadX, roadY);
  ctx.drawImage(san, sanX, sanY, sanW, sanH);
  animate();
  drawVillains();
  drawSpirits();
  scoringDisplay();

  if (score == 2) {
    hasWon = true;
  }

  if (hasWon) {
    cancelAnimationFrame(intervalId);
    canvas.style.display = "none";
    startBtn.style.display = "none";
    restartBtn.style.display = "block";
    audio.pause();
    GOScreen.style.display = "none";
    winScreen.style.display = "block";
    ScoreWinDisplay.innerHTML = `YOUR SCORE:${score}`;
  } else if (isGameOver) {
    cancelAnimationFrame(intervalId);
    canvas.style.display = "none";
    splashScreen.style.display = "none";
    winScreen.style.display = "none";
    restartBtn.style.display = "block";
    startBtn.style.display = "none";
    audio.pause();
    GOScreen.style.display = "block";
    ScoreDisplay.innerHTML = `YOUR SCORE:${score}`;
  } else {
    intervalId = requestAnimationFrame(draw);
  }
}

//move san:
document.addEventListener("keydown", (event) => {
  if (event.code == "ArrowUp") {
    isArrowUp = true;
    isArrowDown = false;
    isSpaceDown = false;
  } else if (event.code == "ArrowDown") {
    isArrowUp = false;
    isArrowDown = true;
    isSpaceDown = false;
  } else if (event.code == "Space") {
    isSpaceDown = true;
    isArrowUp = false;
    isArrowDown = false;
  }
});

document.addEventListener("keyup", () => {
  isArrowUp = false;
  isArrowDown = false;
  isSpaceDown = false;
});
//Animate:
function animate() {
  //=> move san

  if (isArrowUp && sanY + 0.5 * sanH > roadY) {
    sanY = sanY - 5;
  }
  if (isArrowDown && sanY + sanH < roadY + road.height) {
    sanY = sanY + 5;
  }
  if (isSpaceDown && sanY + sanH < canvas.height + 30 && sanY > bg.y + 30) {
    sanY = sanY - 15;
  }
  if (sanY + sanH < roadY + 70) {
    sanY = sanY + 8;
  }
}

// START
window.addEventListener("load", () => {
  canvas.style.display = "none";
  GOScreen.style.display = "none";
  winScreen.style.display = "none";
  restartBtn.style.display = "none";

  startBtn.addEventListener("click", () => {
    // click on start: Canvas appears, startbtn gone
    //start();{}
    draw();
    splashScreen.style.display = "none";
    canvas.style.display = "block";
    audio.play();
    //ctx.drawImage(san, 10, 300, 250, 150);
  });

  restartBtn.addEventListener("click", () => {
    // do something when the user clicks the restart button
    restart();
    GOScreen.style.display = "none";
    canvas.style.display = "block";
    winScreen.style.display = "none";
    splashScreen.style.display = "none";
    audio.currentTime = 0;
    audio.play();
  });
});

function restart() {
  isGameOver = false;
  hasWon = false;
  score = 0;
  (sanX = 10), (sanY = 300);
  vilCoord = [
    { img: vil1, x: canvas.width, y: 280 },
    { img: vil2, x: canvas.width + 700, y: 390 },
    { img: vil3, x: canvas.width + 1200, y: 500 },
  ];
  spirCoord = [
    { img: spir1, x: canvas.width, y: 80 },
    { img: spir2, x: canvas.width + 800, y: 170 },
    { img: spir3, x: canvas.width + 200, y: 250 },
    { img: spir5, x: canvas.width + 1500, y: 130 },
    { img: spir4, x: canvas.width + 1800, y: 200 },
    { img: spir6, x: canvas.width + 2100, y: 300 },
  ];
  restartBtn.style.display = "none";
  draw();
}
