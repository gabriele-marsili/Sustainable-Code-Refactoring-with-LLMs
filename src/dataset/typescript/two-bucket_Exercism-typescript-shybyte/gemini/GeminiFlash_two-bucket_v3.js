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
        function searchMoves(visitedStates, currentState, moveCount) {
            if (currentState[0] === goal) {
                return {
                    moves: () => moveCount,
                    goalBucket: Bucket.One,
                    otherBucket: currentState[1]
                };
            }
            else if (currentState[1] === goal) {
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
        const result = searchMoves(new Set(), initialState, 1);
        this.moves = result.moves;
        this.goalBucket = result.goalBucket;
        this.otherBucket = result.otherBucket;
    }
}
exports.TwoBucket = TwoBucket;
