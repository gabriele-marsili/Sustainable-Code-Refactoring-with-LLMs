export enum Bucket {
    One = "one",
    Two = "two"
}

type State = [number, number]

const isSameState = (state1: State, state2: State): boolean =>
    state1[0] === state2[0] && state1[1] === state2[1];

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

        const pourOneIntoTwo = (state: State): State => {
            const pouredAmount = Math.min(state[0], buckTwoSize - state[1]);
            return [state[0] - pouredAmount, state[1] + pouredAmount];
        };

        const pourTwoIntoOne = (state: State): State => {
            const pouredAmount = Math.min(state[1], buckOneSize - state[0]);
            return [state[0] + pouredAmount, state[1] - pouredAmount];
        };

        const findNextStates = (state: State): State[] => {
            const nextStates: State[] = [];

            // filling bucket one
            if (state[0] !== buckOneSize) nextStates.push([buckOneSize, state[1]]);
            // filling bucket two
            if (state[1] !== buckTwoSize) nextStates.push([state[0], buckTwoSize]);
            // empty bucket one
            if (state[0] !== 0) nextStates.push([0, state[1]]);
            // empty bucket two
            if (state[1] !== 0) nextStates.push([state[0], 0]);

            const pouredOneTwo = pourOneIntoTwo(state);
            if (!isSameState(pouredOneTwo, state)) nextStates.push(pouredOneTwo);

            const pouredTwoOne = pourTwoIntoOne(state);
            if (!isSameState(pouredTwoOne, state)) nextStates.push(pouredTwoOne);

            return nextStates;
        };

        function searchMoves(statesStack: State[], visitedStates: Set<string>): Result | undefined {
            const state = statesStack[statesStack.length - 1];
            const stateKey = JSON.stringify(state);

            if (state[0] === goal) {
                return {
                    moves: () => statesStack.length,
                    goalBucket: Bucket.One,
                    otherBucket: state[1]
                };
            } else if (state[1] === goal) {
                return {
                    moves: () => statesStack.length,
                    goalBucket: Bucket.Two,
                    otherBucket: state[0]
                };
            }

            const newLegalStates = findNextStates(state)
                .filter((newState) => !isSameState(newState, forbiddenState))
                .filter((newState) => {
                    const newStateKey = JSON.stringify(newState);
                    if (visitedStates.has(newStateKey)) {
                        return false;
                    }
                    return true;
                });

            for (const newState of newLegalStates) {
                const newStateKey = JSON.stringify(newState);
                visitedStates.add(newStateKey);
                const result = searchMoves(statesStack.concat([newState]), visitedStates);
                if (result) {
                    return result;
                }
            }

            return undefined;
        }

        const visitedStates: Set<string> = new Set();
        visitedStates.add(JSON.stringify(initialState));
        const result = searchMoves([initialState], visitedStates)!;

        this.moves = result.moves;
        this.goalBucket = result.goalBucket;
        this.otherBucket = result.otherBucket;
    }
}