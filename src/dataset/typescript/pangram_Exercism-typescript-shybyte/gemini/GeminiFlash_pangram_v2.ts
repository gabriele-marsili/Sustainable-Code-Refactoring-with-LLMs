const ALPHABET_SIZE = 26

export default class Pangram {
    text: string

    constructor(text: string) {
        this.text = text
    }

    isPangram(): boolean {
        // Use a fixed-size boolean array to track seen letters.
        // This avoids the overhead of a Set (hashing, object creation) and
        // large intermediate string/array allocations.
        const seenLetters = new Array<boolean>(ALPHABET_SIZE).fill(false);
        let distinctCount = 0;

        // Iterate directly over the input string to minimize memory allocations
        // and avoid costly string manipulations like toLowerCase(), replace(), and split().
        for (let i = 0; i < this.text.length; i++) {
            const charCode = this.text.charCodeAt(i);

            let index: number;
            // Check if the character is an English lowercase letter (a-z)
            if (charCode >= 97 && charCode <= 122) { // 'a' (97) to 'z' (122)
                index = charCode - 97;
            }
            // Check if the character is an English uppercase letter (A-Z)
            else if (charCode >= 65 && charCode <= 90) { // 'A' (65) to 'Z' (90)
                index = charCode - 65;
            } else {
                // If it's not an alphabetic character, skip it.
                continue;
            }

            // If this letter hasn't been seen yet, mark it and increment the count.
            // This check prevents redundant operations for already seen letters.
            if (!seenLetters[index]) {
                seenLetters[index] = true;
                distinctCount++;

                // Early exit: If all 26 distinct letters are found, it's a pangram.
                // This significantly reduces execution time for long texts that are pangrams.
                if (distinctCount === ALPHABET_SIZE) {
                    return true;
                }
            }
        }

        // After iterating through the entire text, return true only if all 26 distinct letters were found.
        return distinctCount === ALPHABET_SIZE;
    }
}