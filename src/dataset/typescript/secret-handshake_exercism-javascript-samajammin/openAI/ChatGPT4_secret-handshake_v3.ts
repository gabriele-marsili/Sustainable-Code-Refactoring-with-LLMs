export default class HandShake {
  private readonly handShakeCommands: string[];

  constructor(secret: number) {
    const actions = ['wink', 'double blink', 'close your eyes', 'jump'];
    this.handShakeCommands = actions.filter((_, i) => secret & (1 << i));
    if (secret & 16) this.handShakeCommands.reverse();
  }

  public commands(): string[] {
    return this.handShakeCommands;
  }
}