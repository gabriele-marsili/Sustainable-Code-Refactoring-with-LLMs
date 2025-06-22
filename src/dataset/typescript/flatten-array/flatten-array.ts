export  function flatten(arr: any[]): number[] {
    let flattened: number[] = [];
    recFlatten(arr, flattened);
    return flattened;
}

function recFlatten(n: any[], flattened: number[]): void {
    for (let i = 0; i < n.length; i++) {
        if (typeof n[i] === 'number') {
            flattened.push(n[i]);
        } else if(n[i]) {
            recFlatten(n[i], flattened);
        }
    }
}