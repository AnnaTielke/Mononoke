//Array of villians

let vilImg = [vil1, vil2, vil3];
let vilCoord = [
  { img: vil1, x: canvas.width, y: 280 },
  { img: vil2, x: canvas.width + 700, y: 370 },
  { img: vil3, x: canvas.width + 1300, y: 450 },
];

function drawVillains() {
  for (let i = 0; i < vilImg.length; i++) {
    ctx.drawImage(vilCoord[i].img, vilCoord[i].x, vilCoord[i].y);

    vilCoord[i].x = vilCoord[i].x - 5;

    if (vilCoord[i].x + vilImg[i].width < 0) {
      vilCoord[i] = {
        img: vilImg[Math.floor(Math.random() * vilImg.length)],
        x: canvas.width + 300,
        y: 0.5 * canvas.height + Math.floor(Math.random() * road.height),
      };
    }
    //*collision

    if (
      sanX + sanW > vilCoord[i].x &&
      sanX < vilCoord[i].x + vilImg[i].width &&
      sanY < vilCoord[i].y + vilImg[i].height &&
      sanY + sanH > vilCoord[i].y
    ) {
      isGameOver = true;
    }
  }
}
// forest spirits
let spirImg = [spir1, spir2, spir3, spir5, spir4, spir6];
let spirCoord = [
  { img: spir1, x: canvas.width, y: 80 },
  { img: spir2, x: canvas.width + 800, y: 170 },
  { img: spir3, x: canvas.width + 1200, y: 250 },
  { img: spir5, x: canvas.width + 1500, y: 130 },
  { img: spir4, x: canvas.width + 1800, y: 200 },
  { img: spir6, x: canvas.width + 2100, y: 300 }
];

let score = 0;

function drawSpirits() {
  for (let i = 0; i < spirImg.length; i++) {
    ctx.drawImage(spirCoord[i].img, spirCoord[i].x, spirCoord[i].y);

    spirCoord[i].x = spirCoord[i].x - 4;

    if (spirCoord[i].x + spirImg[i].width < 0) {
      spirCoord[i] = {
        img: spirImg[Math.floor(Math.random() * spirImg.length)],
        x: canvas.width + 100,
        y: Math.floor(Math.random() * canvas.height),
      };
    }
    //*collision

    if (
      sanX + sanW > spirCoord[i].x &&
      sanX < spirCoord[i].x + spirImg[i].width &&
      sanY < spirCoord[i].y + spirImg[i].height &&
      sanY + sanH > spirCoord[i].y
    ) {
      score += 1;
      console.log(score);
      spirCoord[i] = {
        img: spirImg[Math.floor(Math.random() * spirImg.length)],
        x: canvas.width + 100,
        y: canvas.height + Math.floor(Math.random() * road.height),
      };
    }
  }
}

function scoringDisplay() {
  ctx.fillStyle = "#ffffff";
  ctx.font = "25px Verdana, Arial";
  ctx.fillText(`SCORE: ${score}`, 50, canvas.height - 550);
}
