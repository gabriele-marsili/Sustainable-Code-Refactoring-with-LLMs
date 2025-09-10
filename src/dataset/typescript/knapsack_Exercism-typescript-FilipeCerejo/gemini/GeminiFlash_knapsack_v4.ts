type Item = {
    weight: number;
    value: number;
};

export function maximumValue({ maximumWeight, items }: { maximumWeight: number; items: Item[] }): number {
    let maxValue = 0;

    function combinations(index: number = 0, currentWeight: number = 0, currentValue: number = 0): void {
        if (index === items.length) {
            if (currentValue > maxValue) {
                maxValue = currentValue;
            }
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