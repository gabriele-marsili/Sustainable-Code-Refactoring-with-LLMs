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
        const commands: string[] = []
        const shouldReverse = this.numberValue & 16
        
        for (let i = 0; i < 4; i++) {
            if (this.numberValue & (1 << i)) {
                commands.push(COMMANDS[i])
            }
        }
        
        return shouldReverse ? commands.reverse() : commands
    }
}