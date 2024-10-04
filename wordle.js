// Show the modal when the page loads
window.onload = function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

// Get the <span> element that closes the modal
const closeButton = document.querySelector('.close-button');

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Define the target word
const targetWord = 'あそぶ'; // The word is fixed to "あそぶ"

let guessesRemaining = 3; // Players can have 3 guesses
const wordLength = 3; // Word length is 3 letters
let currentGuess = ""; // Store the current guess

// Select grid elements and keyboard elements
const gridCells = document.querySelectorAll('.grid div');
const hiraganaKeys = document.querySelectorAll('.hiragana-key');

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
            updateKeyColor(currentLetter, 'correct'); // Update the keyboard color
        }
        // Check if the letter exists in the word but in the wrong position (yellow)
        else if (targetWord.includes(currentLetter)) {
            cell.classList.add('wrong-position');
            updateKeyColor(currentLetter, 'wrong-position'); // Update the keyboard color
        }
        // Letter is not in the word (gray)
        else {
            cell.classList.add('incorrect');
            updateKeyColor(currentLetter, 'incorrect'); // Update the keyboard color
        }
    }

    // Check if the player guessed the word correctly
    if (currentGuess === targetWord) {
        setTimeout(() => {
            alert('Congratulations! You guessed the word! click ok for the explanation');
            addSuccessSection(); // Add the success section when the player succeeds
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

// Function to update the keyboard color based on guess correctness
function updateKeyColor(letter, status) {
    hiraganaKeys.forEach(key => {
        if (key.textContent === letter) {
            key.classList.remove('correct', 'wrong-position', 'incorrect'); // Remove existing color classes
            key.classList.add(status); // Add new class based on status (correct, wrong-position, incorrect)
        }
    });
}

// Handle Hiragana keyboard input
const guessInput = document.getElementById('guess-input'); // Corrected ID

// Add event listeners for each Hiragana key
hiraganaKeys.forEach(function(key) {
    key.addEventListener('click', function() {
        // Append the clicked character to the guess input field
        if (guessInput.value.length < 3) {
            guessInput.value += key.textContent;
        }
    });
});

// Clear the input field when "Clear" is clicked
document.getElementById('clear-guess').addEventListener('click', function() {
    guessInput.value = ''; // Ensure it's using the correct input ID
});

// Reset the game
function resetGame() {
    guessesRemaining = 3;
    currentGuess = "";
    gridCells.forEach(cell => {
        cell.textContent = ""; // Clear the grid
        cell.classList.remove('correct', 'wrong-position', 'incorrect'); // Remove color classes
    });
    hiraganaKeys.forEach(key => {
        key.classList.remove('correct', 'wrong-position', 'incorrect'); // Reset keyboard color
    });
}

// Function to add a new section below the game area when the player succeeds
function addSuccessSection() {
    // Create a new div element
    const successSection = document.createElement("div");
    successSection.className = "success-section";

    // Add content to the new section
    successSection.innerHTML = `
        <h2>おめでとうございます!</h2>
        <p>Congratulations! You guessed the word correctly!</p>
        <p>Understanding the Verb 遊ぶ (Asobu)</p>
        <p> 遊ぶ, pronounced as asobu, is a verb that means to play. In Japanese, verbs are crucial as they often form the backbone of the sentence. The verb 遊ぶ is used when someone is actively engaging in a playful activity. It is typically used in its dictionary form or conjugated according to the tense and politeness level of the conversation.</p>
    `;

    // Append the new section to the body or a specific area in the DOM
    const credits = document.querySelector(".credits"); // Target the credits section
    document.body.insertBefore(successSection, credits); // Insert above the credits

    // Scroll smoothly to the newly added section
    successSection.scrollIntoView({ behavior: 'smooth' });
}
