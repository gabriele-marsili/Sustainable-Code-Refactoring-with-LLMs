export default class HandShake {
  private readonly handShakeCommands: string[];

  constructor(secret: number) {
    const baseCommands = ['wink', 'double blink', 'close your eyes', 'jump'];
    const commands = baseCommands.filter((_, i) => secret & (1 << i));
    this.handShakeCommands = secret & 16 ? commands.reverse() : commands;
  }

  public commands(): string[] {
    return this.handShakeCommands;
  }
}