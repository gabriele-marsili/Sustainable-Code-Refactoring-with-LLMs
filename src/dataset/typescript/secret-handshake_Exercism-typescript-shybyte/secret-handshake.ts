const COMMANDS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump'
]

export default class SecretHandshake {
    private readonly numberValue: number

    constructor(n: number) {
        this.numberValue = n
    }

    commands() {
        const isBitTrue = (bit: number) => this.numberValue & 1 << bit
        const commands = COMMANDS.filter((_, i) => isBitTrue(i))
        return isBitTrue(4) ? commands.reverse() : commands
    }
}