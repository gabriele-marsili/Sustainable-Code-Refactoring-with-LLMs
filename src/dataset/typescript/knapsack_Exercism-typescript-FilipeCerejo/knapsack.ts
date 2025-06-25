type Item = {
    weight: number;
    value: number;
};

type ItemsSum = Item;

let _maxValue = 0;
let _maximumWeight: number;

export function maximumValue({ maximumWeight, items }: { maximumWeight: number; items: Item[] }): number {
    _maximumWeight = maximumWeight;
    combinations(items);
    return _maxValue;
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