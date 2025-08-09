class Bob {
    private static readonly SCREAMING_REGEX = /^[0-9A-Z?,!%^^@#$(*\s]+$/;
    private static readonly LETTERS_REGEX = /[a-zA-Z]/;

    hey(input: string): string {
        const trimmed = input.trim();
        
        if (trimmed === '') {
            return 'Fine. Be that way!';
        }

        const hasLetters = Bob.LETTERS_REGEX.test(input);
        const isQuestion = trimmed.endsWith('?');
        const isScreaming = hasLetters && Bob.SCREAMING_REGEX.test(input);

        if (isQuestion) {
            return isScreaming ? "Calm down, I know what I'm doing!" : "Sure.";
        }

        if (isScreaming) {
            return 'Whoa, chill out!';
        }

        return "Whatever.";
    }
}

export default Bob