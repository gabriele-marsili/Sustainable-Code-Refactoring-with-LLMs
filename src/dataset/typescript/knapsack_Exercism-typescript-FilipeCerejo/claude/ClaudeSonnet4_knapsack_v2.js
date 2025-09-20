"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumValue = maximumValue;
function maximumValue({ maximumWeight, items }) {
    const n = items.length;
    const dp = new Array(maximumWeight + 1).fill(0);
    for (let i = 0; i < n; i++) {
        const { weight, value } = items[i];
        for (let w = maximumWeight; w >= weight; w--) {
            dp[w] = Math.max(dp[w], dp[w - weight] + value);
        }
    }
    return dp[maximumWeight];
}
