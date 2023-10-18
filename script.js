
let number1 = 0;
let number2 = 0;
let result = 0;
let points= 0;
let userResult = 0;
let level = 1;

score.innerHTML = points;

let ding = new Audio('./media/ding.mp3');
let wrong = new Audio('./media/wrong.mp3');
let yeah = new Audio('./media/yeah.mp3');

function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 2;
}

function fillDiv(){
    const sub1 = document.getElementById('number1');
    const sub2 = document.getElementById('number2');
    number1 = generateRandomInteger(8)
    sub1.innerHTML = number1;
    number2 = generateRandomInteger(8)
    sub2.innerHTML = number2;
    result = number1 * number2;
}

function checkResult (){
    userResult = document.getElementById('userResult').value*1;
    const score  = document.getElementById('score');
    if (userResult === result){
        points++
        score.innerHTML = points;
        if ([10,20,30,40,50,60,70,80,90,100].includes(points)){
            lvlUp()
            addMoreShake()
            yeah.play()
        }
        addJaugePoint ()
        resetOperation();
        ding.play()
        confetti ()
    }
    else {
        wrong.play()
        const name = prompt ('nom?')
        saveScore(name,points);
        points = 0;
        resetOperation();
        score.innerHTML = points;
        resetLvl();
        resetBg();
        resetJauge();
        resetRewards();
        resetShake()
       
    }
}
//Ups

function lvlUp () {
    const lvlEl = document.getElementById('lvlNumber');
    const lvlNumber = document.getElementById('lvlNumber').textContent;  
    level = lvlNumber;
    level++
    lvlEl.innerHTML = level;
    thumbsUp()
    changeBg ();
    addRewardPoint ()
}

function addJaugePoint (){
    let jauge = document.getElementById('jauge');
    if (jauge.dataset.points<10){
        jauge.dataset.points ++
    }else{
        jauge.dataset.points = 1;
    }
}
function changeBg(){
    let className = [];
    let body = document.getElementById('body');
    className = body.getAttribute("class").split('');
    let lastbg = className[className.length - 1]++;
    lastbg++;
    body.removeAttribute('class');
    body.classList.add('bg'+lastbg);
    //add fade here
}

function thumbsUp(){
    let thumbsUp = document.getElementById('thumbsUp');
    thumbsUp.classList.add('visible');
    setInterval(removeThumbsUp, 3000)
    function removeThumbsUp (){
        thumbsUp.classList.remove('visible');
    }    
}

function confetti (){
  function random(max){
      return Math.random() * (max - 0) + 0;
  }

  var c = document.createDocumentFragment();
  for (var i=0; i<100; i++) {
    var styles = 'transform: translate3d(' + (random(500) - 250) + 'px, ' + (random(200) - 150) + 'px, 0) rotate(' + random(360) + 'deg);\
                  background: hsla('+random(360)+',100%,50%,1);\
                  animation: bang 700ms ease-out forwards;\
                  opacity: 0';
      
    var e = document.createElement("i");
    e.style.cssText = styles.toString();
    c.appendChild(e);
    }
    // document.body.appendChild(c);
    document.getElementById('confetti').append(c);
}
function addRewardPoint (){
    let reward = document.getElementById('rewardBanner');
    reward.dataset.points ++
}
function addMoreShake(){
    let points = document.getElementById('points');
    if (points.dataset.shake<6){
        points.dataset.shake ++
    }else{
        points.dataset.points = 0;
    }
}

//resets

function resetOperation(){
    document.getElementById('userResult').value = '';
    fillDiv();
}
function resetLvl(){
    const lvlEl = document.getElementById('lvlNumber').innerHTML = '1';
}
function resetBg(){
    let body = document.getElementById('body');
    body.removeAttribute('class');
    body.classList.add('bg1');
}
function resetJauge(){
    let jauge = document.getElementById('jauge');
    jauge.dataset.points = 0;
}
function resetRewards(){
    let reward = document.getElementById('rewardBanner');
    reward.dataset.points = 0;
}

function resetShake(){
    let points = document.getElementById('points');
    points.dataset.shake=0;
}

function saveScore(n, s) {
    
    localStorage.setItem(n, s);

}

const items = { ...localStorage };

console.log(items)

// Add data
//localStorage.setItem('myCar', 'Tesla');

// Read data
//const car = localStorage.getItem('myCar');

// Remove specific data
//localStorage.removeItem('myCar');

// Remove all data
//localStorage.clear();

fillDiv();