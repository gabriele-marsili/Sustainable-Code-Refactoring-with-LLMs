Pangram = function(text) {
    this.text = text;
}

// The `alphabet` array is no longer needed as we'll derive presence directly from the input text.
// Pangram.prototype.alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

Pangram.prototype.isPangram = function() {
    // Use a fixed-size boolean array to efficiently track which English alphabet letters (a-z)
    // have been found in the text.
    // Index 0 corresponds to 'a', index 1 to 'b', and so on, up to index 25 for 'z'.
    const foundLetters = new Array(26).fill(false);

    // Keep a count of how many *unique* alphabet letters we've encountered.
    // We can stop processing as soon as this count reaches 26.
    let uniqueLetterCount = 0;

    // Iterate through each character of the input text once.
    // This avoids creating a new lowercase string for the entire text, and
    // also avoids repeated scans (like `includes`) for each alphabet letter.
    for (let i = 0; i < this.text.length; i++) {
        const charCode = this.text.charCodeAt(i);

        let index;
        // Check if the character is a lowercase letter (a-z)
        if (charCode >= 97 && charCode <= 122) { // 'a' (97) to 'z' (122)
            index = charCode - 97;
        }
        // Check if the character is an uppercase letter (A-Z)
        else if (charCode >= 65 && charCode <= 90) { // 'A' (65) to 'Z' (90)
            index = charCode - 65; // Convert to 0-25 index for lowercase equivalent
        }
        // If it's not an English alphabet letter, skip to the next character.
        else {
            continue;
        }

        // If this specific letter (identified by its index) has not been found before:
        if (!foundLetters[index]) {
            foundLetters[index] = true; // Mark it as found
            uniqueLetterCount++;        // Increment the count of unique letters found

            // Early exit optimization: If we've already found all 26 unique alphabet letters,
            // we know it's a pangram, so we can stop processing the rest of the text.
            if (uniqueLetterCount === 26) {
                return true;
            }
        }
    }

    // After iterating through the entire text, return true if all 26 unique alphabet
    // letters were found, otherwise false.
    return uniqueLetterCount === 26;
}

export default Pangram;