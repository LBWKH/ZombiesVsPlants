const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-game");

const backgroundImg = new Image();
backgroundImg.src = "images/grassBackground.jpg";

const zombieImg = new Image();
zombieImg.src = "images/zombie.png";

const plantImg = new Image();
plantImg.src = "images/plant.png";

const cookieImg = new Image();
cookieImg.src = "images/cookiePink.png";

let frames = 0;
let score = 0;

class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 500;
    this.height = 460;
    this.img = backgroundImg;
    this.speed = 3;
  }
  
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    if (this.speed >= 0) {
      ctx.drawImage(
        backgroundImg,
        this.x,
        this.y - canvas.height,
        this.width,
        this.height
      );
    }
  }
}

class Zombie {
  constructor() {
    this.x = 30;
    this.y = 110;
    this.width = 90;
    this.height = 120;
    this.img = zombieImg;
    this.speed = 0;
  }
  newPos() {
    this.y += this.speed;
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 90, 120);
  }
}

class Plant {
  constructor(y) {
    this.x = 400;
    this.y = y;
    this.width = 90;
    this.height = 120;
    this.img = plantImg;
    this.speed = 0;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

  }
  move() {
    this.x += this.speed;
  }
}

class Cookie {
  constructor(y) {
    this.x = 40;
    this.y = y;
    this.width = 25;
    this.height = 20;
    this.img = cookieImg;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Game {
  constructor(zombie, background) {
    this.zombie = zombie;
    this.background = background;
    this.animationId = 0;
    this.plantTeam = [];

  }
  updateGameArea = () => {
    ctx.clearRect(0, 0, 500, 460);

    this.background.draw();

    this.zombie.newPos();
    this.zombie.draw();

    this.animationId = requestAnimationFrame(this.updateGameArea);
  };
  spawnPlants = () => {

  }
}

window.onload = () => {
  ctx.drawImage(backgroundImg, 0, 30, 500, 400);

  startButton.addEventListener("click", (event) => {
    startGame();
  });

  function startGame() {
    let randomPlace = Math.floor(Math.random() * (460 - 200));

    const zombie = new Zombie();
    const plant = new Plant(randomPlace);
    const cookie = new Cookie(zombie.y);
    const background = new Background();

    const game = new Game(zombie, background);

    game.updateGameArea();

    document.addEventListener("keydown", (e) => {
      // [TESTE]
      // if (e.key === "ArrowUp") {
      //   console.log("arrow-up");
      //   console.log(zombie.y);
      //   zombie.y -= 20;
      // break;
      //       }
      //     });
      //   }
      // };
      switch (e.key) {
        case "ArrowUp": // to move Up
          console.log("arrow-Up");
          game.zombie.y -= 20;
          break;
        case "ArrowDown": // to move Down
          game.zombie.y += 20;
          break;
        case 90: // Z to Shoot
          // shoot();
          break;
      }
    });
  }
};
