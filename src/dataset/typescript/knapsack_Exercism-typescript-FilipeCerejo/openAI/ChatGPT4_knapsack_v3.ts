type Item = {
    weight: number;
    value: number;
};

type ItemsSum = Item;

let _maxValue = 0;
let _maximumWeight: number;

export function maximumValue({ maximumWeight, items }: { maximumWeight: number; items: Item[] }): number {
    _maximumWeight = maximumWeight;
    findMaxValue(items);
    return _maxValue;
}

function findMaxValue(items: Item[]): void {
    const n = items.length;
    const dp = Array.from({ length: n + 1 }, () => Array(_maximumWeight + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const { weight, value } = items[i - 1];
        for (let w = 0; w <= _maximumWeight; w++) {
            dp[i][w] = dp[i - 1][w];
            if (w >= weight) {
                dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weight] + value);
            }
        }
    }

    _maxValue = dp[n][_maximumWeight];
}