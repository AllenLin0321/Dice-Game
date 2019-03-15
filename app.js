
var scores, roundScore, activePlayer, dice_1, dice_2, gamePlaying, previous_dice_1, previous_dice_2;
var finalScore = 100;

var diceDOM_1 = document.querySelector('.dice-1');
var diceDOM_2 = document.querySelector('.dice-2');

init();

// Button__ROLL DICE
document.querySelector('.btn-roll').addEventListener('click',function(){
    
    if(gamePlaying) {

        // Show the Dice-1
        diceDOM_1.style.display = 'block';
    
        // 1. Random number
        previous_dice_1 = dice_1;
        previous_dice_2 = dice_2;
        dice_1 = Math.floor(Math.random()*6+1);
        dice_2 = Math.floor(Math.random()*7);

        // 2. Display the result
        if (dice_2!==0) {

            // Show the 1st Dice
            diceDOM_1.src = 'dice-' + dice_1 + '.png';

            // Show the 2nd Dice
            diceDOM_2.style.display = 'block';
            diceDOM_2.src = 'dice-' + dice_2 + '.png';
        }else {
            diceDOM_2.style.display = 'none';
        }
    
        // 3. Update the round score IF the rolled number was NOT a 1
        if (((dice_1 === previous_dice_1) && (dice_1===6))||((dice_2 === previous_dice_2) && (dice_2===6))){
            changePlayer();
        } else if ((dice_1 !== 1) && (dice_2 !== 1)) {
            // Add score
            roundScore+=(dice_1+dice_2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            // Next player
            changePlayer();
        }

    }

});

// Button__HOLD
document.querySelector('.btn-hold').addEventListener('click',function(){

    if(gamePlaying) {
        // 1. Add the current score to global score
        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; 
    
        // 2. Check if player won the game
        if (scores[activePlayer] >= finalScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDOM_1.style.display = 'none';
            diceDOM_2.style.display = 'none';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // 3. Next player
            changePlayer();
        }
    }

});

// Button__NEW
document.querySelector('.btn-new').addEventListener('click',init);

function changePlayer(){
    // Reset the current scores
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Update the UI
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
}

function init(){
    
    gamePlaying=true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    // Initial the scores
    diceDOM_1.style.display = 'none';
    diceDOM_2.style.display = 'none';
    

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Init the text
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Set the active class to player 1
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

    // Remove the winner class
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    finalScore = 100;
    document.getElementById('final-score').value = '';
}

function setFinalScore() {
    var x = document.getElementById('final-score').value;
    if (x===''){
        finalScore=100;
    }else {
        finalScore = x;
    }
}