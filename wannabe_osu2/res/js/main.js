
const message = document.querySelector('.message');
const button = document.querySelector('button');
const gameArea = document.querySelector('.gameArea');
const results = document.querySelector('.results');
const directions = document.querySelector('.directions');
let inPlay = false;
let playArea = {};
let count = 0;

function showMessage(notification){
    message.innerHTML = `<h3>${notification}</h3>`;
}

function showBox(){
    playArea.timer = setTimeout(myBox, random(4000));
}

function myBox(){
    
    let element = document.createElement('div');
    element.classList.add('box');
    element.style.top = random(setTopMargin()) + 'px';
    element.style.left = random(setLeftMargin()) + 'px';
    element.style.backgroundColor = getColor();
    element.start = new Date().getTime();
    element.addEventListener('click', hit);
    gameArea.appendChild(element);
}


function getColor(){
    function col(){
        let hex = random(255).toString(10);
        
        return ('0' + String(hex)).substr(-2);
    }
    return '#' + col() + col() + col();
}

 
function setTopMargin(){
    let maxHeight = gameArea.clientHeight;
    if (maxHeight <= 100){
        maxHeight = maxHeight + 200;
    } else {
        maxHeight = maxHeight - 200;
    }
    return maxHeight;
}


function setLeftMargin(){
    let maxWidth = gameArea.clientWidth;
    if (maxWidth <= 100){
        maxWidth = maxWidth + 200;
    } else {
        maxWidth = maxWidth - 200;
    }
    
    return maxWidth;
}

function hit(e){
    let start = e.target.start;
    let end = new Date().getTime();
    let duration = (end-start)/1000;
    let maxDuration = 1.5;
    
    clearTimeout(playArea.timer);
    showMessage('Trvalo ti ' + duration + ' než jsi clicknul');
    if (duration > maxDuration){
        gameArea.children[0].remove();
        results.innerHTML = ` <span id="loser"> Prohrál jsi!</span> `;
        resetGame();
    } else {
        gameArea.children[0].remove();
        playArea.timer = setTimeout(myBox, random(4000));
        count++;
        if (count === 15){
            results.innerHTML = ` ${renderCount(count)}! <span id="winner">Vyhrál jsi!</span> `;
            resetGame();
        } else {
            results.innerHTML = `Máš ${renderCount(count)} z 15`;
        }
    }
}

function renderCount(count){
    return count;
}

function random(number){
    let tempVal = Math.floor(Math.random()*number);
    return tempVal;
}

function resetGame(){
    clearTimeout(playArea.timer);
    inPlay = false;
    button.style.display = 'block';
}

showMessage('Kliknutím začneš');

button.addEventListener('click', function(){
    
        inPlay = true;
       
        button.style.display = 'none';
        directions.style.display = 'none';
        results.innerHTML = '';
        count = 0;
    
    showMessage('Připrav se ');

    showBox();
})