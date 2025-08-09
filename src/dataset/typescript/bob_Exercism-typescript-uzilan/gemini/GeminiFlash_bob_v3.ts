class Bob {

    // Preserve original static methods to maintain the public interface and functionality.
    // These methods will still use regex internally if called directly, as per requirements.
    private static isScreaming(input: string): boolean {
        // This regex tests if ALL characters in the string are digits, uppercase letters,
        // or specific punctuation/symbols ( ?,!,%,^,@,#,$,(,* ) or whitespace.
        // Note: `^^` inside `[]` means two literal `^` characters.
        return /^[0-9A-Z?,!%^^@#$(*\s]+$/.test(input);
    }

    private static isQuestion(input: string): boolean {
        return input.trim().endsWith('?');
    }

    private static hasLetters(input: string): boolean {
        return /[a-zA-Z]/.test(input);
    }

    private static isSilence(input: string): boolean {
        return input.trim() === '';
    }

    hey(input: string): string {
        // Perform trimming once to avoid repeated string creation and processing
        const trimmedInput = input.trim();

        // 1. Check for silence first, as it's a distinct early exit condition.
        // This avoids unnecessary character processing for empty inputs.
        if (trimmedInput === '') {
            return 'Fine. Be that way!';
        }

        // Initialize flags for a single pass through the string, reducing CPU and memory overhead
        // compared to multiple regex evaluations and string operations.
        let hasLetters = false;
        // This flag tracks if all characters in the trimmedInput are allowed by the original
        // `isScreaming` regex's character set definition.
        let isScreamingCharSetValid = true;

        // Iterate through the trimmed input string once to gather all necessary information.
        // This single loop replaces multiple potential passes from separate regex calls.
        for (let i = 0; i < trimmedInput.length; i++) {
            const charCode = trimmedInput.charCodeAt(i);

            // Determine if the string contains any letters (a-z or A-Z).
            // Using char codes for efficient character type checking.
            if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) { // A-Z or a-z
                hasLetters = true;
            }

            // Check if the current character is NOT within the allowed set for the original `isScreaming()` regex.
            // Allowed characters based on the regex `[0-9A-Z?,!%^^@#$(*\s]`:
            // Digits (0-9), Uppercase letters (A-Z), specific punctuation ( ?,!,%,^,@,#,$,(,* ), and whitespace characters.
            const isAllowedChar = (
                (charCode >= 48 && charCode <= 57) ||  // 0-9
                (charCode >= 65 && charCode <= 90) ||  // A-Z
                charCode === 63 || // ?
                charCode === 44 || // ,
                charCode === 33 || // !
                charCode === 37 || // %
                charCode === 94 || // ^ (literal caret)
                charCode === 64 || // @
                charCode === 35 || // #
                charCode === 36 || // $
                charCode === 40 || // (
                charCode === 42 || // *
                charCode === 9 ||  // Tab (\t)
                charCode === 10 || // Line Feed (\n)
                charCode === 11 || // Vertical Tab (\v)
                charCode === 12 || // Form Feed (\f)
                charCode === 13 || // Carriage Return (\r)
                charCode === 32    // Space
            );

            if (!isAllowedChar) {
                isScreamingCharSetValid = false;
                // Note: We cannot break here, as `hasLetters` must be determined for the entire string.
            }
        }

        // Determine if it's a question based on the trimmed input, a quick `endsWith` check.
        const isQuestion = trimmedInput.endsWith('?');

        // The `isScreaming` condition from the original code (Bob.isScreaming(input)) implies that
        // if letters are present, they must all be uppercase for the `isScreamingCharSetValid` to be true.
        // Thus, `isScreamingCharSetValid` accurately represents the condition.
        const isScreaming = isScreamingCharSetValid;

        // Apply the original decision logic using the pre-computed flags,
        // maintaining the precise order of precedence.
        if (isQuestion) {
            // Corresponds to `Bob.isScreaming(input) && Bob.hasLetters(input)` in original logic.
            // If `isScreaming` is true, and it contains letters, it means all letters are uppercase.
            if (isScreaming && hasLetters) {
                return "Calm down, I know what I'm doing!";
            } else {
                return "Sure.";
            }
        } else if (!hasLetters) {
            // Corresponds to `!Bob.hasLetters(input)`.
            return "Whatever.";
        } else if (isScreaming) {
            // Corresponds to `Bob.isScreaming(input)`.
            // This branch is only reached if `hasLetters` is true (due to the preceding `else if (!hasLetters)`).
            // Therefore, this combined condition implies a screaming message with letters that is not a question.
            return 'Whoa, chill out!';
        } else {
            return "Whatever.";
        }
    }
}

export default Bob;