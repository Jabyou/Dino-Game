//Variables
let obstacles     = [];
let pandas=document.getElementsByClassName("panda");
let panda = pandas[0];
let game=document.getElementsByClassName("gamebackground");
let pandagame = game[0];
let speed = 7;
let spawn = 2832;
let spawntimer;
let gameTimer;
let button1=document.getElementsByClassName("button1");
let button2=document.getElementsByClassName("button2");
let score=document.getElementsByClassName("Score")[0];
let points=0; //game starts with score:0


function easy(){
  speed=7;
}
function hard(){
  speed=16;
}
//This function makes the panda jump
document.addEventListener('keydown', function(e) {
    if (e.code === "ArrowUp") {
      pandajumper(); // Call our jump function
    }
  });
  function startgame(){
    startMovingObstacles();
    startSpawningObstacles();
  }
  startgame();
function pandajumper(){
    if (panda.classList.contains('jump')) {
        return; // If it's already jumping, do nothing
      } 
      panda.classList.add('jump');       // Start jump animation
      setTimeout(function() {
        panda.classList.remove('jump');  // End jump after 0.5 seconds
      }, 500);
}
function createobstacles(){
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle")
    obstacle.style.left = pandagame.offsetWidth + 'px'; // Position at right edge
  pandagame.appendChild(obstacle);                 // Show it in the game area
  obstacles.push(obstacle);
}
function moveObstacles() {
  for (var i = 0; i < obstacles.length; i++) {
    var obs       = obstacles[i];                 // pick one obstacle
    var currentX  = parseInt(obs.style.left, 10); // where is obstacle at the moment
    obs.style.left = (currentX - speed) + 'px'; // shift obstacle to the left
  }
}
function startMovingObstacles() {
  gameTimer = setInterval(function () {
    moveObstacles();
    collision();
    removeOffscreenObstacles();  
  }, 20);
}
startSpawningObstacles()
// Begin the loop that spawns new obstacles at spawnRate (declared above)
function startSpawningObstacles() {
  spawntimer = setInterval(function() {
    createobstacles();
  }, spawn);
}
function endGame(){
  // 16) Stop both loops, alert the score, and reload the page
  clearInterval(gameTimer);   // Stop moving obstacles
  clearInterval(spawntimer);  // Stop creating obstacles
  document.getElementById("gameover").innerHTML = "Game Over!"; // Tell final score

    }
function collision(){
  var dinoRect = panda.getBoundingClientRect();   // invisible box around dino

  // Loop through each obstacle we’ve spawned so far
  for (var i = 0; i < obstacles.length; i++) {
    var obsRect = obstacles[i].getBoundingClientRect(); // box around obstacle
    if (dinoRect.left <  obsRect.left + obsRect.width &&
      dinoRect.left + dinoRect.width > obsRect.left &&
      dinoRect.top  <  obsRect.top  + obsRect.height &&
      dinoRect.top  + dinoRect.height > obsRect.top) {
    endGame(); 
    break;
  }}
}
getBoundingClientRect()
function increasescore(){
  points++;
  score.textContent = 'Your score: ' + points;
}
/* Whenever an obstacle scrolls off the left edge, we remove it and reward the player with a point. */
function removeOffscreenObstacles() {
  for (var i = obstacles.length - 1; i >= 0; i--) {
    var obs = obstacles[i];
    var x   = parseInt(obs.style.left, 10);

    if (x + obs.offsetWidth < 0) {       // obstacle is totally off-screen
      pandagame.removeChild(obs);         
      obstacles.splice(i, 1); 
      increasescore();
    }
  }
}