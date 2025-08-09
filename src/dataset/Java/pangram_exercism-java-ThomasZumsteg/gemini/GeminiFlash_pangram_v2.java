public class Pangrams {
    public static boolean isPangram(String words) {
        // Use a boolean array to keep track of seen letters.
        // The size is 26, one for each letter of the English alphabet ('a' through 'z').
        // Each element is initialized to false.
        boolean[] seenLetters = new boolean[26];
        int distinctLetterCount = 0; // Tracks how many unique letters have been found

        // Iterate through the input string character by character.
        // This avoids creating a new string via toLowerCase() or a char array via toCharArray().
        for (int i = 0; i < words.length(); i++) {
            char c = words.charAt(i);

            // Convert the character to lowercase to handle case-insensitivity.
            char lowerC = Character.toLowerCase(c);

            // Check if the character is an English alphabet letter.
            if (lowerC >= 'a' && lowerC <= 'z') {
                // Calculate the index for the boolean array (0 for 'a', 1 for 'b', ..., 25 for 'z').
                int index = lowerC - 'a';

                // If this letter has not been seen before, mark it as seen and increment the count.
                if (!seenLetters[index]) {
                    seenLetters[index] = true;
                    distinctLetterCount++;

                    // Optimization: If all 26 unique letters have been found, we can immediately return true.
                    // No need to process the rest of the string.
                    if (distinctLetterCount == 26) {
                        return true;
                    }
                }
            }
        }

        // After processing the entire string, return true only if all 26 distinct letters were found.
        return distinctLetterCount == 26;
    }
}