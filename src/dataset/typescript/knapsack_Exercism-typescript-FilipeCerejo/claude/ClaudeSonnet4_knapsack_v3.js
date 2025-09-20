"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximumValue = maximumValue;
let _maxValue = 0;
let _maximumWeight;
function maximumValue({ maximumWeight, items }) {
    _maximumWeight = maximumWeight;
    _maxValue = 0;
    const memo = new Map();
    const result = knapsackDP(items, maximumWeight, memo);
    _maxValue = result;
    return _maxValue;
}
function knapsackDP(items, capacity, memo, index = 0) {
    if (index >= items.length || capacity <= 0) {
        return 0;
    }
    const key = `${index}-${capacity}`;
    if (memo.has(key)) {
        return memo.get(key);
    }
    const currentItem = items[index];
    let maxValue = knapsackDP(items, capacity, memo, index + 1);
    if (currentItem.weight <= capacity) {
        const valueWithCurrent = currentItem.value + knapsackDP(items, capacity - currentItem.weight, memo, index + 1);
        maxValue = Math.max(maxValue, valueWithCurrent);
    }
    memo.set(key, maxValue);
    return maxValue;
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
