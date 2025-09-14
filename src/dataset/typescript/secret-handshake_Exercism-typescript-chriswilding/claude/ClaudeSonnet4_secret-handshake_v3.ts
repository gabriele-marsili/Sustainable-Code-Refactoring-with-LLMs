const ACTIONS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump',
] as const

const REVERSE = 16

export default class HandShake {
    #flags: number

    constructor(flags: number) {
        this.#flags = flags
    }

    commands(): string[] {
        const result: string[] = []
        
        for (let i = 0; i < ACTIONS.length; i++) {
            if (this.#flags & (1 << i)) {
                result.push(ACTIONS[i])
            }
        }

        return (this.#flags & REVERSE) ? result.reverse() : result
    }
}