export default class HandShake {
  private readonly handShakeCommands: string[]

  constructor(secret: number) {
    const commandMap = ['wink', 'double blink', 'close your eyes', 'jump']
    const commands: string[] = []
    
    for (let i = 0; i < 4; i++) {
      if (secret & (1 << i)) {
        commands.push(commandMap[i])
      }
    }
    
    this.handShakeCommands = secret & 16 ? commands.reverse() : commands
  }

  public commands(): string[] {
    return this.handShakeCommands
  }
}