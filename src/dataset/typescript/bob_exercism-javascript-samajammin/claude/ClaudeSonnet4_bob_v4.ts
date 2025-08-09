export default class Bob {
  hey(message: string): string {
    if (!/\S/.test(message)) {
      return 'Fine. Be that way!';
    }
    
    if (message.endsWith('?')) {
      return 'Sure.';
    }
    
    if (/[A-Z]/.test(message) && message === message.toUpperCase()) {
      return 'Whoa, chill out!';
    }
    
    return 'Whatever.';
  }
}