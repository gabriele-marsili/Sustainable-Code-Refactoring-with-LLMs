"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumValue = maximumValue;
let _maxValue = 0;
let _maximumWeight;
function maximumValue({ maximumWeight, items }) {
    _maximumWeight = maximumWeight;
    calculateMaximumValue(items, 0, 0, 0);
    return _maxValue;
}
function calculateMaximumValue(items, index, currentWeight, currentValue) {
    if (currentWeight > _maximumWeight)
        return;
    if (currentValue > _maxValue)
        _maxValue = currentValue;
    for (let i = index; i < items.length; i++) {
        const item = items[i];
        calculateMaximumValue(items, i + 1, currentWeight + item.weight, currentValue + item.value);
    }
}
