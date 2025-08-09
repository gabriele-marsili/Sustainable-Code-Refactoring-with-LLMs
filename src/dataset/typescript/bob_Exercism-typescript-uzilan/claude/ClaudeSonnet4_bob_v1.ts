class Bob {
    private static readonly SCREAMING_REGEX = /^[^a-z]*$/;
    private static readonly HAS_LETTERS_REGEX = /[a-zA-Z]/;

    private static isScreaming(input: string): boolean {
        return Bob.SCREAMING_REGEX.test(input);
    }

    private static isQuestion(input: string): boolean {
        return input.charCodeAt(input.length - 1) === 63; // '?' ASCII code
    }

    private static hasLetters(input: string): boolean {
        return Bob.HAS_LETTERS_REGEX.test(input);
    }

    private static isSilence(input: string): boolean {
        return input.trim() === '';
    }

    hey(input: string): string {
        const trimmed = input.trim();
        
        if (trimmed === '') {
            return 'Fine. Be that way!';
        }
        
        const hasLetters = Bob.hasLetters(input);
        const isQuestion = input.charCodeAt(input.length - 1) === 63;
        
        if (isQuestion) {
            if (hasLetters && Bob.isScreaming(input)) {
                return "Calm down, I know what I'm doing!";
            }
            return "Sure.";
        }
        
        if (!hasLetters) {
            return "Whatever.";
        }
        
        if (Bob.isScreaming(input)) {
            return 'Whoa, chill out!';
        }
        
        return "Whatever.";
    }
}

export default Bob