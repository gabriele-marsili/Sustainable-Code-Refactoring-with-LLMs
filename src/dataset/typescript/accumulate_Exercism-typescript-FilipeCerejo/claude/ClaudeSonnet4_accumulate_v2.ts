export function accumulate<In, Out>(list: In[], accumulator: (a: In) => Out): Out[] {
    const mappedArr: Out[] = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
        mappedArr[i] = accumulator(list[i]);
    }
    return mappedArr;
}