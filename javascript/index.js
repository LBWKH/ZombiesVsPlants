const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-game");
const resetButton = document.getElementById("reset");

const backgroundImg = new Image();
backgroundImg.src = "images/grassBackground.jpg";

const zombieImg = new Image();
zombieImg.src = "images/zombie.png";

const plantImg = new Image();
plantImg.src = "images/plant.png";

const cookieImg = new Image();
cookieImg.src = "images/cookiePink.png";

const gameOverImg = new Image();
gameOverImg.src = "images/game-over.png";

let backgroundSound = "sounds/background-music.mp3";
let slimeSound = "slime.wav";
let gameOverSound = "gameover.wav";

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
    this.sound = new Audio();
    this.sound.src = backgroundSound;
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

  // shoot(shooter) {
  //   shootsArr.unshift(new Cookie(shooter, this.attackDamage, this.x, this.y));
  // }

  shoot = (shootsArr) => {
    // shootsArr.push(new Cookie());
    // shoots--;
    // if (this.frames % 20 === 0) {
    //   let shootX = 50;

    // let minY = 0;
    // let maxY = canvas.height - 150;
    // let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

    const cookie = new Cookie(this.x + 50, this.y + 45, 1.5, 33.34);
    shootsArr.push(cookie);

    // this.plantTeam.push(plant);
    // }
  };

  draw() {
    ctx.drawImage(this.img, this.x, this.y, 90, 120);
  }
}

class Plant {
  constructor(y, speed, health) {
    this.x = 430;
    this.y = y;
    this.width = 70;
    this.height = 90;
    this.img = plantImg;
    this.speed = speed;
    this.health = health;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    // if (this.x < 0) {
    //   gameOver();
  }

  move() {
    this.x += this.speed;
  }

  receiveDamage(damage) {
    this.health -= damage;
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
}

class Cookie {
  constructor(x, y, speed, damage) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 20;
    this.img = cookieImg;
    this.damage = damage;
    this.speed = speed;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  move() {
    this.x += this.speed;
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
    this.score = 0;
    this.animationId = 0;
    this.plantTeam = [];
    this.shoots = 1000;
    this.shootsArr = [];
  }
  updateGameArea = () => {
    ctx.clearRect(0, 0, 500, 460);

    this.background.draw();
    this.spawnPlants();

    this.zombie.newPos();
    this.zombie.draw();

    this.updateShots();

    this.checkCollision();
    this.checkGameOver();

    this.updateScore(this.score);

    this.animationId = requestAnimationFrame(this.updateGameArea);
  };
  spawnPlants = () => {
    this.frames++;

    if (this.frames % 30 === 0) {
      this.score++;
    }

    this.plantTeam.map((plant) => {
      plant.draw();
      plant.move();
    });

    if (this.frames % 90 === 0) {
      let minY = 0;
      let maxY = canvas.height - 150;
      let y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

      const plant = new Plant(y, -1.5, 100);

      this.plantTeam.push(plant);
    }
  };

  updateShots = () => {
    this.shootsArr.map((shoot) => {
      shoot.draw();
      shoot.move();
    });
  };

  updateScore = (score) => {
    ctx.font = "20px Bangers";
    ctx.fillStyle = "white";

    ctx.fillText(`Score ${this.score}`, 70, 20);
  };

  checkCollision = () => {
    for (let i = 0; i < this.shootsArr.length; i++) {
      for (let j = 0; j < this.plantTeam.length; j++) {
        if (this.shootsArr[i].crashWith(this.plantTeam[j]) === true) {
          this.plantTeam[j].receiveDamage(this.shootsArr[i].damage);
          this.shootsArr.splice(i, 1);
          if (this.plantTeam[j].health <= 0) {
            this.plantTeam.splice(j, 1);
          }
        }
      }
    }
  };

  checkGameOver = () => {
    for (let i = 0; i < this.plantTeam.length; i++) {
      if (this.plantTeam[i].x < 0) {
        cancelAnimationFrame(this.animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(gameOverImg, 0, 0, 500, 460);
        // this.updateScore.stop();
      }
    }
  };
}

window.onload = () => {
  ctx.drawImage(backgroundImg, 0, 0, 500, 460);

  startButton.addEventListener("click", (event) => {
    startGame();
  });

  resetButton.addEventListener("click", (event) => {
    window.location.reload();
  });

  function startGame() {
    const zombie = new Zombie();
    const background = new Background();

    const game = new Game(zombie, background);

    game.updateGameArea();
    game.spawnPlants();

    // gameOver = () => {
    //   cancelAnimationFrame(game.animationId);
    //   game.spawnPlants.stop();
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
    //   ctx.drawImage(gameOverImg, 0, 0, 500, 460);
    // };

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
          game.zombie.shoot(game.shootsArr);
          break;
      }
    });
  }
};
