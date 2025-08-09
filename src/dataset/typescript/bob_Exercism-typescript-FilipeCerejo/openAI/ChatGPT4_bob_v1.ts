export function hey(message: string): string {
    const trimmed = message.trim();
    if (trimmed === '') return 'Fine. Be that way!';

    const isQuestion = trimmed.charAt(trimmed.length - 1) === '?';
    let hasLetters = false;
    let isUpper = true;

    for (let i = 0; i < trimmed.length; i++) {
        const c = trimmed.charAt(i);
        if (c >= 'a' && c <= 'z') {
            hasLetters = true;
            isUpper = false;
            break;
        }
        if (c >= 'A' && c <= 'Z') {
            hasLetters = true;
        }
    }

    const isShouting = hasLetters && isUpper;

    if (isQuestion && isShouting) return "Calm down, I know what I'm doing!";
    if (isQuestion) return 'Sure.';
    if (isShouting) return 'Whoa, chill out!';
    return 'Whatever.';
}