const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const progressBar = document.querySelector("#health");
const ammoBar = document.querySelector("#ammo");

let frameNumber = 0;

function startGame() {
  if (progressBar.value === 0 || ammoBar.value === 100) {
    progressBar.value = 100;
    ammoBar.value = 50;
    Object.assign(player, { x: canvas.width / 2, y: canvas.height / 2 });
    requestAnimationFrame(drawScene);
  }
}

function distanceBetween(sprite1, sprite2) {
  return Math.hypot(sprite1.x - sprite2.x, sprite1.y - sprite2.y);
}

function lengthBetween(sprite1, legislation) {
  return Math.hypot(sprite1.x - legislation.x, sprite1.y - legislation.y);
}

function randomPoint() {
  console.log(frameNumber);
  legislation.x = Math.floor(550 * Math.random());
  legislation.y = Math.floor(550 * Math.random());
}

function haveCollided(sprite1, sprite2) {
  return distanceBetween(sprite1, sprite2) < sprite1.radius + sprite2.radius;
}

function gainPoints(sprite1, legislation) {
  return (
    lengthBetween(sprite1, legislation) < sprite1.radius + legislation.radius
  );
}

class Sprite {
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

class Legislation {
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(
      this.x - this.size / 2,
      this.y - this.size / 2,
      this.size,
      this.size
    );
    ctx.fill();
    ctx.stroke();
  }
  constructor(x, y, size, color) {
    Object.assign(this, { x, y, size, color });
    this.radius = size;
  }
}

let legislation = new Legislation(
  canvas.height / 4,
  canvas.width / 3,
  25,
  "rgba(0, 127, 255, 0.87)"
);

class Player extends Sprite {
  constructor(x, y, radius, color, speed) {
    super();
    Object.assign(this, { x, y, radius, color, speed });
  }
}

let player = new Player(250, 150, 15, "rgba(127, 255, 0, 0.87)", 0.07);

class Enemy extends Sprite {
  constructor(x, y, radius, color, speed) {
    super();
    Object.assign(this, { x, y, radius, color, speed });
  }
}

let enemies = [
  new Enemy(300, 200, 20, "rgb(255, 5, 5)", 0.02),
  new Enemy(300, 250, 17, "rgb(255, 130, 5)", 0.01),
  new Enemy(300, 180, 22, "rgb(255, 255, 5)", 0.002)
];

let mouse = { x: 0, y: 0 };
document.body.addEventListener("mousemove", updateMouse);
function updateMouse(event) {
  const { left, top } = canvas.getBoundingClientRect();
  mouse.x = event.clientX - left;
  mouse.y = event.clientY - top;
}

function moveToward(leader, follower, speed) {
  follower.x += (leader.x - follower.x) * speed;
  follower.y += (leader.y - follower.y) * speed;
}

function updateScene() {
  moveToward(mouse, player, player.speed);
  enemies.forEach(enemy => moveToward(player, enemy, enemy.speed));
  enemies.forEach(enemy => {
    if (haveCollided(enemy, player)) {
      progressBar.value -= 1;
    }
  });
  if (gainPoints(legislation, player)) {
    ammoBar.value += 2;
  }
}

function clearBackground() {
  ctx.fillStyle = "rgba(173, 91, 255, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawStartScreen() {
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "Bungee";
  ctx.textAllign = "center";
  ctx.fillText("click to start", canvas.width / 2, canvas.height / 2);
  canvas.addEventListener("click", startGame);
}

function drawScene() {
  clearBackground();
  player.draw();
  legislation.draw();
  enemies.forEach(enemy => enemy.draw());
  updateScene();
  frameNumber += 1;
  if (frameNumber % 100 < 1) {
    randomPoint();
  }

  if (ammoBar.value === 100) {
    ctx.font = "20px Bungee";
    ctx.fillStyle = "blue";
    ctx.fillText("You won! Click to restart.", 30, canvas.height / 2);
  } else if (progressBar.value <= 0) {
    ctx.font = "20px Bungee";
    ctx.fillStyle = "blue";
    ctx.fillText(
      "Game over. Click to restart.",
      canvas.width / 4,
      canvas.height / 2
    );
  } else {
    requestAnimationFrame(drawScene);
  }
}

canvas.addEventListener("click", startGame);

requestAnimationFrame(drawStartScreen);
requestAnimationFrame(drawScene);

