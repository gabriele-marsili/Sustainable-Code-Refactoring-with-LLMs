Pangram = function(text) {
    this.text = text
}

Pangram.prototype.alphabet = [..."abcdefghijklmnopqrstuvwxyz"];

Pangram.prototype.isPangram = function() {
    const letters = this.text.toLowerCase();
    // Use a boolean array to track the presence of each letter from 'a' to 'z'.
    // Index 0 corresponds to 'a', 1 to 'b', and so on, up to 25 for 'z'.
    const seen = new Array(26).fill(false);
    let uniqueLetterCount = 0;

    for (let i = 0; i < letters.length; i++) {
        const charCode = letters.charCodeAt(i);
        // Check if the character is a lowercase English letter (ASCII values: 'a'=97, 'z'=122)
        if (charCode >= 97 && charCode <= 122) {
            const index = charCode - 97; // Calculate the 0-based index for the letter
            if (!seen[index]) {
                seen[index] = true;
                uniqueLetterCount++;
                // Optimization: If we've already found all 26 unique letters,
                // we can stop early as it must be a pangram.
                if (uniqueLetterCount === 26) {
                    return true;
                }
            }
        }
    }

    // A pangram must contain all 26 letters of the alphabet.
    return uniqueLetterCount === 26;
}

export default Pangram;