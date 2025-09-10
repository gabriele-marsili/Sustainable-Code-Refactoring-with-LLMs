type Item = {
    weight: number;
    value: number;
};

export function maximumValue({ maximumWeight, items }: { maximumWeight: number; items: Item[] }): number {
    let maxValue = 0;

    function isMaximum(currentWeight: number, currentValue: number): void {
        if (currentWeight <= maximumWeight && currentValue > maxValue) {
            maxValue = currentValue;
        }
    }

    function combinations(index: number = 0, currentWeight: number = 0, currentValue: number = 0): void {
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