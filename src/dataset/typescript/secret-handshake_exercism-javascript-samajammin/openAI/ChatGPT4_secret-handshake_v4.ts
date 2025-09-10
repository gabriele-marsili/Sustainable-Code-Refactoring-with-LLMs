export default class HandShake {
  private readonly handShakeCommands: string[]

  constructor(secret: number) {
    const baseCommands = ['wink', 'double blink', 'close your eyes', 'jump']
    this.handShakeCommands = (secret & 16 ? baseCommands.reverse() : baseCommands)
      .filter((_, index) => secret & (1 << index))
  }

  public commands(): string[] {
    return this.handShakeCommands
  }
}