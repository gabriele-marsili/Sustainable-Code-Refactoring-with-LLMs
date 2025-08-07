export default class Bob {
  hey(message: string): string {
    const trimmed = message.trim();
    if (trimmed === '') return 'Fine. Be that way!';
    
    const isQuestion = trimmed.endsWith('?');
    const hasLetters = /[a-zA-Z]/.test(trimmed);
    const isShouting = hasLetters && trimmed === trimmed.toUpperCase();

    if (isShouting) return 'Whoa, chill out!';
    if (isQuestion) return 'Sure.';
    return 'Whatever.';
  }
}