export function accumulate<In, Out>(list: In[], accumulator: (a: In) => Out): Out[] {
    return list.map(accumulator);
}