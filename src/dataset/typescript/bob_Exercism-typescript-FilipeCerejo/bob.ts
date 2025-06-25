export function hey(message: string): string {
    const trimedMessaged = message.trim();
    const hasMessage = trimedMessaged !== '';
    const isQuestion = trimedMessaged.endsWith('?');
    const isShouting = trimedMessaged === trimedMessaged.toUpperCase() && /[a-z]/i.test(trimedMessaged);

    if (!hasMessage) return 'Fine. Be that way!';
    if (!isQuestion && !isShouting) return 'Whatever.';
    if (!isQuestion && isShouting) return 'Whoa, chill out!';
    if (isQuestion && !isShouting) return 'Sure.';
    if (isQuestion && isShouting) return "Calm down, I know what I'm doing!";
    return 'Whatever.';
}
