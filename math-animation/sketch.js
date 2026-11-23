let centerX;          
let centerY;         
let orbitRadius = 120;
let angle = 0;     
let angleSpeed = 1;   
let isPaused = false;

function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);  
  centerX = width / 2;
  centerY = height / 2;
}

function draw() {
  background(20);

  if (!isPaused) {
    angle = angle + angleSpeed;
    if (angle >= 360) {
      angle = angle - 360;
    }
    if (angle < 0) {
      angle = angle + 360;
    }
  }

  //position
  let dotX = centerX + orbitRadius * cos(angle);
  let dotY = centerY + orbitRadius * sin(angle);

  //orbit
  noFill();
  stroke(80);
  circle(centerX, centerY, orbitRadius * 2);

  //line
  stroke(150);
  line(centerX, centerY, dotX, dotY);

  //center point
  noStroke();
  fill(255, 200, 0);
  circle(centerX, centerY, 10);

  //orbiting dot
  fill(0, 200, 255);
  circle(dotX, dotY, 24);

  //values
  fill(255);
  textSize(14);
  textAlign(LEFT);
  text("angle = " + nf(angle, 1, 1) + " degrees", 10, 25);
  text("cos(angle) = " + nf(cos(angle), 1, 3), 10, 45);
  text("sin(angle) = " + nf(sin(angle), 1, 3), 10, 65);
  text("dot x = " + nf(dotX, 1, 1) + "   dot y = " + nf(dotY, 1, 1), 10, 85);

  // Control instructions
  textAlign(CENTER);
  text("SPACE = pause/resume   W/S = change speed   A/D = change radius", width / 2, height - 30);
  text("speed = " + angleSpeed + " deg/frame   radius = " + orbitRadius + " px", width / 2, height - 12);
}

// Keyboard controls
function keyPressed() {
  if (key === ' ') {
    isPaused = !isPaused;
  }
  if (key === 'w') { angleSpeed = angleSpeed + 0.5; }
  if (key === 's') { angleSpeed = angleSpeed - 0.5; }
  if (key === 'd') { orbitRadius = min(orbitRadius + 10, 220); }
  if (key === 'a') { orbitRadius = max(orbitRadius - 10, 20); }
  return false;
}
