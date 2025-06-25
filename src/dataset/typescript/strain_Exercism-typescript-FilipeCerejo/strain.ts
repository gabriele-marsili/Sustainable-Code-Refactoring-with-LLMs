export function keep<T>(arr: T[], predicate: (el: T) => boolean) {
    let keepArr: T[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) {
            keepArr.push(arr[i]);
        }
    }
    return keepArr;
}

export function discard<T>(arr: T[], predicate: (el: T) => boolean) {
    let discardArr: T[] = [];
    for (let i = 0; i < arr.length; i++) {
        if (!predicate(arr[i])) {
            discardArr.push(arr[i]);
        }
    }
    return discardArr;
}
