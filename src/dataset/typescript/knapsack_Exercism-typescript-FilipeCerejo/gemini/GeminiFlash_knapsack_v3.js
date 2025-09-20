"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumValue = maximumValue;
function maximumValue({ maximumWeight, items }) {
    let maxValue = 0;
    function isMaximum(currentWeight, currentValue) {
        if (currentWeight <= maximumWeight && currentValue > maxValue) {
            maxValue = currentValue;
        }
    }
    function combinations(index = 0, currentWeight = 0, currentValue = 0) {
        if (index === items.length) {
            isMaximum(currentWeight, currentValue);
            return;
        }
        const item = items[index];
        combinations(index + 1, currentWeight, currentValue);
        combinations(index + 1, currentWeight + item.weight, currentValue + item.value);
    }
    combinations();
    return maxValue;
}
