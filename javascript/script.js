
// WORD TPO BE GENERATED FOR THE generateWord (PHONE AND LAPTOP BRANDS) 
var words = ["maroon", 
             "blue", 
             "orange", 
             "yellow",  
             "black", 
             "pink", 
             "purple", 
             "green", 
             "red", 
             "beige", 
             "grey", 
             "yellow"];

//VARIABLE DECLARATIONS FOR THE generateWord
var randomWord = "";
var lettersOfWord = [];
var blanks = 0;
var blanksAndCorrect = [];
var wrongGuess = [];
var guessesRemaining = 5;


// START OF THE generateWord BY GENARATION RANDOM WORD
function generateWord() {
    
    //STYLING THE GENERATED UNDERSCORES
    var underScore = "<span class=underscore>" + "_" + "</span>";
    
    //GENERATE RANDOM WORD
    randomWord = words[Math.floor(Math.random() * words.length)];

    //SPLITTING INDIVIDUAL WORD TO A NEW ARRAY
    lettersOfWord = randomWord.split("");

    //STORES LENGHT OF WORD IN BLANKS
    blanks = lettersOfWord.length;
    
    //LOOP TO GENERATE "_" FOR EACH LETTER IN ARRAY STORED IN BLANKS
    for (var i = 0; i < blanks; i++) {
        blanksAndCorrect.push(underScore);
    }
    //DISPLAY STYLE UNDERSCORED IN HTML
    document.getElementById("currentword").innerHTML = "  " + blanksAndCorrect.join(" ");

}




//RESET FUNCTION OF THE GAME
function reset() {
    guessesRemaining = 5;
    wrongGuess = [];
    blanksAndCorrect = [];
    document.getElementsByClassName("wrong-moves")[0].style.opacity = ".3";
    document.getElementsByClassName("wrong-moves")[1].style.opacity = ".3";
    document.getElementsByClassName("wrong-moves")[2].style.opacity = ".3";
    document.getElementsByClassName("wrong-moves")[3].style.opacity = ".3";
    generateWord();
  
}

//FUNCTION TO SHOW EXIT TEXT IF USER WIN OR LOSE IN THE GAME
function exitText(){
        document.getElementById("exit-text").style.display = "block";
        document.getElementById("main").classList.add("hidden");
}


//CHECK THE GUESSED LETTER IF RIGHT OR WRONG
function checkLetters(letter) {
    var wrongLetter =  "<span class=wrongLetter>" +  letter + "</span>";
    var correctLetter =  "<span class=correctLetter>" +  letter + "</span>";
    var letterInWord = false;
    
    //IF GENERATED RANDOWMWORD IS EQUAL, VARIABLE IS TRUE
    for (var i = 0; i < blanks; i++) {
        if (randomWord[i] == letter) {
            letterInWord = true;
        }
    }
    //IF LETTERINWORD = FALSE
    if (letterInWord) {
        
        //CHECKS LETTER IF MATACHES THE WORD
        for (var i = 0; i < blanks; i++) {
            if (randomWord[i] == letter) {
                blanksAndCorrect[i] = letter;
                //blanksAndCorrect[i] = correctLetter;
            }
        }
    }
    
    // PUSH INCORRECT GUESS TO WRONG GUESS CONTAINER IN HTML
    else {
        
       wrongGuess.push(wrongLetter);

      guessesRemaining--;// EACH WRONG LETTER GUESSREMAINING DECREASE
    }
}


//CHECKS WIN OR LOSS IN THE GAME
function complete() {
    var wrong1 = document.getElementById("wm1");
    var wrong2 = document.getElementById("wm2");
    var wrong3 = document.getElementById("wm3");
    var wrong4 = document.getElementById("wm4");


    // PLAYER WON
    if (lettersOfWord.toString() == blanksAndCorrect.toString()) {

        exitText();
        document.getElementById("intro-message").innerHTML = "You Got It!";
        document.getElementById("answer").innerHTML = "Weee! You guessed it!" + "<span id=answer-highlight>" + randomWord + "</span>";
		document.getElementById("h3-bg").style.background = "##f53b57";
		document.getElementById("intro-message").style.color = "#ffd32a";
		document.getElementById("intro-message").style.textShadow = "5px 5px #1e272e";
        reset();

    }
    
    //WRONG LETTER INDICATOR SHOW EACH TIME GUESSREMAING DECREASES
    else if(guessesRemaining === 4){
            
            wrong1.classList.add("wrong-moves-animation");
            document.getElementsByClassName("wrong-moves")[0].style.opacity = "1";
             
             }
  else if(guessesRemaining === 3){
           
            wrong2.classList.add("wrong-moves-animation");
            document.getElementsByClassName("wrong-moves")[1].style.opacity = "1";
             
             }
    else if(guessesRemaining === 2){
            document.body.classList.add("background-red");
            wrong3.classList.add("wrong-moves-animation");
            document.getElementsByClassName("wrong-moves")[2].style.opacity = "1";
             
             }
    
    
    else if (guessesRemaining === 1) {
            wrong4.classList.add("wrong-moves-animation");
            document.getElementsByClassName("wrong-moves")[3].style.opacity = "1";
            }
    
    //PLAYER LOSE WHEN GUESSREMAINING EQUALS TO ZERO
    else if (guessesRemaining === 0) {

        exitText();
        document.getElementById("intro-message").innerHTML = "You Lose!";
        document.getElementById("answer").innerHTML = "Oh No! You missed the word" + "<span id=answer-highlight>" + randomWord +"</span>";
		document.getElementById("h3-bg").style.background = "#1e272e";
		document.getElementById("intro-message").style.color = "#f53b57";
		document.getElementById("intro-message").style.textShadow = "5px 5px #1e272e";
		
        reset();
            }
    
    //DISPLAY LETTERS IN CURRENTWORD CONTAINERS AND REMAINING GUESS LEFT
    document.getElementById("currentword").classList.add("correctLetter-ver2");
    document.getElementById("currentword").innerHTML = " " + blanksAndCorrect.join(" "); 
    document.getElementById("guessesremaining").innerHTML = " " + guessesRemaining;
    var wrongLettersContainer = document.getElementById("wrongLetter");
    wrongLettersContainer.innerHTML = wrongGuess.join(" ");
}


//EVENT LISTERNER WHEN USER CLICK PLAY BUTTON TO START THE GAME
var main = document.getElementById("main");
document.getElementById("welcome-play-button").addEventListener("click", hideWelcome);

function hideWelcome() {
    document.getElementById("welcome-overlay-container").style.display = "none";
    main.classList.remove("hidden");
    main.classList.add("flex-container");
   
}// END OF HIDEWELCOME FUNCTION



//EVENT LISTNER WHEN USER CLICK PLAY AGAIN BUTTON TO RESTART THE GAME
document.getElementById("exit-play-button").addEventListener("click", hideExitText);

function hideExitText() {

  document.getElementById("exit-text").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("main").classList.remove("hidden");  

  generateWord();
  reset();
   
}// END OF HIDEEXITTEXT FUNCTION


//FUNCTION CALLED TO START THE GAME AND GENERATE A RANDOM WORD
generateWord();

//CHECK FOR KEYUP AND CONVERT THE INPUT INTO LOWERCASE
document.onkeyup = function (event) {
    
    var guesses = String.fromCharCode(event.keyCode).toLowerCase();
    
    
    //CHECK IF THE GUESS ENTERED MATCH THE RANDOWM GENERATED WORD
    checkLetters(guesses);
    
    //FUNCTION TO CHECK WIN OR LOSE
    complete();  
    
    
}//END OF ONKEYUP CHECK

