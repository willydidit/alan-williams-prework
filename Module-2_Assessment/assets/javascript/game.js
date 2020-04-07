var wins = 0;
var losses = 0;

var maxErrors = 15;
var mySound;
var wordDisplayLettersElement = document.getElementById("word-display-letters");
var guessedLettersElement = document.getElementById("guessed-letters");
var errorCountElement = document.getElementById("error-count");
var winCountElement = document.getElementById("win-count");
var lossCountElement = document.getElementById("loss-count");

var blinkElements = document.getElementsByClassName("blinking");
var alertLineElements = document.getElementsByClassName("alert-line");

var validGuesses = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z' ];

var pressAnyKeyToStart = [
	"Guess the last names of Chicago Bulls top players in history! Press any key to begin"
];
var pressAnyKeyToReset = [
"press any key to reset"
];

var youWin = [
"Great job, you win! Press any key to reset!"];


var youLose = [
	"sorry you've ran out of guesses, press any key to try again!"
];

var game = new Hangman();

document.onkeyup = function(event) {
	var userGuess = event.key;

	if (!game.gameOver) {
		if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
			game.checkGuess(userGuess);
		}
	} else {
		game = new Hangman();
		game.updatePageData();
	}
}

window.setInterval(function() {
	if (blinkElements.length > 0) {
		if (game.guessedLetters.length === 0 || game.gameOver) {
			if (blinkElements[0].style.opacity === "1") {
				for (var i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "0";
				}
			} else {
				for (var i = 0; i < blinkElements.length; i++) {
					blinkElements[i].style.opacity = "1";
				}
			}
		} else {
			for (var i = 0; i < blinkElements.length; i++) {
				blinkElements[i].style.opacity = "0";
			}
		}
	}
}, 750);

function Hangman() {
	this.wordList = [
		"jordan",
		"pippen",
		"rodman",
		"grant",
		"rose",
		"hinrich",
		'lavine',
		'gordon',
		'grant',
		'deng',
		'gilmore'
	]

	this.word = this.wordList[Math.floor(Math.random() * this.wordList.length)];
	this.guessedLetters = [];
	this.errors = 0;
	this.visibleLetters = [];
	this.gameOver = false;

	for (var i = 0; i < this.word.length; i++) {
		this.visibleLetters[i] = (false);
	}
}

Hangman.prototype.checkGuess = function(char) {
	this.guessedLetters.push(char);

	var isInWord = false;
	for (var i = 0; i < this.word.length; i++) {
		if (this.word.charAt(i) === char) {
			isInWord = true;
			this.visibleLetters[i] = true;
		}
	}
	if (!isInWord) {
		this.errors++;
	}

	if (this.errors >= maxErrors) {
		losses++;
		this.alertLines = youLose;
		this.gameOver = true;
	}

	if (!this.visibleLetters.includes(false)) {
		wins++;
		this.alertLines = youWin;
		this.gameOver = true;
		alert('congrats you won!')
		mySound = new sound("bullsintro.mp3")
	}

	game.updatePageData();
};

Hangman.prototype.updatePageData = function() {
	var tempString = "";
	for (var i = 0; i < this.visibleLetters.length; i++) {
		tempString += ((this.visibleLetters[i] || this.gameOver) ? this.word.charAt(i).toUpperCase() : "_");
		if (i < (this.visibleLetters.length - 1)) tempString += " ";
	}
	wordDisplayLettersElement.textContent = tempString;

	tempString = "";
	for (var i = 0; i < this.guessedLetters.length; i++) {
		tempString += (this.guessedLetters[i].toUpperCase());
		if (i < (this.guessedLetters.length - 1)) tempString += " ";
	}
	for (var i = tempString.length; i < 51; i++) {
		tempString += " ";
	}
	guessedLettersElement.textContent = tempString;

	tempString = this.errors + " / " + maxErrors;
	for (var i = tempString.length; i < 32; i++) {
		tempString += " ";
	}
	errorCountElement.textContent = tempString;

	tempString = wins + "";
	for (var i = tempString.length; i < 45; i++) {
		tempString += " ";
	}
	winCountElement.textContent = tempString;

	tempString = losses + "";
	for (var i = tempString.length; i < 43; i++) {
		tempString += " ";
	}
	lossCountElement.textContent = tempString;

	for (var i = 0; i < blinkElements.length; i++) {
		blinkElements[i].textContent = (this.gameOver ? pressAnyKeyToReset[i] : pressAnyKeyToStart[i]);
	}

	for (var i = 0; i < alertLineElements.length; i++) {
		alertLineElements[i].textContent = (this.alertLines[i]);
	}
}

game.updatePageData();
