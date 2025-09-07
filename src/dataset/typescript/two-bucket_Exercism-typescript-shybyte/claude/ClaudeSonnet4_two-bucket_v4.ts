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

        const stateKey = (state: State) => `${state[0]},${state[1]}`
        const forbiddenKey = stateKey(forbiddenState)

        function searchMoves(): Result | undefined {
            const queue: { state: State; path: State[] }[] = [{ state: initialState, path: [initialState] }]
            const visited = new Set<string>([stateKey(initialState)])

            while (queue.length > 0) {
                const { state, path } = queue.shift()!

                if (state[0] === goal) {
                    return {
                        moves: () => path.length,
                        goalBucket: Bucket.One,
                        otherBucket: state[1]
                    }
                }
                if (state[1] === goal) {
                    return {
                        moves: () => path.length,
                        goalBucket: Bucket.Two,
                        otherBucket: state[0]
                    }
                }

                for (const newState of findNextStates(state)) {
                    const newStateKey = stateKey(newState)
                    if (newStateKey !== forbiddenKey && !visited.has(newStateKey)) {
                        visited.add(newStateKey)
                        queue.push({ state: newState, path: [...path, newState] })
                    }
                }
            }

            return undefined
        }

        const result = searchMoves()!
        this.moves = result.moves
        this.goalBucket = result.goalBucket
        this.otherBucket = result.otherBucket
    }
}