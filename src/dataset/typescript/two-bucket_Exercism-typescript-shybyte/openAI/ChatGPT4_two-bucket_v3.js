"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoBucket = exports.Bucket = void 0;
var Bucket;
(function (Bucket) {
    Bucket["One"] = "one";
    Bucket["Two"] = "two";
})(Bucket || (exports.Bucket = Bucket = {}));
const isSameState = (state1, state2) => state1[0] === state2[0] && state1[1] === state2[1];
class TwoBucket {
    constructor(buckOneSize, buckTwoSize, goal, starterBuck) {
        const initialState = starterBuck === Bucket.One ? [buckOneSize, 0] : [0, buckTwoSize];
        const forbiddenState = starterBuck === Bucket.One ? [0, buckTwoSize] : [buckOneSize, 0];
        const pourOneIntoTwo = (state) => [
            Math.max(state[0] - (buckTwoSize - state[1]), 0),
            Math.min(state[1] + state[0], buckTwoSize)
        ];
        const pourTwoIntoOne = (state) => [
            Math.min(state[0] + state[1], buckOneSize),
            Math.max(state[1] - (buckOneSize - state[0]), 0)
        ];
        const findNextStates = (state) => [
            [buckOneSize, state[1]],
            [state[0], buckTwoSize],
            [0, state[1]],
            [state[0], 0],
            pourOneIntoTwo(state),
            pourTwoIntoOne(state)
        ];
        const searchMoves = () => {
            const visited = new Set();
            const stack = [{ state: initialState, moves: 0 }];
            while (stack.length) {
                const { state, moves } = stack.pop();
                const stateKey = `${state[0]},${state[1]}`;
                if (visited.has(stateKey))
                    continue;
                visited.add(stateKey);
                if (state[0] === goal) {
                    return {
                        moves: () => moves + 1,
                        goalBucket: Bucket.One,
                        otherBucket: state[1]
                    };
                }
                if (state[1] === goal) {
                    return {
                        moves: () => moves + 1,
                        goalBucket: Bucket.Two,
                        otherBucket: state[0]
                    };
                }
                for (const newState of findNextStates(state)) {
                    if (!isSameState(newState, forbiddenState) && !visited.has(`${newState[0]},${newState[1]}`)) {
                        stack.push({ state: newState, moves: moves + 1 });
                    }
                }
            }
            throw new Error("No solution found");
        };
        const result = searchMoves();
        this.moves = result.moves;
        this.goalBucket = result.goalBucket;
        this.otherBucket = result.otherBucket;
    }
}
exports.TwoBucket = TwoBucket;
