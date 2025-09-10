export default class HandShake {
  private readonly handShakeCommands: string[]

  constructor(secret: number) {
    const baseCommands = ['wink', 'double blink', 'close your eyes', 'jump']
    this.handShakeCommands = (secret & 16)
      ? baseCommands.filter((_, i) => secret & (1 << i)).reverse()
      : baseCommands.filter((_, i) => secret & (1 << i))
  }

  public commands(): string[] {
    return this.handShakeCommands
  }
}