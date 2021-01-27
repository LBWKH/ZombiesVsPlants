const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameArea = document.getElementById("game-area");
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
    // this.attackDamage = attackDamage;
  }
  newPos() {
    this.y += this.speed;
  }

  shoot(shooter) {
    shootsArr.unshift(new Cookie(shooter, this.attackDamage, this.x, this.y));
  }

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 90, 120);
  }
}

class Plant {
  constructor(y, speed) {
    this.x = 430;
    this.y = y;
    this.width = 70;
    this.height = 90;
    this.img = plantImg;
    this.speed = speed;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x += this.speed;
  }
}

class Cookie {
  constructor(y, damage) {
    this.x = 50;
    this.y = y;
    this.width = 25;
    this.height = 20;
    this.img = cookieImg;
    this.damage = damage;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  move() {
    this.x += 5;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  crashWith(obstacle) {
    if (obstacle.health <= 0) {
      return false;
    }

    return !(
      this.bottom() < obstacle.top() ||
      this.top() > obstacle.bottom() ||
      this.right() < obstacle.left() ||
      this.left() > obstacle.right()
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
      plant.draw();
      plant.move();
    });

    if (this.frames % 180 === 0) {
      let x = 200;

      let minY = 0;
      let maxY = canvas.height - 150;
      let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      const plant = new Plant(y, -0.5);

      this.plantTeam.push(plant);
    }
  };
  // shoot = () => {
  //   shootsArr.push(new Cookie());
  //   shoots--;
  // };

  checkGameOver = () => {
    if (this.plant.x === 0) {
      return true;
    } else {
      return false;
    }
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
