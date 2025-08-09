Pangram = function(text) {
    this.text = text;
}

Pangram.prototype.alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

Pangram.prototype.isPangram = function() {
    const foundLetters = new Set();
    const text = this.text;
    const alphabetLength = this.alphabet.length;

    // Iterate through the input text character by character
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);

        // Convert character to its lowercase ASCII code if it's an uppercase letter
        // ASCII 'A' is 65, 'Z' is 90
        let lowerCharCode = charCode;
        if (charCode >= 65 && charCode <= 90) {
            lowerCharCode = charCode + 32; // Convert to lowercase (e.g., 'A' + 32 = 'a')
        }

        // Check if the character is a lowercase English letter (ASCII 'a' is 97, 'z' is 122)
        if (lowerCharCode >= 97 && lowerCharCode <= 122) {
            foundLetters.add(String.fromCharCode(lowerCharCode));

            // Early exit: If we have found all unique letters required for the alphabet,
            // we can stop processing the rest of the text.
            if (foundLetters.size === alphabetLength) {
                return true;
            }
        }
    }

    // After iterating through the entire text, check if the number of unique letters found
    // matches the expected alphabet length.
    return foundLetters.size === alphabetLength;
}

export default Pangram;