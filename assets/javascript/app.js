var triviaQuestions = [{
	question: "Which artist brought Bad Boy Records their first hit single?",
	answerList: ["Notorious B.I.G.", "Junior Mafia", "Ma$e", "Craig Mack"],
	answer: 3
},{
	question: "Which vocal group merged gospel vocals and Hip Hop beats to create contemporary R&B?",
	answerList: ["Boys II Men", "Jodeci", "Wu Tang Clan", "A Tribe Called Quest"],
	answer: 1
},{
	question: "Which year became the divide between old school and new school hip hop with the release of Wu Tang Clan's '36 Chambers' and A Tribe Called Quest's 'Midnight Maurauders'?",
	answerList: ["1993", "2004", "1996", "1987"],
	answer: 0
},{
	question: "Which rap group has been hailed as our generation's Beatles?",
	answerList: ["Hot Boys", "Outkast", "Migos", "A$AP Mob"],
	answer: 2
},{
	question: "The original members of the Wu Tang Clan are: Method Man, RZA, GZA, Inspectah Deck, Raekwon, Ghostface Killah, U-God, Masta Killa, and?",
	answerList: ["Cappadonna", "Ol' Dirty Bastard", "Nas", "Cilvaringz"],
	answer: 1
},{
	question: "Who rapped about their 'penthouse suite, penthouse freaks, In-house beats, French comteese, 10 thou' piece'?",
	answerList: ["Jay-Z", "Diddy", "Big Pun", "Gucci Mane"],
	answer: 2
},{
	question: "Acorrding to Kendrick Lamar, what will kill us all?",
	answerList: ["Greed", "Pride", "Lust", "Sloth"],
	answer: 1
},{
	question: "At the age of 12 who shot their drug addicted older brother over a stolen ring?",
	answerList: ["2Pac", "Raekwon", "Jay-Z", "DMX"],
	answer: 2
},{
	question: "According to Gucci Mane in 'Met Gala', what're federal agents using to watch him?",
	answerList: ["Binoculars", "Hidden Cameras", "Phones", "Spies"],
	answer: 0
},{
	question: "Which artist groomed Missy Elliot, Timbaland, Ginuwine, and Static Major?",
	answerList: ["Diddy", "Suge Knight", "Devante Swing", "R. Kelly"],
	answer: 2
},{
	question: "Who does Tech N9ne credit with saving his life?",
	answerList: ["Quincy Jones", "2Pac", "Marvin Gaye", "God"],
	answer: 0
},{
	question: "Which rapper outshined Jay-Z during a freestyle on the lauded New York Radio Show 'The Stretch Armstrong and Bobbito Show'?",
	answerList: ["Notorious B.I.G.", "Big L", "Ma$e", "Busta Rhymes"],
	answer: 1
},{
	question: "Which rapper began in the group Sista?",
	answerList: ["Lauryn Hill", "Cardi B", "Missy Elliott", "Nicki Minaj"],
	answer: 2
},{
	question: "Who gave Busta Rhymes his name?",
	answerList: ["Grandmaster Flash", "Q-Tip", "Chuck D", "RZA"],
	answer: 2
},{
	question: "Who was the first rapper to win album of the year at the Grammys?",
	answerList: ["Lauryn Hill", "2Pac", "Will Smith", "Queen Latifa"],
	answer: 0
	
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "WOOP! There it is!",
	incorrect: "Damn shame!",
	endTime: "Get with the hustle, you're too slow!",
	finished: "Alright! Let's see how you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}