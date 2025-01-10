const default_words_hints={
    "javascript": "A popular programming language for web development",
    "python": "A versatile language used in data science and machine learning",
    "java": "A widely used language for enterprise applications",
    "html": "The foundation of web pages",
    "css": "Styles web pages",
    "php": "A server-side scripting language",
    "mysql": "A relational database management system",
    "sqlite": "A lightweight database",
    "postgresql": "A powerful open-source database",
    "mongodb": "A NoSQL database",
    "angular": "A popular JavaScript framework",
    "react": "A JavaScript library for building user interfaces",
    "vue": "A progressive JavaScript framework",
    "node": "A JavaScript runtime environment",
    "express": "A Node.js web framework",
    "typescript": "A superset of JavaScript",
    "swift": "Apple's programming language",
    "kotlin": "A language for Android development",
    "flutter": "A cross-platform UI framework",
    "dart": "The language used by Flutter",
    "go": "A modern programming language",
    "ruby": "A dynamic programming language",
    "assembly": "Low-level programming language",
    "perl": "A scripting language",
    "matlab": "A language for numerical computation",
    "fortran": "A language for scientific computing",
    "scala": "A language for big data processing",
    "objectivec": "Apple's older programming language",
    "delphi": "A programming language",
    "lua": "A scripting language",
    "prolog": "A logic programming language",
    "erlang": "A functional programming language",
    "haskell": "A purely functional programming language",
    "clojure": "A dialect of Lisp",
    "groovy": "A language for Java Virtual Machine",
    "scheme": "A dialect of Lisp",
    "lisp": "A family of programming languages",
    "git": "A version control system",
    "vscode": "A popular code editor",
    "jquery": "A JavaScript library",
    "bootstrap": "A CSS framework",
    "redux": "A state management library",
    "vuex": "A state management library for Vue.js",
    "angularjs": "An older JavaScript framework",
    "backbone": "A JavaScript framework",
    "ember": "A JavaScript framework",
    "polymer": "A JavaScript library",
    "meteor": "A JavaScript framework",
    "tensorflow": "A machine learning library",
    "pytorch": "A machine learning library",
    "opencv": "A computer vision library",
    "scikitlearn": "A machine learning library",
    "pandas": "A data analysis library",
    "numpy": "A numerical computing library",
    "scipy": "A scientific computing library",
    "matplotlib": "A data visualization library",
    "seaborn": "A data visualization library",
    "ggplot2": "A data visualization library",
    "sas": "A statistical software suite",
    "spss": "A statistical software suite",
    "stata": "A statistical software suite",
    "sql": "A database query language",
    "nosql": "A type of database",
    "aws": "A cloud computing platform",
    "azure": "A cloud computing platform",
    "docker": "A containerization platform",
    "kubernetes": "A container orchestration platform",
    "jenkins": "A continuous integration/continuous delivery tool",
    "github": "A code hosting platform",
    "gitlab": "A code hosting platform",
    "bitbucket": "A code hosting platform",
    "trello": "A project management tool",
    "jira": "A project management tool",
    "teams": "A communication platform",
    "wordpress": "A content management system",
    "joomla": "A content management system",
    "drupal": "A content management system",
    "laravel": "A PHP framework",
    "django": "A Python framework",
    "flask": "A Python framework",
    "spring": "A Java framework",
    "aspnet": "A Microsoft framework",
    "nodejs": "A JavaScript runtime environment",
    "ionic": "A mobile app development framework",
    "cordova": "A mobile app development framework",
    "phonegap": "A mobile app development framework",
    "xamarin": "A mobile app development framework"
}

const gallow_art = [
    "   _______        \n" +
    "  |       |\n" +
    "  |\n" +
    "  |\n" +
    "  |\n" +
    "  |\n" +
    "__|__",
  
    "   _______        \n" +
    "  |       |\n" +
    "  |\n" +
    "  |       |\n" +
    "  |\n" +
    "  |\n" +
    "__|__",
  
    "   _______        \n" +
    "  |       |\n" +
    "  |\n" +
    "  |      /|\n" +
    "  |\n" +
    "  |\n" +
    "__|__",
  
    "   _______        \n" +
    "  |       |\n" +
    "  |\n" +
    "  |      /|\\\n" +
    "  |\n" +
    "  |\n" +
    "__|__",
  
    "   _______        \n" +
    "  |       |\n" +
    "  |\n" +
    "  |      /|\\\n" +
    "  |      /\n" +
    "  |\n" +
    "__|__",
  
    "   _______        \n" +
    "  |       |\n" +
    "  |\n" +
    "  |      /|\\\n" +
    "  |      / \\\n" +
    "  |\n" +
    "__|__",
  
    "   _______        \n" +
    "  |       |\n" +
    "  |       O\n" +
    "  |      /|\\\n" +
    "  |      / \\\n" +
    "  |\n" +
    "__|__",

    // Win frame 1
    "   _______        \n" +
    "  |       |\n" +
    "  |\n" +
    "  |\n" +
    "  |          O\n" +
    "  |         /|\\\n" +
    "__|__       / \\",

    // Win frame 2
    "   _______        \n" +
    "  |       |\n" +
    "  |        Hooray!\n" +
    "  |         \\O/\n" +
    "  |          |\n" +
    "  |         / \\\n"+
    "__|__"
  ];

const max_guesses = 6
let used_fails = 0
let game_ended = false

// TODO: use Set for O(1) instead of O(n) performance
let guessedLetters = []

//getting all my web elements
const web_displayed_word = document.getElementById("word")
const web_guesses_display = document.getElementById("remaining_fails")
const message = document.getElementById("message")
const web_gallow_art = document.getElementById("gallow_art")
const web_hint = document.getElementById("hint")

//getting my buttons
const submitButton = document.getElementById("submitButton");
const hintButton = document.getElementById("hintButton");
const letterInput = document.getElementById("letterInput");
const refreshButton = document.getElementById("refreshButton");

let words_hints = {}
let word_options = []
let word = ""

async function fetchWords(){
    try{
        const response = await fetch('wordOptions.json');
        const available_words = await response.json();

        return available_words

    } catch (error) {
        console.error("Fetching error caught: ", error.message)
        console.log("using default handcoded word list instead of fetched data")

        console.log("returning default data: ", default_words_hints)
        return default_words_hints
    }
}

function initialiseDataAndDisplay(){

    //loads data from .json or if that fails returns default hardcoded dictionary
    fetchWords().then(data => {
        words_hints = data;
        word_options= Object.keys(words_hints);
        word = word_options[Math.floor(Math.random() * word_options.length)].toLocaleUpperCase()

         // trim here removes the white spaces around _
        web_displayed_word.textContent = "_ ".repeat(word.length).trim() 
    })

    //initialising text in web
    message.textContent = "Enter a letter to play"
    web_guesses_display.textContent = `You have ${max_guesses} guesses left`
    web_gallow_art.textContent = gallow_art[used_fails]

}

function buildGuessWord(new_letter){
//we need the new letter var here because the function is called for checking the guess validity before the letter is added to guessed letter
    available_letters = guessedLetters.concat(new_letter)

    return word.split("").map((letter) => (available_letters.includes(letter) ? letter : "_")).join(" ")
}

function updateDisplayedWord(new_character){
    web_displayed_word.textContent = buildGuessWord(new_character)
}

function showHint(){
    hint = words_hints[(word.toLowerCase())]
    web_hint.textContent = ("Hint: " + hint)
}



function animateGallowArt(){
    frame1 = gallow_art[7]
    frame2 = gallow_art[8]

    showFrame1 = true
        setInterval(
            ()=>{
                if (showFrame1){
                    web_gallow_art.textContent = frame1;
                    showFrame1 = false
                } else {
                    web_gallow_art.textContent = frame2;
                    showFrame1 = true
                }
            }, 1000)
}

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

    if (!buildGuessWord(character).includes("_")){
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

    updateDisplayedWord(inputValue)
    
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
            message.textContent = "Congratulations! You Won!"
            animateGallowArt()
            break;

        case GuessResult.INCORRECT_FINAL:
            game_ended = true
            message.textContent = "You've lost!"
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

//setting up initial display
initialiseDataAndDisplay()

//handing all the button clicks
submitButton.addEventListener("click", handleClick);
hintButton.addEventListener("click", showHint);
refreshButton.addEventListener("click", restartGame);
letterInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {handleClick()};
});