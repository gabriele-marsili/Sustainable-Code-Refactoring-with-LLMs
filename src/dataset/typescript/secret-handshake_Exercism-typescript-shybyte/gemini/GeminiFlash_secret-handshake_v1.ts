const COMMANDS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump'
];

export default class SecretHandshake {
    private readonly numberValue: number;

    constructor(n: number) {
        this.numberValue = n;
    }

    commands(): string[] {
        const commands: string[] = [];
        for (let i = 0; i < COMMANDS.length; i++) {
            if ((this.numberValue >> i) & 1) {
                commands.push(COMMANDS[i]);
            }
        }

        if ((this.numberValue >> 4) & 1) {
            return commands.reverse();
        }

        return commands;
    }
}