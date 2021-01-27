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
let shoots = 1000;
let shootsArr = [];

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
    this.x = 50;
    this.y = y;
    this.width = 25;
    this.height = 20;
    this.img = cookieImg;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  move() {
    this.x += 5;
  }
  collision(obstacle) {
    return !(
      this.x < obstacle.x ||
      this.x > obstacle.x ||
      this.y < obstacle.y ||
      this.y > obstacle.y
    );
  }
}

class Game {
  constructor(zombie, background) {
    this.zombie = zombie;
    this.background = background;
    this.frames = 0;
    this.animationId = 0;
    this.plantTeam = [];
  }
  updateGameArea = () => {
    ctx.clearRect(0, 0, 500, 460);

    this.background.draw();
    this.spawnPlants();

    this.zombie.newPos();
    this.zombie.draw();

    this.animationId = requestAnimationFrame(this.updateGameArea);
  };
  spawnPlants = () => {
    this.frames++;
    this.plantTeam.map((plant) => {
      plant.move();
      plant.draw();
    });

    if (this.frames % 90 === 0) {
      let x = 100;

      let minY = 0;
      let maxY = canvas.height - 80;
      let y = Math.floor(Math.random() * (maxY - minY + 1) + minY);

      const plant = new Plant(x, y, 90, 120);

      this.plantTeam.push(plant);
    }
  };
  shoot = () => {
    shootsArr.push(new Cookie());
    shoots--;
  };

  checkGameOver = () => {
    const invaded = this.plants.some((obstacle) => {
      return this.player.isCrashedWith(obstacle);
    });
  };
}

window.onload = () => {
  ctx.drawImage(backgroundImg, 0, 0, 500, 460);

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
    game.spawnPlants();

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp": // to move Up
          console.log("arrow-Up");
          game.zombie.y -= 35;
          break;
        case "ArrowDown": // to move Down
          game.zombie.y += 35;
          break;
        case "z": // Z to Shoot
          console.log("shooting");
          game.shoot();
          break;
      }
    });
  }
};
