const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockwidth = 100;
const blockheight = 10;

let timerId;
let score = 0;

//board width and height
const boardwidth = 700;
const boardheight = 400;

//position of user paddle
const userstartPosition = [300, 30];
let usercurrentPosition = userstartPosition;

//position of ball
const ballstartposition = [200, 150];
let ballcurrentposition = ballstartposition;
const balldiameter = 10;

//direction
let xDirection = 2;
let yDirection = 2;

//create block
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockwidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockheight];
        this.topRight = [xAxis + blockwidth, yAxis + blockheight];
    }
}

//all my blocks positions
const blocks = [
    new Block(40,360),
    new Block(40, 340),
    new Block(40, 320),
    new Block(40,300),
    new Block(40, 280),
    new Block(40, 260),
    new Block(40, 240),

    new Block(110,360),
    new Block(110, 340),
    new Block(110, 320),
    new Block(110,300),
    new Block(110, 280),
    new Block(110, 260),
    new Block(110, 240),

    new Block(180,360),
    new Block(180, 340),
    new Block(180, 320),
    new Block(180,300),
    new Block(180, 280),
    new Block(180, 260),
    new Block(180, 240),

    new Block(250,360),
    new Block(250, 340),
    new Block(250, 320),
    new Block(250,300),
    new Block(250, 280),
    new Block(250, 260),
    new Block(250, 240),

    new Block(325,360),
    new Block(325, 340),
    new Block(325, 320),
    new Block(325,300),
    new Block(325, 280),
    new Block(325, 260),
    new Block(325, 240),

    new Block(400,360),
    new Block(400, 340),
    new Block(400, 320),
    new Block(400,300),
    new Block(400, 280),
    new Block(400, 260),
    new Block(400, 240),

    new Block(470,360),
    new Block(470, 340),
    new Block(470, 320),
    new Block(470,300),
    new Block(470, 280),
    new Block(470, 260),
    new Block(470, 240),

    new Block(540,360),
    new Block(540, 340),
    new Block(540, 320),
    new Block(540,300),
    new Block(540, 280),
    new Block(540, 260),
    new Block(540, 240),
    
    new Block(610,360),
    new Block(610, 340),
    new Block(610, 320),
    new Block(610,300),
    new Block(610, 280),
    new Block(610, 260),
    new Block(610, 240),
];

//draw all my blocks
function addblocks(){    
    for(let i = 0; i < blocks.length; i++){
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block);  
    }
}
addblocks();

//add user paddle
const user = document.createElement('div');
user.classList.add('user');
drawuser();
grid.appendChild(user);

//draw the user paddle -> this is used for clean code 
function drawuser(){
    user.style.left = usercurrentPosition[0] + 'px';
    user.style.bottom = usercurrentPosition[1] + 'px';
}

//move user paddle
function moveuser(e){
    switch(e.key){
        case 'ArrowLeft' :
            if(usercurrentPosition[0] > 5){
                usercurrentPosition[0] -= 10;
                drawuser();
            }
            break;
        case 'ArrowRight':
            if(usercurrentPosition[0] < 730 - blockwidth){
                usercurrentPosition[0] += 10;
                drawuser();
            }
            break;
    }
}
document.addEventListener('keydown',moveuser);

//draw ball -> the code clean one
function drawball(){
    ball.style.left = ballcurrentposition[0] + 'px';
    ball.style.bottom = ballcurrentposition[1] + 'px';
}

//add ball
const ball = document.createElement('div');
ball.classList.add('ball');
drawball();
grid.appendChild(ball);

//move the ball
function moveball(){
    ballcurrentposition[0] += xDirection;
    ballcurrentposition[1] += yDirection;
    drawball();
    collison();
}

timerId = setInterval(moveball, 30);

//check for collison
function collison(){
   //check for block collision
  for (let i = 0; i < blocks.length; i++){
    if
    (
      (ballcurrentposition[0] > blocks[i].bottomLeft[0] && ballcurrentposition[0] < blocks[i].bottomRight[0]) &&
      ((ballcurrentposition[1] + balldiameter) > blocks[i].bottomLeft[1] && ballcurrentposition[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection()   
      score += 5;
      scoreDisplay.innerHTML = score
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'You Win! Score : '+score;
        clearInterval(timerId)
        document.removeEventListener('keydown', moveuser)
      }
    }
  }
  // check for wall hits
  if (ballcurrentposition[0] >= (boardwidth - balldiameter) || ballcurrentposition[0] <= 0 || ballcurrentposition[1] >= (boardheight - balldiameter))
  {
    changeDirection()
  }

  //check for user collision
  if
  (
    (ballcurrentposition[0] > usercurrentPosition[0] && ballcurrentposition[0] < usercurrentPosition[0] + blockwidth) &&
    (ballcurrentposition[1] > usercurrentPosition[1] && ballcurrentposition[1] < usercurrentPosition[1] + blockheight ) 
  )
  {
    changeDirection()
  }

  //game over
  if (ballcurrentposition[1] <= 0) {
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You Lose! Score : '+score;
    document.removeEventListener('keydown', moveuser)
  }
}
function changeDirection(){
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
      }
      if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
      }
      if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
      }
      if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
      }
}