const COMMANDS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump'
] as const

export default class SecretHandshake {
    private readonly numberValue: number

    constructor(n: number) {
        this.numberValue = n
    }

    commands(): string[] {
        const commands: string[] = []
        const value = this.numberValue
        
        if (value & 1) commands.push(COMMANDS[0])
        if (value & 2) commands.push(COMMANDS[1])
        if (value & 4) commands.push(COMMANDS[2])
        if (value & 8) commands.push(COMMANDS[3])
        
        return value & 16 ? commands.reverse() : commands
    }
}