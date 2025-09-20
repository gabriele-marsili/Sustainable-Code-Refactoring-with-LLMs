"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumValue = maximumValue;
function maximumValue({ maximumWeight, items }) {
    if (items.length === 0)
        return 0;
    // Dynamic programming approach using memoization
    const memo = new Map();
    function knapsack(index, remainingWeight) {
        if (index >= items.length || remainingWeight <= 0)
            return 0;
        const key = `${index}-${remainingWeight}`;
        if (memo.has(key))
            return memo.get(key);
        const item = items[index];
        let maxValue = knapsack(index + 1, remainingWeight); // Skip current item
        if (item.weight <= remainingWeight) {
            const valueWithItem = item.value + knapsack(index + 1, remainingWeight - item.weight);
            maxValue = Math.max(maxValue, valueWithItem);
        }
        memo.set(key, maxValue);
        return maxValue;
    }
    return knapsack(0, maximumWeight);
}
