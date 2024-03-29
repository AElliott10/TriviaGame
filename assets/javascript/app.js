//console.log("JS is working");//show that js is working
console.log($);//show that jquery is working
console.log(quizQuestions);

//Initial values
var counter = 5; //timer that goes from 30 to zero
var currentQuestion = 0; //pulls the questions from the array; 
var score = 0; //how many questions user got right
var lost = 0; //shows how many questions are wrong
var timer; //holds the id of our set interval; holds the value of the clock; allow us to clear the timer when needed

//display the questions and the choices in the browser together in order


//everytime we call this function it picks the current question and choices alternate way to write code: $('#game').html('<h4>' + question + '</h4>');

// display next question after timer ends
function nextQuestion() {
    //need logic to make sure it doesn't go beyound the # of questions in the array
    var isQuestionOver = (quizQuestions.length - 1) === currentQuestion;

    if (isQuestionOver) {
        console.log('game is over!');
        displayResult();

    } else {
        currentQuestion++;//this variable goes to the next question by the incrementor
        loadQuestion();
    }
}

//start a 30 sec timer to respond or choose an answer to each question
function timeUp() {
    clearInterval(timer);

    lost++;
   preloadImage('lost');
   setTimeout(nextQuestion, 3*1000);//call after the time is up
}

function countDown() {
    counter--;//-- decreemntor  decreases by 1

    $('#time').html('Timer: ' + counter);

    if (counter === 0) { // this is how you stop the timer from going into neg secs
        timeUp();//call this function when it reaches zero
    }
}


function loadQuestion() {
    counter = 5; //want it to display 10 sec at the beginning of the game 
    timer = setInterval(countDown, 1000);

    var question = quizQuestions[currentQuestion].question;
    var choices = quizQuestions[currentQuestion].choices;

    $('#time').html('Timer: ' + counter);
    $(`#game`).html(`
    <h4>${question}</h4>
    ${loadChoices(choices)}
    ${loadRemainingQuestions()}
    `);

}

function loadChoices(choices) {
    let result = "";

    for (let i = 0; i < choices.length; i++) {
        result += `<p class="choice" data-answer="${choices[i]}">${choices[i]}</p>`;//data-answer is an attribute that pulls the value up to the loadQuestion function at the point where its called by ${loadChoices(choices)}
    }
    return result;
}

//Either correct/wrong choice selected, go to the next question
$(document).on('click', '.choice', function () {
    //need to get the attribute data-answer; this represents every element that we click on then get the attribute value of the data-answer; uding event delegation - which allows you to focus on the choice selections and the related values
    //first listen to the full Dom and then the attributes
    
    clearInterval(timer);
    var selectedAnswer = $(this).attr('data-answer');
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if (correctAnswer === selectedAnswer) {
        score++;
       preloadImage('win');
       setTimeout(nextQuestion, 3*1000);
        console.log("win");
    } 
    else {
        lost++;
       preloadImage('lost');
        setTimeout(nextQuestion, 3*1000);
        console.log("lost");
    }
});

//Display the entire result
function displayResult() {
    var result = `
    <p> You got ${score} question(s) right.</p>
    <p> You missed ${lost} question(s).</p>
    <p> You got ${score} out of ${quizQuestions.length} questions.</p>
    <button class="btn btn-primary" id="reset">Reset Game</button>
    `;

    $('#game').html(result);
}

$(document).on('click','#reset', function() {
    //want to reset the variables when the reset button is clicked
    counter = 5;
    currentQuestion = 0; 
    score = 0; 
    lost = 0; 
    timer = null;

    loadQuestion();
});

//logic to calculate the remaining questions- we need to start with question 1
//need to call this where you are loading the question - go to loadQuestion
function loadRemainingQuestions(){
    
    var remainingQuestion = quizQuestions.length - (currentQuestion + 1);
    var totalQuestion = quizQuestions.length;

    return `Remaining Question: ${remainingQuestion}/${totalQuestion}`;
}


//to display fun images
function randomImage(images){
    var random = Math.floor(Math.random()*images.length);

    var randomImage = images[random];
    return randomImage;
}
//call it where there is a win and before the nextQuestion
function preloadImage(status){
    var correctAnswer = quizQuestions[currentQuestion].correctAnswer;

    if(status === 'win'){
        $('#game').html(`
            <p class="preload-image">Congrats!</p>

            <img src="${randomImage(celebrateImages)}"/>
        `); 

    } 
    
    else {

        $('#game').html(`
            <p class="preload-image">WRONG!!!!</p>

            <img src="${randomImage(oopsImages)}"/>
        `);
        //call where you lost and before the nextQuestion
    }
}

$('#start').click(function() {
    $('#start').remove();//remove the button after clicked on
    
    $('#time').html(counter);//start the counter
    
    loadQuestion();
});
