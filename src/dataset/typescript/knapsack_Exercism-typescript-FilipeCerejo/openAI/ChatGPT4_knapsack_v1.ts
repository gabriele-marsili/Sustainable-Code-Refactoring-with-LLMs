type Item = {
    weight: number;
    value: number;
};

type ItemsSum = Item;

export function maximumValue({ maximumWeight, items }: { maximumWeight: number; items: Item[] }): number {
    let maxValue = 0;

    function dfs(index: number, currentWeight: number, currentValue: number): void {
        if (currentWeight > maximumWeight) return;
        if (currentValue > maxValue) maxValue = currentValue;

        for (let i = index; i < items.length; i++) {
            dfs(i + 1, currentWeight + items[i].weight, currentValue + items[i].value);
        }
    }

    dfs(0, 0, 0);
    return maxValue;
}