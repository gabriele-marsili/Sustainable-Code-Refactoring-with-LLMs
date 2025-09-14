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

    commands() {
        const commands: string[] = []
        const bits = this.numberValue & 0x1F // Mask to 5 bits only
        
        for (let i = 0; i < 4; i++) {
            if (bits & (1 << i)) {
                commands.push(COMMANDS[i])
            }
        }
        
        return bits & 16 ? commands.reverse() : commands
    }
}