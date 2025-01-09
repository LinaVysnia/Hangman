word_options={}

async function fetchWords(){
    const response = await fetch('wordOptions.json');
    available_words = await response.json();

    return available_words
}

const word_options = await fetchWords()

console.log (word_options)
//TO DO add json loading

let word = "OBAMNA"
const max_guesses = 6
let used_fails = 0
let game_ended = false

const gallow_art = [
    "   _______\n" +
    "  |       |\n" +
    "  |\n" +
    "  |\n" +
    "  |\n" +
    "  |\n" +
    "__|__",
  
    "   _______\n" +
    "  |       |\n" +
    "  |\n" +
    "  |       |\n" +
    "  |\n" +
    "  |\n" +
    "__|__",
  
    "   _______\n" +
    "  |       |\n" +
    "  |\n" +
    "  |      /|\n" +
    "  |\n" +
    "  |\n" +
    "__|__",
  
    "   _______\n" +
    "  |       |\n" +
    "  |\n" +
    "  |      /|\\\n" +
    "  |\n" +
    "  |\n" +
    "__|__",
  
    "   _______\n" +
    "  |       |\n" +
    "  |\n" +
    "  |      /|\\\n" +
    "  |      /\n" +
    "  |\n" +
    "__|__",
  
    "   _______\n" +
    "  |       |\n" +
    "  |\n" +
    "  |      /|\\\n" +
    "  |      / \\\n" +
    "  |\n" +
    "__|__",
  
    "   _______\n" +
    "  |       |\n" +
    "  |       O\n" +
    "  |      /|\\\n" +
    "  |      / \\\n" +
    "  |\n" +
    "__|__"
  ];

//getting all my web elements
let web_displayed_word = document.getElementById("word")
let web_guesses_display = document.getElementById("remaining_fails")
let message = document.getElementById("message")
let web_gallow_art = document.getElementById("gallow_art")

function initialiseDisplay(){

    // trim here removes the white spaces around _
    web_displayed_word.textContent = "_ ".repeat(word.length).trim() 
    message.textContent = "Enter a letter to play"
    web_guesses_display.textContent = `You have ${max_guesses} guesses left`
    web_gallow_art.textContent = gallow_art[used_fails]

}

function updateDisplayedWord(){
    web_displayed_word.textContent = buildGuessWord('')
}

function buildGuessWord(new_letter){
    available_letters = guessedLetters + [new_letter]
    return word.split("").map((letter) => (available_letters.includes(new_letter) ? letter : "_")).join(" ")
}

// TODO: use Set for O(1) instead of O(n) performance
let guessedLetters = []

//setting up initial display
initialiseDisplay()

const submitButton = document.getElementById("submitButton");
const letterInput = document.getElementById("letterInput");
const refreshButton = document.getElementById("refreshButton");

// kinda like grouping consts with enum 
const GuessResult = {
    INVALID: 1,
    DUPLICATE: 2,
    CORRECT: 3,
    INCORRECT: 4,
    INCORRECT_FINAL: 5,
    CORRECT_FINAL: 6,
}

function takeGuess(character){
    if (character.length != 1 || !character.match(/[a-z]/i)) {
        return GuessResult.INVALID
    }
    
    if (guessedLetters.includes(character)) {
        return GuessResult.DUPLICATE
    }

    if (buildGuessWord(character) == word){
        return GuessResult.CORRECT_FINAL
    }
    
    if (word.includes(character)) {
        return GuessResult.CORRECT
    }
    
    if (onGameEndedGuess()) {
        return GuessResult.INCORRECT_FINAL
    }

    return GuessResult.INCORRECT
}

//modern problems require modern solutions
function restartGame(){
    location.reload()
}

function onGameEndedGuess() {
    used_fails += 1
    web_gallow_art.textContent = gallow_art[used_fails]
    return used_fails == max_guesses // return if final guess
}

function handleClick(){
    if (game_ended) {
        return
    }
    let inputValue = letterInput.value.trim().toUpperCase(); 
    updateDisplayedWord()

    switch(takeGuess(inputValue)) {

        case GuessResult.INVALID:
            alert("Enter a letter to play")
            break;

        case GuessResult.DUPLICATE:
            alert("You've tried this letter already")
            break;

        case GuessResult.CORRECT:
            message.textContent = "Good guess!"
            break;

        case GuessResult.CORRECT_FINAL:
            game_ended = true
            message.textContent = "You Won!"
            break;

        case GuessResult.INCORRECT_FINAL:
            game_ended = true
            message.textContent = "You lost!"
            web_guesses_display.textContent = `You have no guesses left. The word was "${word}"`
            break;

        case GuessResult.INCORRECT:
            message.textContent = "uh oh! Hanging in progress..."
            web_guesses_display.textContent = `You have ${max_guesses - used_fails} guesses left`
            break;
    }

    guessedLetters.push(inputValue)
    letterInput.value = ""
}

submitButton.addEventListener("click", handleClick);
refreshButton.addEventListener("click", restartGame);
letterInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {handleClick()};
});