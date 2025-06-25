class Bob {

    private static isScreaming(input: string): boolean {
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
        if (Bob.isSilence(input)) {
            return 'Fine. Be that way!';
        } else if (Bob.isQuestion(input)) {
            if (Bob.isScreaming(input) && Bob.hasLetters(input)) {
                return "Calm down, I know what I'm doing!";
            } else {
                return "Sure.";
            }
        } else if (!Bob.hasLetters(input)) {
            return "Whatever.";
        } else if (Bob.isScreaming(input)) {
            return 'Whoa, chill out!';
        } else {
            return "Whatever.";
        }
    }
}

export default Bob
