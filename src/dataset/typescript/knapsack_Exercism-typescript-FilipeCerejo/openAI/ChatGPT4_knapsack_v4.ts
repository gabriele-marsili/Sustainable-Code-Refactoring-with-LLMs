type Item = {
    weight: number;
    value: number;
};

let _maxValue = 0;
let _maximumWeight: number;

export function maximumValue({ maximumWeight, items }: { maximumWeight: number; items: Item[] }): number {
    _maximumWeight = maximumWeight;
    calculateMaximumValue(items, 0, 0, 0);
    return _maxValue;
}

function calculateMaximumValue(items: Item[], index: number, currentWeight: number, currentValue: number): void {
    if (currentWeight > _maximumWeight) return;
    if (currentValue > _maxValue) _maxValue = currentValue;

    for (let i = index; i < items.length; i++) {
        const item = items[i];
        calculateMaximumValue(items, i + 1, currentWeight + item.weight, currentValue + item.value);
    }
}