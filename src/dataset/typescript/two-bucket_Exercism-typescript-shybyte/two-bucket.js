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
        const pourTwoIntoOne = (state) => {
            return [
                Math.min(state[0] + state[1], buckOneSize),
                Math.max(state[1] - (buckOneSize - state[0]), 0)
            ];
        };
        // Returns also forbidden states, that needs to get filtered later.
        const findNextStates = (state) => [
            [buckOneSize, state[1]], // filling bucket one
            [state[0], buckTwoSize], // filling bucket two
            [0, state[1]], // empty bucket one
            [state[0], 0], // empty bucket two
            pourOneIntoTwo(state),
            pourTwoIntoOne(state)
        ];
        function searchMoves(statesStack) {
            const state = statesStack[statesStack.length - 1];
            if (state[0] === goal) {
                return {
                    moves: () => statesStack.length,
                    goalBucket: Bucket.One,
                    otherBucket: state[1]
                };
            }
            else if (state[1] === goal) {
                return {
                    moves: () => statesStack.length,
                    goalBucket: Bucket.Two,
                    otherBucket: state[0]
                };
            }
            const newLegalStates = findNextStates(state)
                .filter((newState) => !isSameState(newState, forbiddenState))
                .filter((newState) => !statesStack.some((prevState) => isSameState(prevState, newState)));
            for (const newState of newLegalStates) {
                const result = searchMoves(statesStack.concat([newState]));
                if (result) {
                    return result;
                }
            }
            return undefined;
        }
        const result = searchMoves([initialState]);
        this.moves = result.moves;
        this.goalBucket = result.goalBucket;
        this.otherBucket = result.otherBucket;
    }
}
exports.TwoBucket = TwoBucket;
