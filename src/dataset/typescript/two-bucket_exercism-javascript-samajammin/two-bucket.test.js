"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const two_bucket_1 = require("./two-bucket");
describe('TwoBucket', () => {
    describe('works for input of 3, 5, 1', () => {
        const buckOne = 3;
        const buckTwo = 5;
        const goal = 1;
        test('starting with bucket one', () => {
            const starterBuck = two_bucket_1.Bucket.One; // indicates which bucket to fill first
            const twoBucket = new two_bucket_1.TwoBucket(buckOne, buckTwo, goal, starterBuck);
            expect(twoBucket.moves()).toEqual(4); // includes the first fill
            expect(twoBucket.goalBucket).toEqual('one'); // which bucket should end up with the desired # of liters
            expect(twoBucket.otherBucket).toEqual(5); // leftover value in the "other" bucket once the goal has been reached
        });
        test('starting with bucket two', () => {
            const starterBuck = two_bucket_1.Bucket.Two;
            const twoBucket = new two_bucket_1.TwoBucket(buckOne, buckTwo, goal, starterBuck);
            expect(twoBucket.moves()).toEqual(8);
            expect(twoBucket.goalBucket).toEqual('two');
            expect(twoBucket.otherBucket).toEqual(3);
        });
    });
    describe('works for input of 7, 11, 2', () => {
        const buckOne = 7;
        const buckTwo = 11;
        const goal = 2;
        test('starting with bucket one', () => {
            const starterBuck = two_bucket_1.Bucket.One;
            const twoBucket = new two_bucket_1.TwoBucket(buckOne, buckTwo, goal, starterBuck);
            expect(twoBucket.moves()).toEqual(14);
            expect(twoBucket.goalBucket).toEqual('one');
            expect(twoBucket.otherBucket).toEqual(11);
        });
        test('starting with bucket two', () => {
            const starterBuck = two_bucket_1.Bucket.Two;
            const twoBucket = new two_bucket_1.TwoBucket(buckOne, buckTwo, goal, starterBuck);
            expect(twoBucket.moves()).toEqual(18);
            expect(twoBucket.goalBucket).toEqual('two');
            expect(twoBucket.otherBucket).toEqual(7);
        });
    });
});
