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
        const goalBucket = goal === buckOneSize ? Bucket.One : Bucket.Two;
        const visitedStates = new Set();
        visitedStates.add(JSON.stringify(initialState));
        const queue = [[initialState, 0]];
        let result = undefined;
        while (queue.length > 0) {
            const [currentState, moves] = queue.shift();
            const [one, two] = currentState;
            if (one === goal) {
                result = {
                    moves: () => moves + 1,
                    goalBucket: Bucket.One,
                    otherBucket: two
                };
                break;
            }
            else if (two === goal) {
                result = {
                    moves: () => moves + 1,
                    goalBucket: Bucket.Two,
                    otherBucket: one
                };
                break;
            }
            const nextStates = [
                [buckOneSize, two],
                [one, buckTwoSize],
                [0, two],
                [one, 0],
                [Math.max(one - (buckTwoSize - two), 0), Math.min(two + one, buckTwoSize)],
                [Math.min(one + two, buckOneSize), Math.max(two - (buckOneSize - one), 0)]
            ];
            for (const nextState of nextStates) {
                const stateKey = JSON.stringify(nextState);
                if (!visitedStates.has(stateKey)) {
                    visitedStates.add(stateKey);
                    queue.push([nextState, moves + 1]);
                }
            }
        }
        this.moves = () => result.moves();
        this.goalBucket = result.goalBucket;
        this.otherBucket = result.otherBucket;
    }
}
exports.TwoBucket = TwoBucket;
