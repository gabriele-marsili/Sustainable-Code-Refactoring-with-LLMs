export function hey(message: string): string {
    const trimmed = message.trim();
    
    if (!trimmed) return 'Fine. Be that way!';
    
    const isQuestion = trimmed.endsWith('?');
    const isShouting = trimmed === trimmed.toUpperCase() && /[A-Z]/.test(trimmed);
    
    if (isQuestion && isShouting) return "Calm down, I know what I'm doing!";
    if (isQuestion) return 'Sure.';
    if (isShouting) return 'Whoa, chill out!';
    return 'Whatever.';
}