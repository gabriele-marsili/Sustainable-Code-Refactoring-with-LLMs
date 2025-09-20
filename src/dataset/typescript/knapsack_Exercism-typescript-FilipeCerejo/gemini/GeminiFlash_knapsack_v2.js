"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumValue = maximumValue;
function maximumValue({ maximumWeight, items }) {
    let maxValue = 0;
    function combinations(index = 0, currentWeight = 0, currentValue = 0) {
        if (index === items.length) {
            maxValue = Math.max(maxValue, currentValue);
            return;
        }
        const item = items[index];
        // Option 1: Exclude the current item
        combinations(index + 1, currentWeight, currentValue);
        // Option 2: Include the current item if it doesn't exceed the maximum weight
        if (currentWeight + item.weight <= maximumWeight) {
            combinations(index + 1, currentWeight + item.weight, currentValue + item.value);
        }
    }
    combinations();
    return maxValue;
}
