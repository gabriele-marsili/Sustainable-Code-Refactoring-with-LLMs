const ACTIONS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump',
]

const REVERSE = 16

export default class HandShake {
    #flags: number

    constructor(flags: number) {
        this.#flags = flags
    }

    commands(): string[] {
        const actions = ACTIONS.filter((_, index) => this.#flags & 2 ** index)

        if (this.#flags & REVERSE) {
            actions.reverse()
        }

        return actions
    }
}
