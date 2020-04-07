var wordlist = ["michael jordan","scottie pippen","derrick rose","dennis rodman", "kirk hinrich",'zach lavine', 'ben gordon','horace grant','luol deng','artis gilmore'];
targetword = '',
guesses =[],
maxLives = 15;


function newWord(){
    targetword=wordlist[Math.floor(Math.random() * wordlist.length)];
    alert("step1")
}

function correctGuesses(){
    var word1= '';
    for (var i=0; i < targetword.length; i++){
        if (guesses.indexof(targetword[i].tolowercase(), 0) == -1){
            word1 += "_";
        } else {
            word1 += targetword[i];
        }       
        return word1;
    }
}

function drawWord() {
    while(targetword==''){
        newWord();
    }
    $('targetword').html(word1());
    alert("it worked");
}


function drawGuesses(){
    guesses.sort();
    $('$previousGuesses').html(guesses.join(', ')); 
}

function cleanGuess(){
    var uniqueGuesses = [];
    $.each(guesses), function(index, element) {
        if (element.length > 0 && $.inArray(element, uniqueGuesses)) == -1){
            uniqueGuesses.push(element);            
        }
    });
    guesses = uniqueGuesses;
}

function addGuess(){
    if (/^[ a-zA-Z]*$/.test($('$guess').val()) && typeof $('$guess').val() !== 'undefined') {
        guesses.push($('$guess').val().tolowercase());
    }
    $('$guess').val('');
}

function endGame(winner){
    if (winner){
        $('$endGame').html('Congrats you won!');
        $('$endGameMsg').html('You guessed' + targetword + 'in' + guesses.length + 'attempts!');
    }
    else {
        $('$endGame').html('You lost');
        $('$endGameMsg').html('Sorry, the word was ' + targetword);

    }
    $('$endGame')
}

function reviewChancesLeft(){
    var chancesLeft = maxLives,
        string = targetword.tolowercase();
    for var i = 0; i < guesses.length; i++){
        if (string.indexof(guesses[i], 0) == -1){
            chancesLeft--;            
        }
    }    
    if (chancesLeft<=0) {
        endGame(false);//COMING BACK TO THIS RIGHT HERE
        return;
    }
}

function checkWin (){
    if (word1() == targetword){
        endGame(true);

    }
}

function resetGame(){
    targetword = '';
    guesses= [];
    newWord();
}

function update(){
    addGuess();
    cleanGuess();
    drawWord();
    drawGuesses();
    checkWin();

}

$(document).ready(function(){
    newWord();
    drawWord();
    drawGuesses();
    $('guess').attr('onkeyup', 'update();');
});