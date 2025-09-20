"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumValue = maximumValue;
function maximumValue({ maximumWeight, items }) {
    let maxValue = 0;
    function dfs(index, currentWeight, currentValue) {
        if (currentWeight > maximumWeight)
            return;
        if (currentValue > maxValue)
            maxValue = currentValue;
        for (let i = index; i < items.length; i++) {
            dfs(i + 1, currentWeight + items[i].weight, currentValue + items[i].value);
        }
    }
    dfs(0, 0, 0);
    return maxValue;
}
