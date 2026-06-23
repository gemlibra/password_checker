/**
 * Evaluates the strength of a given password based on specific security rules.
 * * @param {string} password - The raw text input string from the user.
 * @returns {boolean} - True if all criteria are met, otherwise false.
 */
function passwordChecker(password) {
    // RATIONALE: Enforcing a minimum length prevents brute-force dictionary attacks.
    const minLength = 10;
    
    // RATIONALE: Regular expression tracking at least one upper-case letter (A through Z).
    const capitalLetter = /[A-Z]/;
    
    // RATIONALE: Regular expression looking for any character that is NOT a lowercase letter, 
    // uppercase letter, or digit. This forces the inclusion of special characters (e.g., !, @, #).
    const nonAlphanumeric = /[^a-zA-Z0-9]/;

    // REASONING: An 'if' statement evaluates if all conditions return true simultaneously using the logical AND (&&) operator.
    if (
        password.length >= minLength &&          // Checks if total characters meet or exceed 10.
        capitalLetter.test(password) &&         // Uses .test() method to check if regex matches an uppercase letter.
        nonAlphanumeric.test(password)          // Uses .test() method to check if regex matches a special character.
    ) {
        return true; // The password meets all explicit criteria.
    } else {
        return false; // The password failed one or more requirements.
    }
}

// DOM MANIPULATION & UI EVENT HANDLING

// Selecting the required HTML elements using their unique IDs so we can read values and listen to actions.
const passwordInput = document.getElementById('passwordInput');
const checkBtn = document.getElementById('checkBtn');
const feedbackContainer = document.getElementById('feedback');
const clearPW = document.getElementById("#clearBtn");

// Attaching a Click Event Listener to the button to trigger verification when the user is ready.
checkBtn.addEventListener('click', function() {
    // Grabbing the current value entered into the input field.
    const userPassword = passwordInput.value;
    
    // Running the raw template validation logic against the user's input.
    const isValid = passwordChecker(userPassword);
    
    // Resetting the feedback container class list to clear old visual styles before updating.
    feedbackContainer.className = 'feedback';
    
    // Update UI based on evaluation outcome
    if (isValid) {
        // RATIONALE: Update text content safely without risking XSS injections via innerHTML.
        feedbackContainer.textContent = 'Strong password! Validation passed.';
        // Apply styling class for successful checks.
        feedbackContainer.classList.add('success');
    } else {
        // Inform user exactly what rules they failed to comply with.
        feedbackContainer.textContent = 'Weak password. Must be at least 10 characters long, include an uppercase letter, and contain a special character.';
        // Apply styling class for failed checks.
        feedbackContainer.classList.add('error');
    }
});

/**
 * Resets the password input field and clears any active validation feedback from the UI.
 * @param {HTMLInputElement} inputElement - The password input DOM element to clear.
 * @param {HTMLDivElement} feedbackElement - The feedback container DOM element to hide.
 */
function clearPasswordInput(inputElement, feedbackElement) {
    // RATIONALE: Clearing the value property empties the text box for the user.
    inputElement.value = '';

    // RATIONALE: Completely wiping the text content prevents old success/error messages from hanging around.
    feedbackElement.textContent = '';

    // RATIONALE: Re-applying 'feedback' and 'hidden' resets the container back to its original invisible state.
    feedbackElement.className = 'feedback hidden';
}

// DOM SELECTION & EVENT HANDLING FOR THE CLEAR BUTTON

// Selecting the new clear button from the DOM (assuming it has an id of 'clearBtn')
const clearBtn = document.getElementById('clearBtn');

// Attaching a click event listener to the clear button
clearBtn.addEventListener('click', function() {
    // REASONING: Passing our global DOM references into the function keeps the execution modular and clean.
    clearPasswordInput(passwordInput, feedbackContainer);
});



