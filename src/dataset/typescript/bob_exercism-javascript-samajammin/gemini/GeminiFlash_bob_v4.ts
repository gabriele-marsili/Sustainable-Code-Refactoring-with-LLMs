export default class Bob {
  hey(message: string): string {
    switch (true) {
      case !/\S/.test(message):
        return 'Fine. Be that way!';
      case /[A-Z]/.test(message) && message === message.toUpperCase():
        return 'Whoa, chill out!';
      case message.endsWith('?'):
        return 'Sure.';
      default:
        return 'Whatever.';
    }
  }
}