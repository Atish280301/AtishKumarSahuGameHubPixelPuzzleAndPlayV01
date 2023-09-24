let inputDir = {x : 0, y : 0};
const  foodsound = new Audio('food.mp3');
const gameoversound = new Audio('gameover.mp3');
const movesound = new Audio('move.mp3');
const bgmusic = new Audio('music.mp3');
let speed = 7;
let lastPaintTime = 0;
let score = 0;
let snakearr = [{x:13, y: 15}];
food = {x: 10, y: 20};

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}
function iscolide(snakearr){
    //if you bump into yourself
    for(let index = 1; index < snakearr.length; index++){
        if(snakearr[index].x === snakearr[0].x  && snakearr[index].y === snakearr[0].y){
            return true;
        }
    } 
    //if you bump the wall;
    if(snakearr[0].x >= 30 || snakearr[0].x <= 0 || snakearr[0].y >= 30 || snakearr[0].y <= 0 ){
            return true;
    }
    return false;
}
function gameEngine(){
    //update snake array and food
    if(iscolide(snakearr)){
        gameoversound.play();
        bgmusic.pause();
        inputDir = {x : 0, y : 0};
        alert("Game Over! Press Any Key To Play Again.");
        snakearr = [{x:13, y: 15}]
        score = 0;
        scr.innerHTML = "Score : " + score;
    }
    //increment the score and fruit generation
    if(snakearr[0].y === food.y && snakearr[0].x === food.x){
        foodsound.play();
        score += 1;
        if(score > highscorev){
            highscorev = score;
            localStorage.setItem("HighScore", JSON.stringify(highscorev));
            HighScore.innerHTML = "High Score : " + highscorev;
        }
        scr.innerHTML = "Score : " + score;
        snakearr.unshift({x : snakearr[0].x + inputDir.x, y : snakearr[0].y + inputDir.y});
        let a = 2;
        let b = 28;
        food = {x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random())};
    } 
    //moving the snake
    for(let i = snakearr.length - 2; i >= 0; i--){
        snakearr[i + 1] = {...snakearr[i]};
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;
    //display the snake
    board.innerHTML = "";
    snakearr.forEach((e, index) =>{
        snakeele = document.createElement('div');
        snakeele.style.gridRowStart = e.y;
        snakeele.style.gridColumnStart = e.x;
        if(index === 0){
            snakeele.classList.add('shead');
        }
        else{
            snakeele.classList.add('snake');
        }
        board.appendChild(snakeele);
    });
    //display the food
        foodele = document.createElement('div');
        foodele.style.gridRowStart = food.y;
        foodele.style.gridColumnStart = food.x;
        foodele.classList.add('sfood');
        board.appendChild(foodele);
}
let highscore = localStorage.getItem("High Score");
if(highscore === null){
   let highscorev = 0;
    localStorage.setItem("High Score", JSON.stringify(highscorev));
}
else{
    highscorev = JSON.parse(highscore);
    HighScore.innerHTML = "High Score : " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 0}
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            bgmusic.play();
            break;
        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            bgmusic.play();
            break;
        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            bgmusic.play();
            break;
        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            bgmusic.play();
            break;    
    }
})
