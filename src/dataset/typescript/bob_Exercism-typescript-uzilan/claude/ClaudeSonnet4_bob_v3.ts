class Bob {
    private static readonly SCREAMING_REGEX = /^[^a-z]*[A-Z][^a-z]*$/;
    private static readonly LETTER_REGEX = /[a-zA-Z]/;

    private static isScreaming(input: string): boolean {
        return Bob.SCREAMING_REGEX.test(input);
    }

    private static isQuestion(input: string): boolean {
        return input.trimEnd().endsWith('?');
    }

    private static hasLetters(input: string): boolean {
        return Bob.LETTER_REGEX.test(input);
    }

    private static isSilence(input: string): boolean {
        return input.trim() === '';
    }

    hey(input: string): string {
        const trimmed = input.trim();
        
        if (trimmed === '') {
            return 'Fine. Be that way!';
        }

        const hasLetters = Bob.LETTER_REGEX.test(input);
        const isQuestion = input.trimEnd().endsWith('?');
        
        if (isQuestion) {
            if (hasLetters && Bob.SCREAMING_REGEX.test(input)) {
                return "Calm down, I know what I'm doing!";
            }
            return "Sure.";
        }
        
        if (hasLetters && Bob.SCREAMING_REGEX.test(input)) {
            return 'Whoa, chill out!';
        }
        
        return "Whatever.";
    }
}

export default Bob