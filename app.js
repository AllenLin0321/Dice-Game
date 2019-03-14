/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying;

var diceDOM = document.querySelector('.dice');
init();

// Button__ROLL DICE
document.querySelector('.btn-roll').addEventListener('click',function(){
    
    if(gamePlaying) {
        
        diceDOM.style.display = 'block';
    
        // 1. Random number
        dice = Math.floor(Math.random()*6+1);
    
        // 2. Display the result
        diceDOM = document.querySelector('.dice');
        diceDOM.src = 'dice-' + dice + '.png';
    
        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            // Add score
            roundScore+=dice;
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
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            diceDOM.style.display = 'none';
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
    diceDOM.style.display = 'none';
}

function init(){
    
    gamePlaying=true;
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;

    // Initial the scores
    diceDOM.style.display = 'none';
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
}