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
        const stateKey = (state) => `${state[0]},${state[1]}`;
        const forbiddenKey = stateKey(forbiddenState);
        function searchMoves() {
            const queue = [{ state: initialState, path: [initialState] }];
            const visited = new Set([stateKey(initialState)]);
            while (queue.length > 0) {
                const { state, path } = queue.shift();
                if (state[0] === goal) {
                    return {
                        moves: () => path.length,
                        goalBucket: Bucket.One,
                        otherBucket: state[1]
                    };
                }
                if (state[1] === goal) {
                    return {
                        moves: () => path.length,
                        goalBucket: Bucket.Two,
                        otherBucket: state[0]
                    };
                }
                for (const newState of findNextStates(state)) {
                    const newStateKey = stateKey(newState);
                    if (newStateKey !== forbiddenKey && !visited.has(newStateKey)) {
                        visited.add(newStateKey);
                        queue.push({ state: newState, path: [...path, newState] });
                    }
                }
            }
            return undefined;
        }
        const result = searchMoves();
        this.moves = result.moves;
        this.goalBucket = result.goalBucket;
        this.otherBucket = result.otherBucket;
    }
}
exports.TwoBucket = TwoBucket;
