// game Sounds and Variables
let inputDir = {x:0,y:0};
const foodSound =  new Audio("./music/food.mp3");
const moveSound =  new Audio("./music/move.mp3");
const musicSound =  new Audio("./music/music.mp3");
const gameOverSound =  new Audio("./music/gameover.mp3");
let lastRender = 0;
let speed = 4;
let snakeArr = [
    {x:13,y:15}
]
food={x:6,y:7}


// game functions
const main=(ctime)=>{
    window.requestAnimationFrame(main);
   
    if((ctime - lastRender)/1000 < 1/speed){
        return;
    }
    lastRender = ctime;
    gameEngine();
}

const isCollide =(snake)=>{
    // if snake bumps into itself
    for(let index = 1; index<snakeArr.length;index++)
    {
        if(snake[index].x===snake[0].x &&snake[index].y===snake[0].y )
        {
            return true;
        }
    }
    // If bumps into the wall
    if(snake[0].x>=18|| snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        {
            return true;
        }
    
}

const gameEngine=()=>{
    // Part 1 : updating the snake array & food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over.Press any key to play again!");
        snakeArr = [{x:13,y:15}];
        musicSound.play();
        score = 0;
    }
    // If snake eats the food
    if(snakeArr[0].y===food.y && snakeArr[0].x === food.x)
    {
        foodSound.play();
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x,y : snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()),
             y: Math.round(a+(b-a)*Math.random()),
        }
    }
    // Moving the snake
    for(let i = snakeArr.length-2;i>=0;i--)
    {
        
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // Part 2 :Display the snaka and Food
    // Display the snake
     board.innerHTML = "";
     snakeArr.forEach((e,index)=>{
         snakeElement = document.createElement('div');
         snakeElement.style.gridRowStart = e.y;
         snakeElement.style.gridColumnStart = e.x;
         if(index===0){
         snakeElement.classList.add('head');
         }
         else{
            snakeElement.classList.add('snake');
         }
         board.appendChild(snakeElement);
     })
     // Display the food
     foodElement = document.createElement('div');
     foodElement.style.gridRowStart = food.y;
     foodElement.style.gridColumnStart=  food.x;
     foodElement.classList.add('food');
     board.appendChild(foodElement);

}


// main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1}//Start the game
    musicSound.play();
    moveSound.play(); 
    switch (e.key) {
        case 'ArrowUp':
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case 'ArrowDown':
            inputDir.x=0;
            inputDir.y=1;
            break;
        case 'ArrowLeft':
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case 'ArrowRight':
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
});