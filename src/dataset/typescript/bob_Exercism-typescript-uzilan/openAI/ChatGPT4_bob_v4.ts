class Bob {

    private static isScreaming(input: string): boolean {
        return input === input.toUpperCase() && /[A-Z]/.test(input);
    }

    private static isQuestion(input: string): boolean {
        const trimmed = input.trim();
        return trimmed.endsWith('?');
    }

    private static isSilence(input: string): boolean {
        return input.trim().length === 0;
    }

    hey(input: string): string {
        if (Bob.isSilence(input)) {
            return 'Fine. Be that way!';
        }

        const isQuestion = Bob.isQuestion(input);
        const isScreaming = Bob.isScreaming(input);

        if (isQuestion && isScreaming) {
            return "Calm down, I know what I'm doing!";
        }

        if (isQuestion) {
            return "Sure.";
        }

        if (isScreaming) {
            return 'Whoa, chill out!';
        }

        return "Whatever.";
    }
}

export default Bob