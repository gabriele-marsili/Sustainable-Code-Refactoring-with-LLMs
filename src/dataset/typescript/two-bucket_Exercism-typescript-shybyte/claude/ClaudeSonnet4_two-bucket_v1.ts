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

        const pourOneIntoTwo = (state: State): State => [
            Math.max(state[0] - (buckTwoSize - state[1]), 0),
            Math.min(state[1] + state[0], buckTwoSize)
        ]

        const pourTwoIntoOne = (state: State): State => [
            Math.min(state[0] + state[1], buckOneSize),
            Math.max(state[1] - (buckOneSize - state[0]), 0)
        ]

        const findNextStates = (state: State): State[] => [
            [buckOneSize, state[1]],
            [state[0], buckTwoSize],
            [0, state[1]],
            [state[0], 0],
            pourOneIntoTwo(state),
            pourTwoIntoOne(state)
        ]

        const visited = new Set<string>()
        const queue: { state: State; moves: number }[] = [{ state: initialState, moves: 1 }]
        visited.add(`${initialState[0]},${initialState[1]}`)

        while (queue.length > 0) {
            const { state, moves } = queue.shift()!

            if (state[0] === goal) {
                this.moves = () => moves
                this.goalBucket = Bucket.One
                this.otherBucket = state[1]
                return
            } else if (state[1] === goal) {
                this.moves = () => moves
                this.goalBucket = Bucket.Two
                this.otherBucket = state[0]
                return
            }

            const nextStates = findNextStates(state)
            for (const newState of nextStates) {
                const stateKey = `${newState[0]},${newState[1]}`
                if (!isSameState(newState, forbiddenState) && !visited.has(stateKey)) {
                    visited.add(stateKey)
                    queue.push({ state: newState, moves: moves + 1 })
                }
            }
        }
    }
}