export function hey(message: string): string {
    const trimedMessaged = message.trim();
    const hasMessage = trimedMessaged.length > 0;

    if (!hasMessage) {
        return 'Fine. Be that way!';
    }

    const isQuestion = trimedMessaged.endsWith('?');

    // Optimized 'isShouting' check:
    // A message is shouting if it contains at least one letter and all letters are uppercase.
    // Iterate through the string once to check this efficiently, avoiding
    // creation of new strings with toUpperCase() and multiple regex evaluations.
    let containsLetter = false;
    let containsLowerCaseLetter = false;

    for (let i = 0; i < trimedMessaged.length; i++) {
        const charCode = trimedMessaged.charCodeAt(i);

        // Check for uppercase letters (A-Z ASCII range)
        if (charCode >= 65 && charCode <= 90) {
            containsLetter = true;
        }
        // Check for lowercase letters (a-z ASCII range)
        else if (charCode >= 97 && charCode <= 122) {
            containsLetter = true;
            containsLowerCaseLetter = true;
            // Found a lowercase letter, so it cannot be shouting.
            // We can break early to save further iterations.
            break;
        }
    }
    const isShouting = containsLetter && !containsLowerCaseLetter;

    // Determine the response based on the derived flags.
    // This uses a clear nested if-else structure, which is logically equivalent
    // to the original series of if statements but can sometimes be more
    // readable by grouping related conditions.
    if (isQuestion) {
        if (isShouting) {
            return "Calm down, I know what I'm doing!";
        } else {
            return 'Sure.';
        }
    } else { // Not a question
        if (isShouting) {
            return 'Whoa, chill out!';
        } else {
            return 'Whatever.';
        }
    }
}