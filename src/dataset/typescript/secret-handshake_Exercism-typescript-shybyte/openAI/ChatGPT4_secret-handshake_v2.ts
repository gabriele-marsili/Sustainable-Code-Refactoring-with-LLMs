const COMMANDS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump'
] as const;

export default class SecretHandshake {
    private readonly numberValue: number;

    constructor(n: number) {
        this.numberValue = n & 31; // Mask to only keep relevant bits (0-4)
    }

    commands(): string[] {
        const result: string[] = [];
        for (let i = 0; i < COMMANDS.length; i++) {
            if (this.numberValue & (1 << i)) {
                result.push(COMMANDS[i]);
            }
        }
        return (this.numberValue & 16) ? result.reverse() : result;
    }
}