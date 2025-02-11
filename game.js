const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = 480;
canvas.height = 320;

// Define game variables
const frogWidth = 30;
const frogHeight = 30;
const roadHeight = 100;
const laneHeight = 50;
let frogX = canvas.width / 2 - frogWidth / 2;
let frogY = canvas.height - frogHeight - 10;
let frogSpeed = 40;
let isGameOver = false;
let lanes = [];

// Define game objects and initialize
function init() {
  lanes = [
    { y: 50, speed: 1, direction: 1 },   // Lane 1 (cars moving right)
    { y: 100, speed: 1, direction: -1 },  // Lane 2 (cars moving left)
    { y: 150, speed: 1.5, direction: 1 }, // Lane 3 (cars moving right)
    { y: 200, speed: 2, direction: -1 },  // Lane 4 (cars moving left)
    { y: 250, speed: 2, direction: 1 },   // Lane 5 (cars moving right)
  ];
}

// Draw the frog on the canvas
function drawFrog() {
  ctx.fillStyle = "#0f0";
  ctx.fillRect(frogX, frogY, frogWidth, frogHeight);
}

// Draw the lanes and cars
function drawLanes() {
  lanes.forEach(lane => {
    ctx.fillStyle = "#ff4500";
    ctx.fillRect(0, lane.y, canvas.width, laneHeight);
    // Draw the car moving on the lane
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(lane.direction === 1 ? lane.y : canvas.width - 60, lane.y + laneHeight / 3, 60, 30);
  });
}

// Move the frog based on keypress
function moveFrog(e) {
  if (isGameOver) return;
  switch (e.key) {
    case "ArrowUp":
      if (frogY > 0) frogY -= frogSpeed;
      break;
    case "ArrowDown":
      if (frogY < canvas.height - frogHeight) frogY += frogSpeed;
      break;
    case "ArrowLeft":
      if (frogX > 0) frogX -= frogSpeed;
      break;
    case "ArrowRight":
      if (frogX < canvas.width - frogWidth) frogX += frogSpeed;
      break;
  }
}

// Check if the frog is in collision with a car
function checkCollision() {
  lanes.forEach(lane => {
    console.log('Frog position:', frogX, frogY);
    console.log('Lane position:', lane.y);
    
    // Check if frog is in the same vertical range as a lane
    if (frogY < lane.y + laneHeight && frogY + frogHeight > lane.y) {
      // Check if frog is colliding with the car
      if (frogX + frogWidth > lane.y && frogX < lane.y + 60) {
        console.log("Collision detected");
        isGameOver = true;
      }
    }
  });
}

// Draw the game
function draw() {
  if (isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
    return; // Stop the game from drawing anything else
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrog();
  drawLanes();
  checkCollision();

  // Update lane position
  lanes.forEach(lane => {
    lane.y += lane.speed * lane.direction;
    if (lane.y > canvas.height) {
      lane.y = -laneHeight;
    }
  });

  requestAnimationFrame(draw);
}

// Start the game
init();
document.addEventListener("keydown", moveFrog);
draw();
