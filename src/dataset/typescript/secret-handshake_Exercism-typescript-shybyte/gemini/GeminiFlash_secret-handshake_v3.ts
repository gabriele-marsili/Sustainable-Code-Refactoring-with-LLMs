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
        const result: string[] = [];
        for (let i = 0; i < COMMANDS.length; i++) {
            if ((this.numberValue >> i) & 1) {
                result.push(COMMANDS[i]);
            }
        }

        if ((this.numberValue >> 4) & 1) {
            return result.reverse();
        }

        return result;
    }
}