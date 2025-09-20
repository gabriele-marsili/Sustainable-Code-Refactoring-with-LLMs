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
        const pourOneIntoTwo = (state) => {
            const pouredAmount = Math.min(state[0], buckTwoSize - state[1]);
            return [state[0] - pouredAmount, state[1] + pouredAmount];
        };
        const pourTwoIntoOne = (state) => {
            const pouredAmount = Math.min(state[1], buckOneSize - state[0]);
            return [state[0] + pouredAmount, state[1] - pouredAmount];
        };
        const findNextStates = (state) => {
            const nextStates = [];
            // filling bucket one
            if (state[0] !== buckOneSize)
                nextStates.push([buckOneSize, state[1]]);
            // filling bucket two
            if (state[1] !== buckTwoSize)
                nextStates.push([state[0], buckTwoSize]);
            // empty bucket one
            if (state[0] !== 0)
                nextStates.push([0, state[1]]);
            // empty bucket two
            if (state[1] !== 0)
                nextStates.push([state[0], 0]);
            const pouredOneTwo = pourOneIntoTwo(state);
            if (!isSameState(pouredOneTwo, state))
                nextStates.push(pouredOneTwo);
            const pouredTwoOne = pourTwoIntoOne(state);
            if (!isSameState(pouredTwoOne, state))
                nextStates.push(pouredTwoOne);
            return nextStates;
        };
        function searchMoves(statesStack, visitedStates) {
            const state = statesStack[statesStack.length - 1];
            const stateKey = JSON.stringify(state);
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
        const visitedStates = new Set();
        visitedStates.add(JSON.stringify(initialState));
        const result = searchMoves([initialState], visitedStates);
        this.moves = result.moves;
        this.goalBucket = result.goalBucket;
        this.otherBucket = result.otherBucket;
    }
}
exports.TwoBucket = TwoBucket;
