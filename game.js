const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = 480;
canvas.height = 320;

// Define game variables
const frogWidth = 30;
const frogHeight = 30;
const laneHeight = 50;
let frogX = canvas.width / 2 - frogWidth / 2;
let frogY = canvas.height - frogHeight - 10;  // Starting at the bottom of the screen
let frogSpeed = 40;
let isGameOver = false;
let lanes = [];

// Define game objects and initialize
function init() {
  lanes = [
    { y: 50, x: 0, speed: 1, direction: 1 },   // Lane 1 (cars moving right)
    { y: 100, x: canvas.width, speed: 1, direction: -1 },  // Lane 2 (cars moving left)
    { y: 150, x: 0, speed: 1.5, direction: 1 }, // Lane 3 (cars moving right)
    { y: 200, x: canvas.width, speed: 2, direction: -1 },  // Lane 4 (cars moving left)
    { y: 250, x: 0, speed: 2, direction: 1 },   // Lane 5 (cars moving right)
  ];
}

// Draw the frog on the canvas
function drawFrog() {
  ctx.fillStyle = "#0f0";
  ctx.fillRect(frogX, frogY, frogWidth, frogHeight);
}

// Draw the lanes and cars
function drawLanes() {
    lanes.forEach((lane, index) => {
      // Draw the street (the background color for the lane)
      ctx.fillStyle = "#808080";  // Grey street color
      ctx.fillRect(0, lane.y, canvas.width, laneHeight);  // Street is drawn for each lane
  
      // Draw the lane (the dividing lines or white part of the lane)
      ctx.fillStyle = "#FFFFFF";  // White for lane dividing lines
      ctx.fillRect(0, lane.y + laneHeight / 2 - 5, canvas.width, 10); // White line in the middle of the lane
  
      // Draw the car on the lane
      // Alternate between red and blue cars based on the lane index
      ctx.fillStyle = index % 2 === 0 ? "#ff0000" : "#0000ff";  // Red car for even lanes, Blue for odd lanes
      ctx.fillRect(lane.x, lane.y + laneHeight / 3, 60, 30); // Car size: 60x30
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
    // Log the positions for debugging
    console.log('Frog Position:', frogX, frogY);
    console.log('Lane Position:', lane.x, lane.y);

    // Check if frog is in the same vertical range as a lane
    if (frogY < lane.y + laneHeight && frogY + frogHeight > lane.y) {
      // Check if frog is colliding with the car horizontally
      if (frogX + frogWidth > lane.x && frogX < lane.x + 60) {
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

  // Update lane positions (cars moving horizontally)
  lanes.forEach(lane => {
    lane.x += lane.speed * lane.direction;
    if (lane.x > canvas.width) {
      lane.x = -60; // Reset car to the left side of the screen
    } else if (lane.x < -60) {
      lane.x = canvas.width; // Reset car to the right side of the screen
    }
  });

  requestAnimationFrame(draw);
}

// Start the game
init();
document.addEventListener("keydown", moveFrog);
draw();
