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

        const pourTwoIntoOne = (state: State): State => {
            return [
                Math.min(state[0] + state[1], buckOneSize),
                Math.max(state[1] - (buckOneSize - state[0]), 0)
            ]
        }

        // Returns also forbidden states, that needs to get filtered later.
        const findNextStates = (state: State): State[] => [
            [buckOneSize, state[1]],  // filling bucket one
            [state[0], buckTwoSize],  // filling bucket two
            [0, state[1]],            // empty bucket one
            [state[0], 0],            // empty bucket two
            pourOneIntoTwo(state),
            pourTwoIntoOne(state)
        ]

        function searchMoves(statesStack: State[]): Result | undefined {
            const state = statesStack[statesStack.length - 1]

            if (state[0] === goal) {
                return {
                    moves: () => statesStack.length,
                    goalBucket: Bucket.One,
                    otherBucket: state[1]
                }
            } else if (state[1] === goal) {
                return {
                    moves: () => statesStack.length,
                    goalBucket: Bucket.Two,
                    otherBucket: state[0]
                }
            }

            const newLegalStates = findNextStates(state)
                .filter((newState) => !isSameState(newState, forbiddenState))
                .filter((newState) => !statesStack.some((prevState) => isSameState(prevState, newState)))

            for (const newState of newLegalStates) {
                const result = searchMoves(statesStack.concat([newState]))
                if (result) {
                    return result
                }
            }

            return undefined
        }

        const result = searchMoves([initialState])!
        this.moves = result.moves
        this.goalBucket = result.goalBucket
        this.otherBucket = result.otherBucket
    }
}
