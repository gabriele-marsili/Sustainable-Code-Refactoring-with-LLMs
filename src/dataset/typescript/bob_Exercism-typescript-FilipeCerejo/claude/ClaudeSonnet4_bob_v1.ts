export function hey(message: string): string {
    const trimmedMessage = message.trim();
    
    if (trimmedMessage === '') return 'Fine. Be that way!';
    
    const isQuestion = trimmedMessage.endsWith('?');
    const isShouting = trimmedMessage === trimmedMessage.toUpperCase() && /[A-Z]/.test(trimmedMessage);
    
    if (isQuestion && isShouting) return "Calm down, I know what I'm doing!";
    if (isShouting) return 'Whoa, chill out!';
    if (isQuestion) return 'Sure.';
    return 'Whatever.';
}