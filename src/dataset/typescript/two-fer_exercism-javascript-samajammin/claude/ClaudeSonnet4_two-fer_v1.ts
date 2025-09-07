export default class TwoFer {
  static twoFer(name: string = 'you') {
    return name === 'you' ? 'One for you, one for me.' : `One for ${name}, one for me.`;
  }
}