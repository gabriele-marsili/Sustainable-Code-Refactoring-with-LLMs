export function flatten(arr: any[]): number[] {
    const flattened: number[] = [];
    const stack = [arr];

    while (stack.length > 0) {
        const current = stack.pop();

        if (Array.isArray(current)) {
            for (let i = current.length - 1; i >= 0; i--) {
                stack.push(current[i]);
            }
        } else if (typeof current === 'number') {
            flattened.push(current);
        }
    }

    return flattened;
}