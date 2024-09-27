// Define the target word
const targetWord = 'あそぶ'; // The word is fixed to "あそぶ"

let guessesRemaining = 3; // Players can have 3 guesses
const wordLength = 3; // Word length is 3 letters
let currentGuess = ""; // Store the current guess

// Select grid elements
const gridCells = document.querySelectorAll('.grid div');

// Function to check and submit a guess
function submitGuess() {
    const input = document.getElementById('guess-input').value;

    if (input.length !== wordLength) {
        alert("Please enter a 3-letter Hiragana word.");
        return;
    }

    currentGuess = input; // Store current guess
    checkGuess(); // Call the function to check guess
    document.getElementById('guess-input').value = ""; // Clear input
}

// Function to check the guess and add color feedback
function checkGuess() {
    const currentRowStartIndex = (3 - guessesRemaining) * wordLength; // Index for the current row in the grid

    for (let i = 0; i < wordLength; i++) {
        const currentLetter = currentGuess[i]; // Letter in the current guess
        const cell = gridCells[currentRowStartIndex + i]; // The specific cell in the grid for this letter

        cell.textContent = currentLetter; // Display the letter in the grid

        // Check if the letter is in the correct position (green)
        if (currentLetter === targetWord[i]) {
            cell.classList.add('correct');
        }
        // Check if the letter exists in the word but in the wrong position (yellow)
        else if (targetWord.includes(currentLetter)) {
            cell.classList.add('wrong-position');
        }
        // Letter is not in the word (gray)
        else {
            cell.classList.add('incorrect');
        }
    }

    // Check if the player guessed the word correctly
    if (currentGuess === targetWord) {
        setTimeout(() => {
            alert('Congratulations! You guessed the word!');
        }, 100);
        return;
    }

    // Decrement the number of guesses remaining
    guessesRemaining--;

    // If no guesses remain, end the game
    if (guessesRemaining === 0) {
        alert(`Game over! The correct word was: 'あそぶ'`);
        resetGame();
    }
}

// Reset the game
function resetGame() {
    guessesRemaining = 3;
    currentGuess = "";
    gridCells.forEach(cell => {
        cell.textContent = ""; // Clear the grid
        cell.classList.remove('correct', 'wrong-position', 'incorrect'); // Remove color classes
    });
}
