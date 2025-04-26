// Collision management
function attackEvaluation ({attacker,attacked}) 
{
    //console.log("1:", attacker, attacker.attackBox.position.x + attacker.attackBox.width >= attacked.position.x)
    //console.log("2:",attacker.attackBox.position.x <= attacked.position.x + attacked.width)
    //console.log("3:",attacker.attackBox.position.y + attacker.attackBox.height >= attacked.position.y)
    //console.log("4:",attacker.attackBox.position.y <= attacked.position.y + attacked.height)
    return (attacker.attackBox.position.x + attacker.attackBox.width >= attacked.position.x
        && attacker.attackBox.position.x <= attacked.position.x + attacked.width
        && attacker.attackBox.position.y + attacker.attackBox.height >= attacked.position.y
        && attacker.attackBox.position.y <= attacked.position.y + attacked.height)
}


// Winner
function determineWinner({player, enemy, timerId})
{
    clearTimeout(timerId);
    document.querySelector('#gameOver').style.display = 'flex';
    document.querySelector('#matchResult').style.display = 'flex';
    if (player.health === enemy.health)
    {
        document.querySelector('#matchResult').innerHTML = 'Tie';
    }
    else if (player.health > enemy.health)
    {
        document.querySelector('#matchResult').innerHTML = 'Charizard Wins';
    }
    else if (player.health < enemy.health)
    {
        document.querySelector('#matchResult').innerHTML = 'Blastoise Wins';
    }
}

// Start match countdown
let startTimer = 3;
let startTimerId;

function decreaseStartTimer() {
    if (startTimer > 0) {
        document.querySelector('#timer').innerHTML = "Ready?";
        document.querySelector('#timer').style.fontSize = "10px";
        document.querySelector('#startTimer').innerHTML = startTimer;
    } 
    else if (startTimer === 0) {
        document.querySelector('#startTimer').innerHTML = "BATTLE!";
        decreaseTimer();  // Start battle timer
    } 
    else {
        document.querySelector('#startTimer').style.display = 'none';
        document.querySelector('#timer').style.fontSize = "15px";
        clearTimeout(startTimerId);  // Stop countdown timer
        return;
    }

    startTimerId = setTimeout(decreaseStartTimer, 1000);
    startTimer--;
}

// Battle Timer
let timer = 60;
let timerId;

function decreaseTimer() {
    if (timer >= 0) {
        document.querySelector('#timer').innerHTML = timer;
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
    } 
    else {
        determineWinner({ player, enemy });
    }
}




