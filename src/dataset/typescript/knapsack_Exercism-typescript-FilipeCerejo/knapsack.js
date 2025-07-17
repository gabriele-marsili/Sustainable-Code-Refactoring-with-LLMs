"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumValue = maximumValue;
let _maxValue = 0;
let _maximumWeight;
function maximumValue({ maximumWeight, items }) {
    _maximumWeight = maximumWeight;
    combinations(items);
    return _maxValue;
}
function combinations(items, index = 0, combos = []) {
    for (let i = index; i < items.length; i++) {
        let itemsList = [...combos, items[i]];
        isMaximum(itemsList);
        combinations(items, i + 1, itemsList);
    }
}
function isMaximum(items) {
    let sums = items.reduce((acc, cur) => {
        return { value: acc.value + cur.value, weight: acc.weight + cur.weight };
    }, { weight: 0, value: 0 });
    if (sums.weight <= _maximumWeight && sums.value > _maxValue)
        _maxValue = sums.value;
}
