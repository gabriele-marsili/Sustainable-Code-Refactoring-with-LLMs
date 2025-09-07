class TwoFer {
  private static readonly DEFAULT_NAME = 'you';
  private static readonly MESSAGE_START = 'One for ';
  private static readonly MESSAGE_END = ', one for me.';

  static twoFer(name: string = TwoFer.DEFAULT_NAME): string {
    return `${TwoFer.MESSAGE_START}${name}${TwoFer.MESSAGE_END}`;
  }
}

export default TwoFer