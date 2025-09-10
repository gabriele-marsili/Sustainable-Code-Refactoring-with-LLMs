const ACTIONS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump',
];

const REVERSE = 16;

export default class HandShake {
    #flags: number;

    constructor(flags: number) {
        this.#flags = flags;
    }

    commands(): string[] {
        const actions: string[] = [];
        for (let i = 0; i < ACTIONS.length; i++) {
            if ((this.#flags >> i) & 1) {
                actions.push(ACTIONS[i]);
            }
        }

        if (this.#flags & REVERSE) {
            let left = 0;
            let right = actions.length - 1;
            while (left < right) {
                const temp = actions[left];
                actions[left] = actions[right];
                actions[right] = temp;
                left++;
                right--;
            }
        }

        return actions;
    }
}