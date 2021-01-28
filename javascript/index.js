const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gameArea = document.getElementById("game-area");
const startButton = document.getElementById("start-game");
const resetButton = document.getElementById("reset");

const backgroundAudio = new Audio();
backgroundAudio.src = "sounds/background-music.mp3";
backgroundAudio.volume = 0.3;

const gameOverAudio = new Audio();
gameOverAudio.src = "sounds/gameover.wav";
gameOverAudio.volume = 0.7;

const slimeAudio = new Audio();
slimeAudio.src = "sounds/slime.wav";
slimeAudio.volume = 1.0;

const backgroundImg = new Image();
backgroundImg.src = "images/grassBackground.jpg";

const zombieImg1 = new Image();
zombieImg1.src = "images/Attack1.png";

const zombieImg2 = new Image();
zombieImg2.src = "images/Attack2.png";

const zombieImg3 = new Image();
zombieImg3.src = "images/Attack3.png";

const zombieImg4 = new Image();
zombieImg4.src = "images/Attack4.png";

const zombieImg5 = new Image();
zombieImg5.src = "images/Attack5.png";

const zombieImg6 = new Image();
zombieImg6.src = "images/Attack6.png";

const zombieImg7 = new Image();
zombieImg7.src = "images/Attack7.png";

const zombieImg8 = new Image();
zombieImg8.src = "images/Attack8.png";

const plantImg1 = new Image();
plantImg1.src = "images/plant1.png";

const plantImg2 = new Image();
plantImg2.src = "images/plant2.png";

const cookieImg = new Image();
cookieImg.src = "images/cookiePink.png";

const gameOverImg = new Image();
gameOverImg.src = "images/game-over.png";

let spriteCount = 0;
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
  constructor(spriteCount) {
    this.x = 30;
    this.y = 110;
    this.width = 90;
    this.height = 120;
    this.speed = 0;
    this.spriteCount = 0;
  }
  newPos() {
    this.y += this.speed;
  }

  shoot = (shootsArr) => {
    const cookie = new Cookie(this.x + 50, this.y + 45, 1.5, 33.34);
    shootsArr.push(cookie);
  };

  draw() {
    if (this.spriteCount < 4) {
      ctx.drawImage(zombieImg1, this.x, this.y, 90, 120);
      this.spriteCount += 1;
    } else if (this.spriteCount < 8) {
      ctx.drawImage(zombieImg2, this.x, this.y, 90, 120);
      this.spriteCount += 1;
    } else if (this.spriteCount < 12) {
      ctx.drawImage(zombieImg3, this.x, this.y, 90, 120);
      this.spriteCount += 1;
    } else if (this.spriteCount < 16) {
      ctx.drawImage(zombieImg4, this.x, this.y, 90, 120);
      this.spriteCount += 1;
    } else if (this.spriteCount < 20) {
      ctx.drawImage(zombieImg5, this.x, this.y, 90, 120);
      this.spriteCount += 1;
    } else if (this.spriteCount < 24) {
      ctx.drawImage(zombieImg6, this.x, this.y, 90, 120);
      this.spriteCount += 1;
    } else if (this.spriteCount < 28) {
      ctx.drawImage(zombieImg7, this.x, this.y, 90, 120);
      this.spriteCount += 1;
    } else if (this.spriteCount < 32) {
      ctx.drawImage(zombieImg8, this.x, this.y, 90, 120);
      this.spriteCount += 1;
    } else {
      ctx.drawImage(zombieImg1, this.x, this.y, 90, 120);
      this.spriteCount = 0;
    }
  }
}

class Plant {
  constructor(y, speed, health, spriteCount) {
    this.x = 430;
    this.y = y;
    this.width = 70;
    this.height = 90;
    this.speed = speed;
    this.health = health;
    this.spriteCount = 0;
  }
  draw() {
    if (this.spriteCount < 6) {
      ctx.drawImage(plantImg1, this.x, this.y, this.width, this.height);
      this.spriteCount += 1;
    } else if (this.spriteCount < 16) {
      ctx.drawImage(plantImg2, this.x, this.y, this.width, this.height);
      this.spriteCount += 1;
    } else {
      ctx.drawImage(plantImg1, this.x, this.y, this.width, this.height);
      this.spriteCount = 0;
    }
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
    backgroundAudio.play();
    this.spawnPlants();

    this.zombie.newPos();
    this.zombie.draw();

    this.updateShots();

    this.checkCollision();

    this.updateScore(this.score);

    this.animationId = requestAnimationFrame(this.updateGameArea);
    this.checkGameOver();
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

      const plant = new Plant(y, -2.0, 100);

      this.plantTeam.push(plant);
    }
  };

  updateShots = () => {
    this.shootsArr.map((shoot) => {
      shoot.draw();
      shoot.move();
      slimeAudio.play();
    });
  };

  updateScore = (score) => {
    ctx.font = "20px Bangers";
    ctx.fillStyle = "white";

    ctx.fillText(`Score :  ${this.score}`, 70, 20);
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
        backgroundAudio.pause();
        gameOverAudio.play();
        ctx.font = "20px Bangers";
        ctx.fillStyle = "white";
        ctx.fillText(`Score :  ${this.score}`, 70, 20);
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
    const zombie = new Zombie(0);
    const background = new Background();
    spriteCount = 0;
    const game = new Game(zombie, background);

    game.updateGameArea();
    game.spawnPlants();

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          game.zombie.y -= 35;
          break;
        case "ArrowDown":
          game.zombie.y += 35;
          break;
        case "z":
          game.zombie.shoot(game.shootsArr);
          break;
      }
    });
  }
};
