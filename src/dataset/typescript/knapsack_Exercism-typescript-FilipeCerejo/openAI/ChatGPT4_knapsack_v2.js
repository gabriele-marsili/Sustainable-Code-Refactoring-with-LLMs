"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumValue = maximumValue;
function maximumValue({ maximumWeight, items }) {
    return knapsack(items, maximumWeight);
}
function knapsack(items, maxWeight) {
    const dp = Array(maxWeight + 1).fill(0);
    for (const item of items) {
        for (let w = maxWeight; w >= item.weight; w--) {
            dp[w] = Math.max(dp[w], dp[w - item.weight] + item.value);
        }
    }
    return dp[maxWeight];
}
