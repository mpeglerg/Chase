const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'lime'
ctx.lineWidth = 5;
//ctx.fillRect(50,100,20,70);

let ball = {x: 250, y: 150, dx: 0.3, dy: 3.19, radius: 25, color: "blue"};
let mouse = { x: 0, y: 0 };
let enemy = {x: 250, y:250, width:30, color: "gold"};

function updateMouse(event) {
  const {left, top} = canvas.getBoundingClientRect();
  mouse.x = event.clientX - left;
  mouse.y = event.clientY - top;
  console.log(mouse.x, mouse.y);
}


document.body.addEventListener('mousemove', updateMouse);

function clearBackground() {
  ctx.fillStyle = "DarkOrchid";
  ctx.fillRect(0,0, canvas.width, canvas.height);
}

function drawBall() {
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
  ctx.fill();
  ctx.stroke();  
}

function drawEnemy() {
  ctx.fillStyle = enemy.color;
  ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.width );
}

function moveToward(leader, follower, speed,) {
  follower.x += (leader.x - follower.x) * speed;
  follower.y += (leader.y - follower.y) * speed;
}

function updateScene() {
  moveToward(mouse, ball, 0.5);
  moveToward(ball, enemy, 0.1);
}


function drawScene() {
  clearBackground();
  drawBall();
  updateScene();
  requestAnimationFrame(drawScene);
  drawEnemy();
}

requestAnimationFrame(drawScene);