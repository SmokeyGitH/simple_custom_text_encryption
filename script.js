// The standard alphabet for reference
const STANDARD_ALPHABET = "abcdefghijklmnopqrstuvwxyz";

// Function to encrypt the text using the custom key
function encryptText() {
    let inputText = document.getElementById("inputText").value;
    let customKey = document.getElementById("customKey").value;

    // Parse the custom key into an array of integers
    let keyArray = parseKey(customKey);
    if (keyArray === null) return;

    let encryptedText = "";
    let keyIndex = 0;

    // Loop through each character of the input text
    for (let char of inputText) {
        if (isLetter(char)) {
            let lowerChar = char.toLowerCase();
            let currentIndex = STANDARD_ALPHABET.indexOf(lowerChar);
            let shift = keyArray[keyIndex % keyArray.length];  // Cycle through the custom key
            let newIndex = (currentIndex + shift) % 26;  // Wrap around the alphabet
            let encryptedChar = STANDARD_ALPHABET[newIndex];

            // Preserve case (uppercase or lowercase)
            encryptedText += (char === char.toUpperCase()) ? encryptedChar.toUpperCase() : encryptedChar;

            keyIndex++;  // Move to the next key in the custom key array
        } else {
            encryptedText += char;  // Non-alphabet characters remain unchanged
        }
    }

    document.getElementById("resultText").textContent = encryptedText;
}

// Function to decrypt the text using the custom key
function decryptText() {
    let inputText = document.getElementById("inputText").value;
    let customKey = document.getElementById("customKey").value;

    // Parse the custom key into an array of integers
    let keyArray = parseKey(customKey);
    if (keyArray === null) return;

    let decryptedText = "";
    let keyIndex = 0;

    // Loop through each character of the input text
    for (let char of inputText) {
        if (isLetter(char)) {
            let lowerChar = char.toLowerCase();
            let currentIndex = STANDARD_ALPHABET.indexOf(lowerChar);
            let shift = keyArray[keyIndex % keyArray.length];  // Cycle through the custom key
            let newIndex = (currentIndex - shift + 26) % 26;  // Wrap around backward for decryption
            let decryptedChar = STANDARD_ALPHABET[newIndex];

            // Preserve case (uppercase or lowercase)
            decryptedText += (char === char.toUpperCase()) ? decryptedChar.toUpperCase() : decryptedChar;

            keyIndex++;  // Move to the next key in the custom key array
        } else {
            decryptedText += char;  // Non-alphabet characters remain unchanged
        }
    }

    document.getElementById("resultText").textContent = decryptedText;
}

// Helper function to parse the custom key string into an array of integers
function parseKey(customKey) {
    let keyArray = customKey.split(',').map(Number);
    if (keyArray.some(isNaN)) {
        alert("Custom key must be a comma-separated list of numbers.");
        return null;
    }
    return keyArray;
}

// Helper function to check if a character is a letter
function isLetter(c) {
    return c.toLowerCase() != c.toUpperCase();
}
