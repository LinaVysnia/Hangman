const word = "OBAMNA"
const max_guesses = 6
let used_fails = 0

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

// trim here removes the white spaces around _
let display_word = "_ ".repeat(word.length).trim() 

function display_setup(){

    web_displayed_word.textContent = display_word
    message.textContent = "Enter a letter to play"
    web_guesses_display.textContent = `You have ${max_guesses} guesses left`
    web_gallow_art.textContent = gallow_art[used_fails]

}

let guessedLetters =[]

//setting up initial display
display_setup()

function update_display_word(){
    web_displayed_word.textContent = 
        word.split("").map((letter) => (guessedLetters.includes(letter) ? letter : "_")).join(" ")
}

const submitButton = document.getElementById("submitButton");
const letterInput = document.getElementById("letterInput");

function handleClick(){
    let inputValue = letterInput.value.trim().toUpperCase(); 

    if (inputValue == "" || inputValue.length > 1) {
        alert("Enter a letter to play")
    } else if (guessedLetters.includes(inputValue)) {
        alert("You've tried this letter already")
        }
        else { 
            //clearing the text box
            letterInput.value = "";

            guessedLetters.push(inputValue)

            if (word.includes(inputValue)) {

                message.textContent = "Good guess!"
                update_display_word()

            } else {

                used_fails += 1
                web_gallow_art.textContent = gallow_art[used_fails]

                if (used_fails == max_guesses) {
                    message.textContent = "You lost!"
                    web_guesses_display.textContent = `You have no guesses left`

                } else {
                    message.textContent = "uh oh! Hanging in progress..."
                    web_guesses_display.textContent = `You have ${max_guesses - used_fails} guesses left`
                }
            }
        }
    }

submitButton.addEventListener("click", handleClick);
letterInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {handleClick()};
});

// handle click
    // check if guessed correctly
        // if incorrectly 
            // display message incorrect
            // update drawing
        // if correct update displayed word
        //      display message if guessed correctly
    // check if whole word or if guessed or user out of guesses
        // display message if any condition is met