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
        const visited = new Set();
        const queue = [{ state: initialState, moves: 1 }];
        visited.add(`${initialState[0]},${initialState[1]}`);
        while (queue.length > 0) {
            const { state, moves } = queue.shift();
            if (state[0] === goal) {
                this.moves = () => moves;
                this.goalBucket = Bucket.One;
                this.otherBucket = state[1];
                return;
            }
            else if (state[1] === goal) {
                this.moves = () => moves;
                this.goalBucket = Bucket.Two;
                this.otherBucket = state[0];
                return;
            }
            const nextStates = findNextStates(state);
            for (const newState of nextStates) {
                const stateKey = `${newState[0]},${newState[1]}`;
                if (!isSameState(newState, forbiddenState) && !visited.has(stateKey)) {
                    visited.add(stateKey);
                    queue.push({ state: newState, moves: moves + 1 });
                }
            }
        }
    }
}
exports.TwoBucket = TwoBucket;
