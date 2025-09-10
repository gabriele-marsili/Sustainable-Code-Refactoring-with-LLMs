type Item = {
    weight: number;
    value: number;
};

export function maximumValue({ maximumWeight, items }: { maximumWeight: number; items: Item[] }): number {
    return knapsack(items, maximumWeight);
}

function knapsack(items: Item[], maxWeight: number): number {
    const dp: number[] = Array(maxWeight + 1).fill(0);

    for (const item of items) {
        for (let w = maxWeight; w >= item.weight; w--) {
            dp[w] = Math.max(dp[w], dp[w - item.weight] + item.value);
        }
    }

    return dp[maxWeight];
}