export default class TwoFer {
  private static readonly template = 'One for ';
  private static readonly suffix = ', one for me.';
  
  static twoFer(name: string = 'you'): string {
    return this.template + name + this.suffix;
  }
}