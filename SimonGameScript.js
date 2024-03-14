//Function used to delay time when changing colours
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

//variables for score and max score
var score=-1;
var maxScore=0;
//array to store order of displayed colors
const orderOfColors=[];
//variable to store position of the array
var pos=0;
//variable to check if game is started
var gameStarted=false;
//variable to check if player can click buttons
var canclick=false;
//time in ms how long the buttons glow
var delayTime=800;


//score and maxScore use slice to always display two digits
document.getElementById("score").innerHTML = ('00').slice(-2);
document.getElementById("maxScore").innerHTML = ('0'+maxScore).slice(-2);

//Function called when START button is pressed, turns gameCircle to green and calls the GameProcess function
function startGame(){
    if(gameStarted==false)
    {
        gameStarted=true;
        document.querySelector(".gameCircle").style.backgroundColor="green";
        delayTime=800;
        GameProcess();
    }
}

//Function called when game is started and when the user correctly clicks the buttons
//The function updates score and maxScore
//it displays the colors according to the orderOfColors array and then generates a new random one and adds it to the end of the array
async function GameProcess(){
    canclick=false;
    stopTimer();
    score++;
    document.getElementById("score").innerHTML = ('0'+score).slice(-2);
    if(score==5 || score==9 || score==13)
    {
        delayTime=delayTime/2;
    }
    if(score>maxScore)
    {
        maxScore=score;
        document.getElementById("maxScore").innerHTML = ('0'+maxScore).slice(-2);
    }
    await delay(1000);
    //print colors in array
    for(let i=0;i<orderOfColors.length;i++)
        {
            switch(orderOfColors[i])
            {
                case 0:
                    await glowGreen();
                    break;
                case 1:
                    await glowRed(); 
                    break;
                case 2:
                    await glowYellow();
                    break;
                case 3:
                    await glowBlue();
                    break;
            }
        }
        //choose new color
        var choose=Math.round(Math.random()*4);
        orderOfColors[orderOfColors.length]=choose;
        switch(choose)
        {
            case 0:
                await glowGreen();
                break;
            case 1:
                await glowRed(); 
                break;
            case 2:
                await glowYellow();
                break;
            case 3:
                await glowBlue();
                break;
        }
        canclick=true;
        startTimer();
}


//Function called when the user clicks the buttons incorrectly
//it resets the score, orderOfColors array, and changes the color of all buttons four times in quick succesion
async function lose(){
    stopTimer();
    document.querySelector(".gameCircle").style.backgroundColor="red";
    gameStarted=false;
    pos=0;
    score=-1;
    document.getElementById("score").innerHTML = ('00');
    orderOfColors.length=0;
    for(let i=0;i<4;i++)
    {
        document.querySelector(".circle1").style.backgroundColor="chartreuse";
        document.querySelector(".circle2").style.backgroundColor="Tomato";
        document.querySelector(".circle3").style.backgroundColor="Azure";
        document.querySelector(".circle4").style.backgroundColor="aqua";
        await delay(300);
        document.querySelector(".circle1").style.backgroundColor="green";
        document.querySelector(".circle2").style.backgroundColor="red";
        document.querySelector(".circle3").style.backgroundColor="yellow";
        document.querySelector(".circle4").style.backgroundColor="blue";
        await delay(80);
    }
}

//Four functions that change a color of a button and then set it back to its original color 
async function glowGreen(){
    document.querySelector(".circle1").style.backgroundColor="chartreuse";
    await delay(delayTime);
    document.querySelector(".circle1").style.backgroundColor="green";
    await delay(delayTime/4);
}

async function glowRed(){
    document.querySelector(".circle2").style.backgroundColor="Tomato";
    await delay(delayTime);
    document.querySelector(".circle2").style.backgroundColor="red";
    await delay(delayTime/4);
}

async function glowYellow(){
    document.querySelector(".circle3").style.backgroundColor="Azure";
    await delay(delayTime);
    document.querySelector(".circle3").style.backgroundColor="yellow";
    await delay(delayTime/4);
}

async function glowBlue(){
    document.querySelector(".circle4").style.backgroundColor="aqua";
    await delay(delayTime);
    document.querySelector(".circle4").style.backgroundColor="blue";
    await delay(delayTime/4);
}

//Four functions that are used when coloured buttons are pressed
//The functions only do something when the game is started
//If the user correctly clicks the color the position of the array is moved by one
//If the position of the array is its length the GameProcess Function is called
//If the user guesses clicks the color in a wrong order the lose function is called
async function greenClicked(){
    if(canclick==true)
    {
        if(orderOfColors[pos]==0)
        {
            glowGreen();
            pos++;
            if(pos==orderOfColors.length)
            {
                pos=0;
                await delay(200);
                GameProcess();
            }
        }
        else{
            lose();
        }
    }
}

async function redClicked(){
    if(canclick==true)
    {
        if(orderOfColors[pos]==1)
        {
            glowRed();
            pos++;
            if(pos==orderOfColors.length)
            {
                pos=0;
                await delay(200);
                GameProcess();
            }
        }
        else{
            lose();
        }
    }
}

async function yellowClicked(){
    if(canclick==true)
    {
        if(orderOfColors[pos]==2)
        {
            glowYellow();
            pos++;
            if(pos==orderOfColors.length)
            {
                pos=0;
                await delay(200);
                GameProcess();
            }
        }
        else{
            lose();
        }
    }
}

async function blueClicked(){
    if(canclick==true)
    {
        if(orderOfColors[pos]==3)
        {
            pos++;
            glowBlue();
            if(pos==orderOfColors.length)
            {
                pos=0;
                await delay(200);
                GameProcess();
            }
        }
        else{
            lose();
        }
    }
}

//Two Functions that manage the game timer
//The start timer calls the lose function after 5 seconds
//The stopTimerFunction clears the inverval of the timer
var timer;
function startTimer(){
    timer=setInterval(function(){lose()},5000);
}
function stopTimer()
{
    clearInterval(timer);
}