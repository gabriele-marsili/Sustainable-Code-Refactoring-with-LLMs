export function flatten(arr: any[]): number[] {
    const flattened: number[] = [];
    const stack: any[] = [...arr];
    
    while (stack.length > 0) {
        const current = stack.pop();
        if (typeof current === 'number') {
            flattened.push(current);
        } else if (Array.isArray(current)) {
            stack.push(...current);
        }
    }
    
    return flattened.reverse();
}