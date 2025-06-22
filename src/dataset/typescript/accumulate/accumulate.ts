export function accumulate<In, Out>(list: In[], accumulator: (a: In) => Out): Out[] {
    let mappedArr: Out[] = [];
    for (let i = 0; i < list.length; i++) {
        mappedArr.push(accumulator(list[i]));
    }
    return mappedArr;
}
