export function flatten(arr: any[]): number[] {
    const stack = [...arr];
    const flattened: number[] = [];

    while (stack.length) {
        const current = stack.pop();
        if (Array.isArray(current)) {
            stack.push(...current);
        } else if (typeof current === 'number') {
            flattened.push(current);
        }
    }

    return flattened.reverse();
}