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

class Background {
    constructor() {
        this.x = 0;
        this.y = 76;
        this.width = 500;
        this.height = 400;
        this.img = backgroundImg;
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class Zombie {
    constructor() {
        this.x = 30;
        this.y = 110;
        this.width = 90;
        this.height = 120;
        this.img = zombieImg;
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
    }
    draw() {
        console.log("draw da planta");
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        // if (this.width < 0) {
        //     gameOver();
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

window.onload = () => {
    ctx.drawImage(backgroundImg, 0, 30, 500, 400);

    startButton.addEventListener("click", (event) => {
        startGame();
    });

    function startGame() {
        let randomPlace = Math.floor(Math.random() * (460 - 100) + 100);

        const zombie = new Zombie();
        const plant = new Plant(randomPlace);
        const cookie = new Cookie(zombie.y);
        // const background = new Background();

        zombie.draw();
        plant.draw();
        cookie.draw();
        // background.draw();

        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowUp") {
                console.log("arrow-up");
                console.log(zombie.y);
                zombie.y -= 20;
                // break;
            }
        });
    }
};
// switch (e.key) {
//     case "ArrowUp": // to move Up
//         // console.log("arrow-Up")
//         zombie.y -= 20;
//         break;
//     case "ArrowDown": // to move Down
//         zombie.y += 20;
//         break;
//     case 90: // Z to Shoot
//         shoot();
//         //   bullet.sound.play();
//         break;
//         // default:
//   break;
// }
// });
// };