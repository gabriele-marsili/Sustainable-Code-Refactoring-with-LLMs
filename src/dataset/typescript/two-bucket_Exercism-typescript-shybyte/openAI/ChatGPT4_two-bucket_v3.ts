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

        const searchMoves = (): Result => {
            const visited = new Set<string>()
            const stack: { state: State; moves: number }[] = [{ state: initialState, moves: 0 }]

            while (stack.length) {
                const { state, moves } = stack.pop()!
                const stateKey = `${state[0]},${state[1]}`

                if (visited.has(stateKey)) continue
                visited.add(stateKey)

                if (state[0] === goal) {
                    return {
                        moves: () => moves + 1,
                        goalBucket: Bucket.One,
                        otherBucket: state[1]
                    }
                }
                if (state[1] === goal) {
                    return {
                        moves: () => moves + 1,
                        goalBucket: Bucket.Two,
                        otherBucket: state[0]
                    }
                }

                for (const newState of findNextStates(state)) {
                    if (!isSameState(newState, forbiddenState) && !visited.has(`${newState[0]},${newState[1]}`)) {
                        stack.push({ state: newState, moves: moves + 1 })
                    }
                }
            }

            throw new Error("No solution found")
        }

        const result = searchMoves()
        this.moves = result.moves
        this.goalBucket = result.goalBucket
        this.otherBucket = result.otherBucket
    }
}