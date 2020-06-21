var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var gameStarted = false;

$(document).keydown(function () {
	if (!gameStarted) {
		setTimeout(function () {
			nextSequence();
		}, 250);
		gameStarted = true;
	}
});

$(".btn").click(function () {
	clickCount++;
	var userChosenColour = this.id;
	userClickedPattern.push(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
	playAudio(userChosenColour);
});

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(() => {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function playAudio(key) {
	var audio = new Audio("sounds/" + key + ".mp3");
	audio.play();
}

function nextSequence() {
	level++;
	$("#level-title").text("Level " + level);
	var randomNumber = Math.floor(Math.random() * 4);
	var chosenColour = buttonColours[randomNumber];
	gamePattern.push(chosenColour);
	$("#" + chosenColour)
		.fadeOut(100)
		.fadeIn(100);
	playAudio(chosenColour);
	userClickedPattern.length = 0;
	clickCount = 0;
}

function checkAnswer(index) {
	if (gamePattern[index] === userClickedPattern[index]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		playAudio("wrong");
		$("body").addClass("game-over");
		$("#level-title").text("Game Over, Press Any Key to Restart");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		startOver();
	}
}

function startOver() {
	userClickedPattern.length = 0;
	gamePattern.length = 0;
	level = 0;
	gameStarted = false;
}
