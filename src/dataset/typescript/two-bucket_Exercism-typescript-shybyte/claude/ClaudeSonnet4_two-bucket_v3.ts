export enum Bucket {
    One = "one",
    Two = "two"
}

type State = [number, number]

const isSameState = (state1: State, state2: State) =>
    state1[0] === state2[0] && state1[1] === state2[1]

interface Result {
    moves: () => number
    goalBucket: Bucket
    otherBucket: number
}

export class TwoBucket implements Result {
    moves: () => number
    goalBucket: Bucket
    otherBucket: number

    constructor(buckOneSize: number, buckTwoSize: number, goal: number, starterBuck: Bucket) {
        const initialState: State = starterBuck === Bucket.One ? [buckOneSize, 0] : [0, buckTwoSize]
        const forbiddenState: State = starterBuck === Bucket.One ? [0, buckTwoSize] : [buckOneSize, 0]

        const pourOneIntoTwo = (state: State): State => {
            const transfer = Math.min(state[0], buckTwoSize - state[1])
            return [state[0] - transfer, state[1] + transfer]
        }

        const pourTwoIntoOne = (state: State): State => {
            const transfer = Math.min(state[1], buckOneSize - state[0])
            return [state[0] + transfer, state[1] - transfer]
        }

        const findNextStates = (state: State): State[] => [
            [buckOneSize, state[1]],
            [state[0], buckTwoSize],
            [0, state[1]],
            [state[0], 0],
            pourOneIntoTwo(state),
            pourTwoIntoOne(state)
        ]

        const visited = new Set<string>()
        const queue: { state: State; depth: number }[] = [{ state: initialState, depth: 1 }]
        visited.add(initialState.join(','))

        while (queue.length > 0) {
            const { state, depth } = queue.shift()!

            if (state[0] === goal) {
                this.moves = () => depth
                this.goalBucket = Bucket.One
                this.otherBucket = state[1]
                return
            }
            
            if (state[1] === goal) {
                this.moves = () => depth
                this.goalBucket = Bucket.Two
                this.otherBucket = state[0]
                return
            }

            for (const newState of findNextStates(state)) {
                const stateKey = newState.join(',')
                const forbiddenKey = forbiddenState.join(',')
                
                if (stateKey !== forbiddenKey && !visited.has(stateKey)) {
                    visited.add(stateKey)
                    queue.push({ state: newState, depth: depth + 1 })
                }
            }
        }

        this.moves = () => 0
        this.goalBucket = Bucket.One
        this.otherBucket = 0
    }
}