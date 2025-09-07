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
        const initialState: State = starterBuck === Bucket.One ? [buckOneSize, 0] : [0, buckTwoSize];
        const forbiddenState: State = starterBuck === Bucket.One ? [0, buckTwoSize] : [buckOneSize, 0];

        const pourOneIntoTwo = (state: State): State => [
            Math.max(state[0] - (buckTwoSize - state[1]), 0),
            Math.min(state[1] + state[0], buckTwoSize)
        ];

        const pourTwoIntoOne = (state: State): State => [
            Math.min(state[0] + state[1], buckOneSize),
            Math.max(state[1] - (buckOneSize - state[0]), 0)
        ];

        const findNextStates = (state: State): State[] => [
            [buckOneSize, state[1]],
            [state[0], buckTwoSize],
            [0, state[1]],
            [state[0], 0],
            pourOneIntoTwo(state),
            pourTwoIntoOne(state)
        ];

        function searchMoves(visitedStates: Set<string>, currentState: State, moveCount: number): Result | undefined {
            if (currentState[0] === goal) {
                return {
                    moves: () => moveCount,
                    goalBucket: Bucket.One,
                    otherBucket: currentState[1]
                };
            } else if (currentState[1] === goal) {
                return {
                    moves: () => moveCount,
                    goalBucket: Bucket.Two,
                    otherBucket: currentState[0]
                };
            }

            const stateKey = JSON.stringify(currentState);
            if (visitedStates.has(stateKey)) {
                return undefined;
            }
            visitedStates.add(stateKey);

            const nextStates = findNextStates(currentState);

            for (const nextState of nextStates) {
                if (isSameState(nextState, forbiddenState)) {
                    continue;
                }

                const result = searchMoves(visitedStates, nextState, moveCount + 1);
                if (result) {
                    return result;
                }
            }

            return undefined;
        }

        const result = searchMoves(new Set<string>(), initialState, 1)!;
        this.moves = result.moves;
        this.goalBucket = result.goalBucket;
        this.otherBucket = result.otherBucket;
    }
}