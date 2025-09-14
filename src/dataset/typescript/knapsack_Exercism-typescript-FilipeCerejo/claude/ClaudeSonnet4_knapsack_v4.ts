type Item = {
    weight: number;
    value: number;
};

type ItemsSum = Item;

let _maxValue = 0;
let _maximumWeight: number;

export function maximumValue({ maximumWeight, items }: { maximumWeight: number; items: Item[] }): number {
    _maximumWeight = maximumWeight;
    _maxValue = 0;
    
    const memo = new Map<string, number>();
    const result = knapsackDP(items, maximumWeight, memo);
    return result;
}

function knapsackDP(items: Item[], capacity: number, memo: Map<string, number>, index: number = 0): number {
    if (index >= items.length || capacity <= 0) {
        return 0;
    }
    
    const key = `${index}-${capacity}`;
    if (memo.has(key)) {
        return memo.get(key)!;
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

function combinations(items: Item[], index: number = 0, combos: Item[] = []): void {
    for (let i = index; i < items.length; i++) {
        let itemsList = [...combos, items[i]];
        isMaximum(itemsList);
        combinations(items, i + 1, itemsList);
    }
}

function isMaximum(items: Item[]): void {
    let sums: ItemsSum = items.reduce(
        (acc: ItemsSum, cur: Item) => {
            return { value: acc.value + cur.value, weight: acc.weight + cur.weight };
        },
        { weight: 0, value: 0 }
    );
    if (sums.weight <= _maximumWeight && sums.value > _maxValue) _maxValue = sums.value;
}