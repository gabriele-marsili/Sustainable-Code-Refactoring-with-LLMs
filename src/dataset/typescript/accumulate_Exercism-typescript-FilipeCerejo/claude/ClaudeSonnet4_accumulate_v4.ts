export function accumulate<In, Out>(list: In[], accumulator: (a: In) => Out): Out[] {
    const length = list.length;
    const mappedArr: Out[] = new Array(length);
    for (let i = 0; i < length; i++) {
        mappedArr[i] = accumulator(list[i]);
    }
    return mappedArr;
}