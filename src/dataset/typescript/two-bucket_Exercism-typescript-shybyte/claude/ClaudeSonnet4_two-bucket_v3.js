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
            const transfer = Math.min(state[0], buckTwoSize - state[1]);
            return [state[0] - transfer, state[1] + transfer];
        };
        const pourTwoIntoOne = (state) => {
            const transfer = Math.min(state[1], buckOneSize - state[0]);
            return [state[0] + transfer, state[1] - transfer];
        };
        const findNextStates = (state) => [
            [buckOneSize, state[1]],
            [state[0], buckTwoSize],
            [0, state[1]],
            [state[0], 0],
            pourOneIntoTwo(state),
            pourTwoIntoOne(state)
        ];
        const visited = new Set();
        const queue = [{ state: initialState, depth: 1 }];
        visited.add(initialState.join(','));
        while (queue.length > 0) {
            const { state, depth } = queue.shift();
            if (state[0] === goal) {
                this.moves = () => depth;
                this.goalBucket = Bucket.One;
                this.otherBucket = state[1];
                return;
            }
            if (state[1] === goal) {
                this.moves = () => depth;
                this.goalBucket = Bucket.Two;
                this.otherBucket = state[0];
                return;
            }
            for (const newState of findNextStates(state)) {
                const stateKey = newState.join(',');
                const forbiddenKey = forbiddenState.join(',');
                if (stateKey !== forbiddenKey && !visited.has(stateKey)) {
                    visited.add(stateKey);
                    queue.push({ state: newState, depth: depth + 1 });
                }
            }
        }
        this.moves = () => 0;
        this.goalBucket = Bucket.One;
        this.otherBucket = 0;
    }
}
exports.TwoBucket = TwoBucket;
