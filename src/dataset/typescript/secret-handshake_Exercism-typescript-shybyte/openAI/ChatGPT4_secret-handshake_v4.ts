const COMMANDS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump'
] as const;

export default class SecretHandshake {
    private readonly numberValue: number;

    constructor(n: number) {
        this.numberValue = n;
    }

    commands(): string[] {
        const commands = [];
        for (let i = 0; i < COMMANDS.length; i++) {
            if (this.numberValue & (1 << i)) {
                commands.push(COMMANDS[i]);
            }
        }
        return (this.numberValue & 16) ? commands.reverse() : commands;
    }
}